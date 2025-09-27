"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, User, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
// Import Firebase Auth
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase/config"

export default function SignUpPage() {
  const [step, setStep] = useState<"account-type" | "form">("account-type")
  const [accountType, setAccountType] = useState<"customer" | "provider" | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      // Create user via Firebase
      await createUserWithEmailAndPassword(auth, email, password)

      // For demonstration, if needed you can store user details in Firestore or Realtime DB here.
      // For now, simply route to a success page depending on account type.

      if (accountType === "provider") {
        router.push(`/auth/signup-success?email=${encodeURIComponent(email)}&type=provider`)
      } else {
        router.push(`/auth/signup-success?email=${encodeURIComponent(email)}&type=customer`)
      }
    } catch (err: any) {
      console.error("Firebase signup error:", err)
      setError(err?.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (step === "account-type") {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <div className="hidden lg:flex lg:w-1/2 relative">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/login%20sign%20up.jpg-8Nh4L5bK7rz57QR27EpGxOg4Cxvity.jpeg"
            alt="Beauty professionals"
            className="w-full h-full object-cover rounded-r-3xl"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="flex items-center space-x-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>

            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✨</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Rooted</h1>
              <p className="text-gray-600">Create your account to get started</p>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 text-center">I want to...</h2>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setAccountType("customer")
                    setStep("form")
                  }}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Find Services</h3>
                      <p className="text-gray-600 text-sm">Connect with local service providers</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setAccountType("provider")
                    setStep("form")
                  }}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <Briefcase className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Offer Services</h3>
                      <p className="text-gray-600 text-sm">Grow your business in your community</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/login%20sign%20up.jpg-8Nh4L5bK7rz57QR27EpGxOg4Cxvity.jpeg"
          alt="Beauty professionals"
          className="w-full h-full object-cover rounded-r-3xl"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Rooted</h1>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          <button
            onClick={() => setStep("account-type")}
            className="flex items-center space-x-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to account type</span>
          </button>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
                  First Name
                </label>
                <Input
                  name="firstName"
                  id="firstName"
                  type="text"
                  className="w-full h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
                  Last Name
                </label>
                <Input
                  name="lastName"
                  id="lastName"
                  type="text"
                  className="w-full h-12 border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email
              </label>
              <Input name="email" id="email" type="email" className="w-full h-12 border-gray-300 rounded-lg" required />
            </div>

            {accountType === "customer" && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                    Password
                  </label>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    className="w-full h-12 border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 mb-2">
                    Confirm Password
                  </label>
                  <Input
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    className="w-full h-12 border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </>
            )}

            {accountType === "provider" && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  As a service provider, you'll be asked for your password to log in. Make sure to
                  create a secure one below.
                </p>
                <div className="mt-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                    Password
                  </label>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    className="w-full h-12 border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 mb-2">
                    Confirm Password
                  </label>
                  <Input
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    className="w-full h-12 border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign up ✨"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-gray-900 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
