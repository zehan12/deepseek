// import { connectDB } from "@/infra/database";

export async function GET() {
    return new Response(JSON.stringify(
        {
            status: 'OK',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        }
    ), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

