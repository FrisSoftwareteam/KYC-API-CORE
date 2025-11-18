import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@mantine/core";

import ShimmerButton from "@/components/ui/shimmer-button";
import Link from "next/link";

export default function HeroCard() {
  return (
    <section className="w-full py-2 md:py-2 lg:py-3 xl:py-1">
      <div className="container px-10 md:px-1">
        <Card className="bg-card text-card-foreground">
          <CardContent className="p-2 sm:p-10">
            <div className="flex flex-col-2 gap-8 md:flex-row md:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Welcome to Appraisal Module
                  </h1>
                  <p className="max-w-[800px] text-muted-foreground md:text-xl mt-4 p-2">
                    The appraisal for the year {new Date().getFullYear()} is
                    currently{" "}
                    <Badge color="lime" size="md">
                      Live
                    </Badge>
                    . Each employee is expected to participate in this exercise.
                    Complete all of the questions and submit them for your line
                    manager for action.
                  </p>
                  <p className="max-w-[800px] text-muted-foreground md:text-xl mt-4 p-2">
                    To get started, click the link below.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {/* <ShinyButton className="size-auto">Get Started</ShinyButton> */}

                  <Link href={"/users/question"}>
                    <ShimmerButton
                      className="shadow-2xl"
                      borderRadius="50px"
                      background="rgba(246,191, 0)"
                    >
                      <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none w-60 tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                        Get Started
                      </span>
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-end">
                <Image
                  src="/appraisal.jpg"
                  alt="Hero Image"
                  width={550}
                  height={750}
                  className="overflow-hidden rounded-lg object-cover object-center"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
