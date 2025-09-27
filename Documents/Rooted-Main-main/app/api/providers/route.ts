import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const fallbackProviders = [
  {
    id: 1,
    name: "KDHAIR",
    location: "Leeds, United Kingdom",
    rating: 4.9,
    review_count: 13,
    starting_price: 15,
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img%201.jpg-LkglZlEP7XUg2yneRtmKSQo4j1hIOW.jpeg",
    category: "Hairstylist",
  },
  {
    id: 2,
    name: "Crowned Beauty",
    location: "Chelmsford, UK",
    rating: 4.9,
    review_count: 13,
    starting_price: 15,
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img%201.jpg-LkglZlEP7XUg2yneRtmKSQo4j1hIOW.jpeg",
    category: "Hairstylist",
  },
  {
    id: 3,
    name: "ITSMBEAUTY",
    location: "Manchester, UK",
    rating: 4.9,
    review_count: 13,
    starting_price: 15,
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img%201.jpg-LkglZlEP7XUg2yneRtmKSQo4j1hIOW.jpeg",
    category: "Makeup",
  },
  {
    id: 4,
    name: "The Tail Bandit",
    location: "Newcastle, UK",
    rating: 4.9,
    review_count: 13,
    starting_price: 15,
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img%201.jpg-LkglZlEP7XUg2yneRtmKSQo4j1hIOW.jpeg",
    category: "Hairstylist",
  },
]

export async function GET() {
  try {
    // Check if environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log("[v0] Supabase environment variables not found, using fallback data")
      return NextResponse.json(fallbackProviders)
    }

    const supabase = await createClient()

    const { data: providers, error } = await supabase
      .from("providers")
      .select("*")
      .order("rating", { ascending: false })
      .limit(5)

    // If we successfully got data from the database, return it
    if (!error && providers && providers.length > 0) {
      console.log("[v0] Successfully fetched providers from database")
      return NextResponse.json(providers)
    }

    // Otherwise, use fallback data
    console.log("[v0] Database query failed or returned no data, using fallback data")
    return NextResponse.json(fallbackProviders)
  } catch (error) {
    console.log("[v0] API error occurred, using fallback data:", error)
    return NextResponse.json(fallbackProviders)
  }
}
