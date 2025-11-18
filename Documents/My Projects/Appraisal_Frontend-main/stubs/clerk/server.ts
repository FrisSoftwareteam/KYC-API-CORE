// Minimal server-side Clerk stubs to keep build working without Clerk.
import { NextResponse } from "next/server";

// Accept an optional handler to match Clerk's API shape.
export function clerkMiddleware(
  _handler?: (auth: () => { userId?: string }, req: any) => any
) {
  // Return a middleware function compatible with Next.js
  return (_req: any) => NextResponse.next();
}

export function auth() {
  return { userId: undefined } as const;
}

export async function currentUser() {
  return null;
}

export const clerkClient: any = {};

export type WebhookEvent = any;
