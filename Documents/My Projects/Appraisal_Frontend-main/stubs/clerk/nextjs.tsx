"use client";

// Minimal no-op stubs to remove Clerk dependency at runtime.
// The app uses Firebase for authentication instead.

import * as React from "react";

export function UserButton(_: any) {
  return null;
}

export function SignIn(_: any) {
  return null;
}

export function SignInButton(_: any) {
  return null;
}

export function CreateOrganization(_: any) {
  return null;
}

type StubUser = {
  id?: string;
  firstName?: string;
  lastName?: string;
  emailAddresses?: Array<{ emailAddress: string }>; 
};

export function useUser(): { user: StubUser | null; isLoaded: boolean } {
  return { user: null, isLoaded: true };
}

export function useAuth() {
  return { isSignedIn: false, signOut: async () => {}, userId: null } as const;
}

export function useSignIn() {
  return { isLoaded: true, signIn: null } as const;
}

export function useSignUp() {
  return { isLoaded: true, signUp: null } as const;
}
