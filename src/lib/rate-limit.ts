import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let ratelimit: Ratelimit | null = null;
let redisClient: Redis | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  // sliding window rate limiter: e.g. default 60 requests per 1 minute
  ratelimit = new Ratelimit({
    redis: redisClient,
    limiter: Ratelimit.slidingWindow(60, "60 s"),
    analytics: true,
    prefix: "resumeos_ratelimit",
  });
}

export interface RateLimitOptions {
  key: string;
  limit?: number;
  windowSeconds?: number;
}

/**
 * Basic rate-limiting check helper. Returns boolean indicating if request is allowed.
 */
export async function checkRateLimit(opts: RateLimitOptions): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  if (!ratelimit) {
    // If Redis is not configured (e.g. self-hosting, local dev), bypass rate limit
    return { success: true, limit: 1000, remaining: 1000, reset: 0 };
  }

  const customLimiter = opts.limit && opts.windowSeconds && redisClient
    ? new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(opts.limit, `${opts.windowSeconds} s`),
        analytics: true,
        prefix: `resumeos_ratelimit_${opts.key}`,
      })
    : ratelimit;

  const result = await customLimiter.limit(opts.key);

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}
