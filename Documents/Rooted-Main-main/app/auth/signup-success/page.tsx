"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function SignupSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email")
  const type = searchParams.get("type")

  const isProvider = type === "provider"

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {isProvider ? "Verification Required" : "Account Created!"}
        </h1>

        {isProvider ? (
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              We've sent a verification code to <strong>{email}</strong>. Please check your email and use the code to
              complete your registration.
            </p>
            <Button
              onClick={() => router.push(`/auth/verify-otp?email=${encodeURIComponent(email || "")}`)}
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium"
            >
              Enter Verification Code
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">
              Your account has been created successfully! You can now sign in and start exploring beauty services.
            </p>
            <Button
              onClick={() => router.push("/auth/signin")}
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium"
            >
              Sign In
            </Button>
          </div>
        )}

        <div className="mt-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SignupSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupSuccessContent />
    </Suspense>
  )
}
