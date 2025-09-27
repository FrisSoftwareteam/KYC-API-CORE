import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const fallbackServices = [
  {
    id: 1,
    name: "Balayage Hair Color",
    booking_count: 234,
    trend_percentage: 15,
    price: 115,
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/natural-hair-styling-CUJOZJbZ6rYp6owUgERCtaPyLlCd51.png",
    provider_name: "HAIR LOUNGE",
    provider_rating: 4.9,
    provider_reviews: 112,
  },
  {
    id: 2,
    name: "Deep Tissue Massage",
    booking_count: 189,
    trend_percentage: 22,
    price: 215,
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/body-massage-therapy-Rc6Ae3Z2P2JlN2gYpJIHJeFB5pQEoi.png",
    provider_name: "ITSMBEAUTY",
    provider_rating: 4.9,
    provider_reviews: 13,
  },
  {
    id: 3,
    name: "Gel Manicure",
    booking_count: 156,
    trend_percentage: 8,
    price: 125,
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/intricate-nail-art-UbtnEsQUrbiuVRA2uzUgwI5sGHE4oS.png",
    provider_name: "FLESH TATTOO",
    provider_rating: 4.9,
    provider_reviews: 13,
  },
  {
    id: 4,
    name: "Hydrating Facial",
    booking_count: 143,
    trend_percentage: 18,
    price: 115,
    image_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/eyelash-extensions-2wbkihUicJMra7wq9CqBDx74k8g2PH.png",
    provider_name: "CBSALON",
    provider_rating: 4.9,
    provider_reviews: 13,
  },
]

export async function GET() {
  try {
    // Check if environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log("[v0] Supabase environment variables not found, using fallback data")
      return NextResponse.json(fallbackServices)
    }

    const supabase = await createClient()

    const { data: services, error } = await supabase
      .from("services")
      .select("*")
      .order("booking_count", { ascending: false })
      .limit(4)

    // If we successfully got data from the database, return it
    if (!error && services && services.length > 0) {
      console.log("[v0] Successfully fetched services from database")
      return NextResponse.json(services)
    }

    // Otherwise, use fallback data
    console.log("[v0] Database query failed or returned no data, using fallback data")
    return NextResponse.json(fallbackServices)
  } catch (error) {
    console.log("[v0] API error occurred, using fallback data:", error)
    return NextResponse.json(fallbackServices)
  }
}
