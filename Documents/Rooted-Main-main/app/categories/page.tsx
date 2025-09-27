import { ArrowLeft, Users, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const categories = [
  {
    id: "hair",
    name: "Hair Services",
    description: "Professional hair styling, coloring, and treatments",
    image: "/hair-services-category.png",
    providers: 156,
    avgPrice: "$45-120",
    subcategories: ["Haircuts", "Hair Color", "Styling", "Treatments", "Extensions"],
    popular: ["Balayage", "Blowout", "Keratin Treatment"],
  },
  {
    id: "nails",
    name: "Nail Care",
    description: "Manicures, pedicures, and nail art services",
    image: "/nail-care-category.png",
    providers: 89,
    avgPrice: "$25-65",
    subcategories: ["Manicures", "Pedicures", "Nail Art", "Gel Polish", "Acrylics"],
    popular: ["Gel Manicure", "French Tips", "Nail Art Design"],
  },
  {
    id: "spa",
    name: "Spa & Massage",
    description: "Relaxing spa treatments and therapeutic massages",
    image: "/spa-massage-category.png",
    providers: 67,
    avgPrice: "$60-150",
    subcategories: ["Deep Tissue", "Swedish", "Hot Stone", "Aromatherapy", "Couples"],
    popular: ["Deep Tissue Massage", "Hot Stone", "Relaxation Package"],
  },
  {
    id: "skincare",
    name: "Skincare & Facials",
    description: "Professional skincare treatments and facial services",
    image: "/skincare-facials-category.png",
    providers: 78,
    avgPrice: "$50-130",
    subcategories: ["Hydrating Facials", "Anti-Aging", "Acne Treatment", "Chemical Peels", "Microdermabrasion"],
    popular: ["Hydrating Facial", "Anti-Aging Treatment", "Acne Facial"],
  },
  {
    id: "makeup",
    name: "Makeup Services",
    description: "Professional makeup application for events and occasions",
    image: "/makeup-services-category.png",
    providers: 45,
    avgPrice: "$40-100",
    subcategories: ["Bridal Makeup", "Event Makeup", "Photoshoot", "Lessons", "Airbrush"],
    popular: ["Bridal Makeup", "Special Event", "Makeup Lesson"],
  },
  {
    id: "brows",
    name: "Brow & Lash",
    description: "Eyebrow shaping, lash extensions, and enhancement services",
    image: "/brow-lash-category.png",
    providers: 92,
    avgPrice: "$30-80",
    subcategories: ["Brow Shaping", "Lash Extensions", "Brow Tinting", "Lash Lift", "Microblading"],
    popular: ["Lash Extensions", "Brow Shaping", "Lash Lift"],
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground hover:text-foreground transition-colors">Back</span>
              </Link>
              <div className="flex items-center space-x-2">
                <span className="font-geist font-bold text-2xl text-foreground">rooted.</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-foreground font-medium">
                Browse
              </a>
              <Link href="/providers" className="text-muted-foreground hover:text-foreground transition-colors">
                Providers
              </Link>
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

      {/* Page Header */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-geist font-bold text-4xl md:text-5xl text-foreground mb-4">Browse Beauty Services</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover the perfect beauty service for you. From hair styling to spa treatments, find trusted
              professionals in every category.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white"
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-xl font-geist mb-1">{category.name}</CardTitle>
                      <CardDescription className="text-muted-foreground">{category.description}</CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{category.providers} providers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{category.avgPrice}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 space-y-4">
                  {/* Subcategories */}
                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-2">Services Include:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.slice(0, 3).map((sub) => (
                        <Badge key={sub} variant="secondary" className="text-xs">
                          {sub}
                        </Badge>
                      ))}
                      {category.subcategories.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{category.subcategories.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Popular Services */}
                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-2 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      Popular This Week:
                    </h4>
                    <div className="space-y-1">
                      {category.popular.map((service) => (
                        <div key={service} className="text-sm text-muted-foreground">
                          • {service}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href="/providers">
                    <Button className="w-full mt-4 bg-black text-white hover:bg-gray-800">
                      Browse {category.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-geist font-bold text-black mb-2">500+</div>
              <div className="text-muted-foreground">Verified Providers</div>
            </div>
            <div>
              <div className="text-3xl font-geist font-bold text-black mb-2">50k+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-geist font-bold text-black mb-2">4.8</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-geist font-bold text-black mb-2">24/7</div>
              <div className="text-muted-foreground">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="font-geist font-bold text-3xl text-foreground mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-muted-foreground mb-8">
            Our team is constantly adding new service categories and providers. Let us know what you need and we'll help
            you find the perfect match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800">
              Request a Service
            </Button>
            <Button size="lg" variant="outline">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
