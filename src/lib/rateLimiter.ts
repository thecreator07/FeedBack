import type { NextRequest } from 'next/server';
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, '15s'),
})
export const config ={
    runtime:'edge'
}

export async function rateLimiter(request: NextRequest){
    const ip = await request.ip ?? '127.0.0.1';
    const limitResponse = await ratelimit.limit(ip);
    return limitResponse;
}