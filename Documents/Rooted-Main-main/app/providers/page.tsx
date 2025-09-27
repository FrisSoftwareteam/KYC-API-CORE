import { Search, MapPin, Star, SlidersHorizontal, Heart, Clock, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"

const providers = [
  {
    id: 1,
    name: "Bella's Hair Studio",
    category: "Hair Styling",
    rating: 4.9,
    reviews: 127,
    location: "Downtown",
    distance: "0.8 miles",
    priceRange: "$$",
    image: "/modern-hair-salon.png",
    services: ["Haircuts", "Hair Color", "Styling", "Treatments"],
    specialties: ["Balayage", "Keratin Treatment", "Wedding Hair"],
    nextAvailable: "Today 2:30 PM",
    verified: true,
    responseTime: "Usually responds in 1 hour",
  },
  {
    id: 2,
    name: "Zen Spa & Wellness",
    category: "Spa & Massage",
    rating: 4.8,
    reviews: 89,
    location: "Midtown",
    distance: "1.2 miles",
    priceRange: "$$$",
    image: "/luxury-spa-treatment-room.png",
    services: ["Deep Tissue", "Swedish", "Hot Stone", "Aromatherapy"],
    specialties: ["Couples Massage", "Prenatal Massage", "Sports Therapy"],
    nextAvailable: "Tomorrow 10:00 AM",
    verified: true,
    responseTime: "Usually responds in 30 minutes",
  },
  {
    id: 3,
    name: "Nail Artistry",
    category: "Nail Care",
    rating: 4.9,
    reviews: 156,
    location: "Uptown",
    distance: "2.1 miles",
    priceRange: "$$",
    image: "/elegant-nail-salon.png",
    services: ["Manicures", "Pedicures", "Nail Art", "Gel Polish"],
    specialties: ["Custom Nail Art", "Gel Extensions", "Bridal Nails"],
    nextAvailable: "Today 4:00 PM",
    verified: true,
    responseTime: "Usually responds in 2 hours",
  },
  {
    id: 4,
    name: "Glow Skincare Studio",
    category: "Skincare",
    rating: 4.7,
    reviews: 73,
    location: "West End",
    distance: "1.8 miles",
    priceRange: "$$$",
    image: "/skincare-treatment-room.png",
    services: ["Facials", "Chemical Peels", "Microdermabrasion", "LED Therapy"],
    specialties: ["Anti-Aging", "Acne Treatment", "Sensitive Skin"],
    nextAvailable: "Friday 11:30 AM",
    verified: true,
    responseTime: "Usually responds in 45 minutes",
  },
  {
    id: 5,
    name: "Makeup by Sarah",
    category: "Makeup",
    rating: 4.8,
    reviews: 92,
    location: "East Side",
    distance: "3.2 miles",
    priceRange: "$$",
    image: "/makeup-artist-studio.png",
    services: ["Bridal Makeup", "Event Makeup", "Photoshoot", "Lessons"],
    specialties: ["Airbrush Makeup", "Special Effects", "Editorial"],
    nextAvailable: "Saturday 9:00 AM",
    verified: true,
    responseTime: "Usually responds in 1 hour",
  },
  {
    id: 6,
    name: "Brow & Lash Lounge",
    category: "Brow & Lash",
    rating: 4.6,
    reviews: 64,
    location: "South District",
    distance: "2.7 miles",
    priceRange: "$",
    image: "/brow-lash-studio.png",
    services: ["Brow Shaping", "Lash Extensions", "Brow Tinting", "Lash Lift"],
    specialties: ["Microblading", "Volume Lashes", "Brow Lamination"],
    nextAvailable: "Today 6:00 PM",
    verified: false,
    responseTime: "Usually responds in 3 hours",
  },
]

export default function ProvidersPage() {
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
              <a href="#" className="text-foreground font-medium">
                Providers
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Trending
              </a>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 space-y-6">
            <div className="bg-white rounded-lg p-6 border border-border">
              <h2 className="font-geist font-semibold text-lg mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </h2>

              {/* Search */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Provider name or service..." className="pl-10" />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Enter location..." className="pl-10" />
                  </div>
                </div>

                {/* Service Category */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Service Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="hair">Hair Styling</SelectItem>
                      <SelectItem value="nails">Nail Care</SelectItem>
                      <SelectItem value="spa">Spa & Massage</SelectItem>
                      <SelectItem value="skincare">Skincare</SelectItem>
                      <SelectItem value="makeup">Makeup</SelectItem>
                      <SelectItem value="brows">Brow & Lash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Price Range</label>
                  <div className="space-y-3">
                    <Slider defaultValue={[50]} max={200} step={10} className="w-full" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>$0</span>
                      <span>$200+</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Minimum Rating</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Rating</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4.0">4.0+ Stars</SelectItem>
                      <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Availability</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Time</SelectItem>
                      <SelectItem value="today">Available Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="weekend">Weekends</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-black text-white hover:bg-gray-800">Apply Filters</Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-geist font-bold text-2xl text-foreground mb-1">Beauty Providers</h1>
                <p className="text-muted-foreground">Found {providers.length} providers in your area</p>
              </div>
              <div className="flex items-center gap-4">
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by: Recommended" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="distance">Nearest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Provider Cards */}
            <div className="space-y-6">
              {providers.map((provider) => (
                <Card
                  key={provider.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Provider Image */}
                    <div className="md:w-80 aspect-video md:aspect-square bg-muted relative overflow-hidden">
                      <img
                        src={provider.image || "/placeholder.svg"}
                        alt={provider.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {provider.verified && <Badge className="bg-primary text-primary-foreground">Verified</Badge>}
                      </div>
                      <Button size="sm" variant="secondary" className="absolute top-4 right-4 w-8 h-8 p-0">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Provider Details */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-geist font-bold text-xl text-foreground mb-1">{provider.name}</h3>
                          <p className="text-primary font-medium">{provider.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            <span className="font-semibold">{provider.rating}</span>
                            <span className="text-muted-foreground text-sm">({provider.reviews})</span>
                          </div>
                          <div className="text-sm text-muted-foreground">{provider.priceRange}</div>
                        </div>
                      </div>

                      {/* Location & Distance */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{provider.location}</span>
                        </div>
                        <span>•</span>
                        <span>{provider.distance}</span>
                      </div>

                      {/* Services */}
                      <div className="mb-4">
                        <h4 className="font-medium text-sm text-foreground mb-2">Services:</h4>
                        <div className="flex flex-wrap gap-2">
                          {provider.services.map((service) => (
                            <Badge key={service} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Specialties */}
                      <div className="mb-4">
                        <h4 className="font-medium text-sm text-foreground mb-2">Specialties:</h4>
                        <p className="text-sm text-muted-foreground">{provider.specialties.join(", ")}</p>
                      </div>

                      {/* Availability & Response Time */}
                      <div className="flex items-center gap-6 mb-4 text-sm">
                        <div className="flex items-center gap-1 text-primary">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">Next: {provider.nextAvailable}</span>
                        </div>
                        <div className="text-muted-foreground">{provider.responseTime}</div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-black text-white hover:bg-gray-800">View Profile & Book</Button>
                        <Button variant="outline" size="sm" className="px-3 bg-transparent">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="px-3 bg-transparent">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Providers
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
