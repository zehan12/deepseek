// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { USER_CLERK_CASE } from "@/constants";
import { connectDB } from "@/infra/database";
import { User } from "@/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(request: Request) {
    const signingSecret = process.env.SIGNING_SECRET;
    if (!signingSecret) {
        throw "sigin secret not found";
    }
    const wh = new Webhook(signingSecret);
    const headerPayload = await headers();
    const svixHeaders = {
        "svix-id": headerPayload.get("svix-id"),
        "svix-timestamp": headerPayload.get("svix-timestamp"),
        "svix-signature": headerPayload.get("svix-signature")
    };
    console.log(wh);

    const payload = await request.json();
    const body = JSON.stringify(payload);
    const evt = wh.verify(body, svixHeaders);

    const userData = {
        _id: evt?.data.id,
        email: evt?.data?.email_addresses[0].email_address,
        name: `${evt?.data.first_name} ${evt?.data.last_name}`,
        image: evt?.data.image_url
    };

    await connectDB();

    switch (evt?.type) {
        case USER_CLERK_CASE.USER_CREATED:
            await User.create(userData)
            break
        case USER_CLERK_CASE.USER_DELETED:
            await User.findByIdAndDelete(evt?.data.id)
            break
        case USER_CLERK_CASE.USER_UPDATED:
            await User.findByIdAndUpdate(evt?.data.id, userData)
            break
        default:
            break
    }

    return NextResponse.json({ message: "Event Received" });
}