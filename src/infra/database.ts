/* eslint-disable @typescript-eslint/ban-ts-comment */

import mongoose from "mongoose";

const MONGODB_URI: string = process.env.DATABASE_URL || "";

if (!MONGODB_URI) {
    throw new Error("Please define the DATABASE_URL environment variable");
}

interface MongooseGlobal {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// @ts-ignore
let cached: MongooseGlobal = global.mongoose;

if (!cached) {
    // @ts-ignore
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts);
    }

    try {
        cached.conn = await cached.promise;
        console.log("successfully connected to db")
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }

    return cached.conn;
}