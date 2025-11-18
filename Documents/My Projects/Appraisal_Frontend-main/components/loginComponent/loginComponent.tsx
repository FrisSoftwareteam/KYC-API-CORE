"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function SignInPage() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayInterval = 5000; // 3 seconds

  console.log(setAutoplay);

  const images = ["/fris_lady.png", "/fris_hr.png", "/hr.png"];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        api?.scrollNext();
      }, autoplayInterval);

      return () => clearInterval(interval);
    }
  }, [api, autoplay]);

  const goToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-8  bg-gradient-to-b from-blue-300 to-blue-800 flex items-center justify-center">
        <SignIn
          path="/"
          forceRedirectUrl="/auth-callback"
          // fallbackRedirectUrl="/auth-callback"
          afterSignOutUrl="/"
          routing="path"
          signUpUrl="/sign-up"
        />
      </div>
      <div className="w-full md:w-1/2 bg-gray-100 p-8 flex items-center flex-col justify-center">
        <Carousel
          setApi={setApi}
          className="w-full max-w-xl flex mt-32 items-center justify-center sm:none"
        >
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    width={700}
                    height={700}
                    className="w-full h-auto object-cover rounded-md shadow-md"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
        <div className="flex-1 justify-center mt-2 space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <Button
              key={index}
              variant="outline"
              size="icon"
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-primary" : "bg-secondary"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
