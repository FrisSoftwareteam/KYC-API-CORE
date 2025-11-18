"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Building2,
  Users,
  Calendar,
  BarChart3,
  Shield,
  Clock,
} from "lucide-react";
import ButtonComponent from "./ButtonComponent";

const carouselItems = [
  {
    icon: Users,
    title: "Employee Management",
    description:
      "Streamline your workforce with comprehensive employee profiles, onboarding workflows, and performance tracking.",
    color: "bg-blue-500",
    image:
      "https://frstore.blob.core.windows.net/frisops/photo-1577192056296-6538f8708bf2.jpeg",
  },
  {
    icon: Calendar,
    title: "Leave Management",
    description:
      "Simplify time-off requests with automated approval workflows and real-time calendar integration.",
    color: "bg-green-500",
    image:
      "https://frstore.blob.core.windows.net/frisops/photo-1611432579402-7037e3e2c1e4.jpeg",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description:
      "Make data-driven decisions with powerful analytics and customizable reporting tools.",
    color: "bg-purple-500",
    image:
      "https://frstore.blob.core.windows.net/frisops/photo-1664575602276-acd073f104c1.jpeg",
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description:
      "Enterprise-grade security with GDPR compliance and role-based access controls.",
    color: "bg-orange-500",
    image:
      "https://frstore.blob.core.windows.net/frisops/photo-1649532355244-e011eebe7a81.jpeg",
  },
];

export default function LoginUI() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Login Section - Faded Blue Background */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-600 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-yellow-700" />
                <span className="text-2xl font-bold text-gray-900">
                  HR Portal
                </span>
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-gray-900">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Sign in to access your HR dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ButtonComponent />
          </CardContent>
        </Card>
      </div>

      {/* Carousel Section - White Background */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              HR Management System
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to manage your workforce efficiently
            </p>
          </div>

          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {carouselItems.map((item, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0 shadow-xl bg-white overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-80 object-cover"
                        />
                        <div
                          className={`absolute top-4 left-4 ${item.color} p-3 rounded-lg shadow-lg`}
                        >
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="p-6 bg-slate-200 shadow-md rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 space-x-2">
              <CarouselPrevious className="relative inset-0 translate-y-0 bg-gray-100 border-gray-300 hover:bg-gray-200" />
              <CarouselNext className="relative inset-0 translate-y-0 bg-gray-100 border-gray-300 hover:bg-gray-200" />
            </div>
          </Carousel>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide % carouselItems.length
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>

          {/* Additional Features */}
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="bg-green-100 p-2 rounded-lg">
                <Shield className="h-4 w-4 text-green-600" />
              </div>
              <span className="font-medium">Secure Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
