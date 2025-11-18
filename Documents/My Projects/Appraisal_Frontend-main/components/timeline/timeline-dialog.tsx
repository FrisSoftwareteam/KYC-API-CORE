"use client";

import type React from "react";

import { useState } from "react";
import {
  Calendar,
  Clock,
  FileText,
  Package,
  ShoppingCart,
  Truck,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type TimelineItem = {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending" | "cancelled" | "delayed";
  icon: React.ReactNode;
};

const timelineData: TimelineItem[] = [
  {
    id: "1",
    date: "Jan 12, 2024",
    time: "09:15 AM",
    title: "Order Placed",
    description: "Your order #ORD-2024-7829 has been placed successfully.",
    status: "completed",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    id: "2",
    date: "Jan 12, 2024",
    time: "10:30 AM",
    title: "Order Confirmed",
    description: "Your order has been confirmed and is being processed.",
    status: "completed",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "3",
    date: "Jan 13, 2024",
    time: "02:45 PM",
    title: "Order Processing",
    description: "Your items are being prepared for shipping.",
    status: "completed",
    icon: <Package className="h-5 w-5" />,
  },
  {
    id: "4",
    date: "Jan 14, 2024",
    time: "11:20 AM",
    title: "Order Shipped",
    description: "Your package is on its way to you.",
    status: "in-progress",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    id: "5",
    date: "Jan 16, 2024",
    time: "09:00 AM",
    title: "Delivery Attempt",
    description:
      "Delivery was attempted but no one was available to receive the package.",
    status: "delayed",
    icon: <User className="h-5 w-5" />,
  },
  {
    id: "6",
    date: "Jan 17, 2024",
    time: "Expected",
    title: "Delivery",
    description: "Your package is scheduled to be delivered.",
    status: "pending",
    icon: <Calendar className="h-5 w-5" />,
  },
];

export function TimelineDialog() {
  const [open, setOpen] = useState(false);

  const getStatusColor = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "pending":
        return "bg-amber-500";
      case "cancelled":
        return "bg-red-500";
      case "delayed":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusTextColor = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "in-progress":
        return "text-blue-500";
      case "pending":
        return "text-amber-500";
      case "cancelled":
        return "text-red-500";
      case "delayed":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled>
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Order Timeline</DialogTitle>
          <DialogDescription>
            Track the progress of your order with our detailed timeline.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[22px] top-0 h-full w-[2px] bg-gray-200"></div>

            {/* Timeline items */}
            <div className="space-y-6">
              {timelineData.map((item, index) => (
                <div key={item.id} className="relative flex gap-4">
                  {/* Indicator dot */}
                  <div className="relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border bg-background">
                    <div
                      className={cn(
                        "absolute h-5 w-5 animate-pin rounded-full",
                        getStatusColor(item.status)
                      )}
                    ></div>
                    <div className="absolute h-7 w-7 rounded-full border border-dashed"></div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          getStatusTextColor(item.status)
                        )}
                      >
                        {item.title}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </div>
                    </div>
                    <time className="text-xs text-muted-foreground">
                      {item.date}
                    </time>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
            <span className="text-xs">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
            <span className="text-xs">Delayed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Cancelled</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
