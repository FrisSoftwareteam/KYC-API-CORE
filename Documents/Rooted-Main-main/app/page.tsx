"use client"

import { Search, Star, MapPin, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Provider {
  id: string
  name: string
  location: string
  rating: number
  review_count: number
  starting_price: number
  image_url: string
  specialties: string[]
  category: string
}

interface Service {
  id: string
  name: string
  category: string
  booking_count: number
  trend_percentage: number
  price: number
  provider_name: string
  image_url: string
}

export default function HomePage() {
  const heroImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img%201.jpg-LkglZlEP7XUg2yneRtmKSQo4j1hIOW.jpeg",
      alt: "Two Black women showcasing natural beauty",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img%204.jpg-tIA4NgrN9HWujldzp6ARpZTJhCgqUC.jpeg",
      alt: "Three diverse women in profile view",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img%203.jpg-ISvxowtDTgoGz3NQtf6zeqCTVSb7ci.jpeg",
      alt: "Four diverse women showcasing different beauty styles",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img%202.jpg-b5j2tb12Ow8B3kf83o8syu92wIG1zd.jpeg",
      alt: "Three Black women in elegant white attire",
    },
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [providers, setProviders] = useState<Provider[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [isLoadingProviders, setIsLoadingProviders] = useState(true)
  const [isLoadingServices, setIsLoadingServices] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1))
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("/api/providers")
        if (response.ok) {
          const data = await response.json()
          setProviders(data)
        }
      } catch (error) {
        console.error("Failed to fetch providers:", error)
      } finally {
        setIsLoadingProviders(false)
      }
    }

    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services")
        if (response.ok) {
          const data = await response.json()
          setServices(data)
        }
      } catch (error) {
        console.error("Failed to fetch services:", error)
      } finally {
        setIsLoadingServices(false)
      }
    }

    fetchProviders()
    fetchServices()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-geist font-bold text-2xl text-foreground">rooted.</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                Browse
              </Link>
              <Link href="/providers" className="text-muted-foreground hover:text-foreground transition-colors">
                Providers
              </Link>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Trending
              </a>
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                  Get Started
                </Button>
              </Link>
            </nav>
            {/* Mobile menu */}
            <div className="md:hidden">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="rounded-full bg-black text-white px-4">
                  Hi Ruth
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="font-geist font-bold text-4xl md:text-6xl text-white mb-8 max-w-4xl">
            Discover beauty professionals who knows your
            <br />
            <span className="text-white">skin, hair & culture !</span>
          </h1>

          {/* Search Interface */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-3xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input placeholder="Search Service, provider" className="pl-10 h-12 text-base border-gray-200" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input placeholder="Enter your location" className="pl-10 h-12 text-base border-gray-200" />
              </div>
              <Select>
                <SelectTrigger className="h-12 text-base border-gray-200">
                  <SelectValue placeholder="Select Ethnicity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ethnicities</SelectItem>
                  <SelectItem value="african">African</SelectItem>
                  <SelectItem value="caribbean">Caribbean</SelectItem>
                  <SelectItem value="mixed">Mixed Heritage</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full h-12 bg-black text-white hover:bg-gray-800 text-base font-medium">
              Find Your Perfect match
            </Button>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="font-geist font-bold text-3xl text-center text-foreground mb-12">Explore by Category</h2>

          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: "Hair", image: "/natural-hair-styling.png" },
              { name: "Nails", image: "/intricate-nail-art.png" },
              { name: "Lash", image: "/eyelash-extensions.png" },
              { name: "Body", image: "/body-massage-therapy.png" },
              { name: "Tattoo & Henna", image: "/placeholder-r5uz8.png" },
              { name: "Makeup", image: "/placeholder-6gz5n.png" },
              { name: "Waxing", image: "/waxing-treatment.png" },
              { name: "Barber", image: "/placeholder-x3xlu.png" },
            ].map((category, index) => (
              <Link key={index} href="/categories" className="flex flex-col items-center group">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-3 group-hover:scale-105 transition-transform">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-geist font-bold text-2xl text-foreground">Top Rated Provider</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {isLoadingProviders
              ? // Loading skeleton
                Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden bg-white">
                    <div className="aspect-square bg-gray-200 animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse mb-2 w-2/3" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                    </CardContent>
                  </Card>
                ))
              : providers.map((provider) => (
                  <Card
                    key={provider.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white"
                  >
                    <div className="relative">
                      <div className="aspect-square bg-muted">
                        <img
                          src={provider.image_url || "/placeholder.svg"}
                          alt={provider.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Badge className="absolute top-3 left-3 bg-black text-white text-xs">{provider.category}</Badge>
                      <Button variant="ghost" size="sm" className="absolute top-3 right-3 p-1 h-auto">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{provider.name}</h3>
                          <p className="text-sm text-muted-foreground">{provider.location}</p>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{provider.rating}</span>
                          <span className="text-muted-foreground">({provider.review_count})</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Starting from <span className="font-semibold text-foreground">£{provider.starting_price}</span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </section>

      {/* Trending Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="font-geist font-bold text-2xl text-foreground mb-8">Trending Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoadingServices
              ? // Loading skeleton
                Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden bg-white">
                    <div className="aspect-square bg-gray-200 animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-1/2" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                    </CardContent>
                  </Card>
                ))
              : services.map((service) => (
                  <Card
                    key={service.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white"
                  >
                    <div className="aspect-square bg-muted">
                      <img
                        src={service.image_url || "/placeholder.svg"}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                      <p className="text-2xl font-bold text-foreground mb-2">£{service.price}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{service.provider_name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{service.provider_name}</p>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">4.9 ({service.booking_count} bookings)</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="font-geist font-bold text-3xl text-foreground mb-4">
            Stay Connected with Your Beauty Community
          </h2>
          <p className="text-muted-foreground mb-8">
            Get exclusive tips, provider spotlights, and special offers delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Email Address" className="flex-1 h-12 text-base" />
            <Button className="bg-black text-white hover:bg-gray-800 h-12 px-8">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">London, UK</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">📞 020 7123 4567</p>
              <p className="text-sm text-muted-foreground">✉️ hello@rooted.beauty</p>
            </div>
            <div>
              <h3 className="font-geist font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-geist font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Data Protection
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Term of Use
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 013.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 013.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12.017 0C8.396 0 7.929.013 6.71.072 5.493.131 4.73.333 4.058.63c-.68.3-1.18.66-1.68 1.16C1.928 2.28 1.566 2.78 1.266 3.46c-.297.672-.499 1.435-.558 2.652C.649 7.331.636 7.798.636 11.419c0 3.62.013 4.088.072 5.307.059 1.217.261 1.98.558 2.652.3.68.662 1.18 1.162 1.68.5.5 1 .862 1.68 1.162.672.297 1.435.499 2.652.558 1.219.059 1.686.072 5.307.072 3.62 0 4.088-.013 5.307-.072 1.217-.059 1.98-.261 2.652-.558a4.661 4.661 0 001.68-1.162c.5-.5.862-1 1.162-1.68.297-.672.499-1.435.558-2.652.059-1.219.072-1.686.072-5.307 0-3.62-.013-4.088-.072-5.307-.059-1.217-.261-1.98-.558-2.477a4.133 4.133 0 01-.998 1.533c-.466.466-.911.756-1.533.998-.471.182-1.178.399-2.477.458-1.4.058-1.823.072-5.38.072-3.557 0-3.98-.014-5.38-.072-1.299-.059-2.006-.276-2.477-.458a4.133 4.133 0 01-1.533-.998 4.133 4.133 0 01-.998-1.533c-.182-.471-.399-1.178-.458-2.477-.058-1.4-.072-1.823-.072-5.38 0-3.557.014-3.98.072-5.38.059-1.299.276-2.006.458-2.477.242-.622.532-1.067.998-1.533.466-.466.911-.756 1.533-.998.471-.182 1.178-.399 2.477-.458 1.4-.058 1.823-.072 5.38-.072z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12.017 0C8.396 0 7.929.013 6.71.072 5.493.131 4.73.333 4.058.63c-.68.3-1.18.66-1.68 1.16C1.928 2.28 1.566 2.78 1.266 3.46c-.297.672-.499 1.435-.558 2.652C.649 7.331.636 7.798.636 11.419c0 3.62.013 4.088.072 5.307.059 1.217.261 1.98.558 2.652.3.68.662 1.18 1.162 1.68.5.5 1 .862 1.68 1.162.672.466.911.756 1.533.998.471.182 1.178.399 2.477.458 1.4.058 1.823.072 5.38-.072z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Rooted. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
