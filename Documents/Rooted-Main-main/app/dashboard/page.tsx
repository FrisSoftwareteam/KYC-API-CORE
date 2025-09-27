import { Calendar, Heart, MapPin, Star, Clock, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">r</span>
              </div>
              <span className="font-geist font-bold text-xl text-foreground">rooted.</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                Browse
              </Link>
              <Link href="/providers" className="text-muted-foreground hover:text-foreground transition-colors">
                Providers
              </Link>
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">JD</AvatarFallback>
                </Avatar>
                <span className="text-foreground font-medium">Jane Doe</span>
                <Button variant="ghost" size="sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80">
            <Card className="border-border">
              <CardHeader className="text-center pb-4">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">JD</AvatarFallback>
                </Avatar>
                <CardTitle className="font-geist">Jane Doe</CardTitle>
                <CardDescription>Member since January 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-3" />
                  My Appointments
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-3" />
                  Favorite Providers
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-3" />
                  Reviews & Ratings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-3" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            {/* Welcome Section */}
            <div>
              <h1 className="font-geist font-bold text-3xl text-foreground mb-2">Welcome back, Jane!</h1>
              <p className="text-muted-foreground">Here's what's happening with your beauty appointments</p>
            </div>

            {/* Upcoming Appointments */}
            <section>
              <h2 className="font-geist font-semibold text-xl text-foreground mb-4">Upcoming Appointments</h2>
              <div className="space-y-4">
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                          <img
                            src="/modern-hair-salon.png"
                            alt="Bella's Hair Studio"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-geist font-semibold text-foreground mb-1">Balayage Hair Color</h3>
                          <p className="text-primary font-medium mb-2">Bella's Hair Studio</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Tomorrow, Jan 15</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>2:30 PM</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>Downtown</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                          <img
                            src="/luxury-spa-treatment-room.png"
                            alt="Zen Spa & Wellness"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-geist font-semibold text-foreground mb-1">Deep Tissue Massage</h3>
                          <p className="text-primary font-medium mb-2">Zen Spa & Wellness</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Friday, Jan 17</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>11:00 AM</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>Midtown</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Favorite Providers */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-geist font-semibold text-xl text-foreground">Your Favorite Providers</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: "Bella's Hair Studio",
                    category: "Hair Styling",
                    rating: 4.9,
                    image: "/modern-hair-salon.png",
                    lastVisit: "2 weeks ago",
                  },
                  {
                    name: "Nail Artistry",
                    category: "Nail Care",
                    rating: 4.9,
                    image: "/elegant-nail-salon.png",
                    lastVisit: "1 month ago",
                  },
                ].map((provider, index) => (
                  <Card key={index} className="border-border hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                          <img
                            src={provider.image || "/placeholder.svg"}
                            alt={provider.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{provider.name}</h3>
                          <p className="text-sm text-primary">{provider.category}</p>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-primary text-primary" />
                              <span className="text-xs text-muted-foreground">{provider.rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Last visit: {provider.lastVisit}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Book Again
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section>
              <h2 className="font-geist font-semibold text-xl text-foreground mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/providers">
                  <Card className="border-border hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h3 className="font-medium text-foreground mb-2">Book New Appointment</h3>
                      <p className="text-sm text-muted-foreground">Find and book with new providers</p>
                    </CardContent>
                  </Card>
                </Link>
                <Card className="border-border hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-medium text-foreground mb-2">Rebook Favorite</h3>
                    <p className="text-sm text-muted-foreground">Quick booking with saved providers</p>
                  </CardContent>
                </Card>
                <Card className="border-border hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Star className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-medium text-foreground mb-2">Leave Review</h3>
                    <p className="text-sm text-muted-foreground">Share your experience</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
