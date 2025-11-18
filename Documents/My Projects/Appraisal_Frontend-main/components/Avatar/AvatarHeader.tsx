"use client";

import { useEffect, useState } from "react";
import {
  User,
  Settings,
  LogOut,
  Shield,
  Calendar,
  Clock,
  ChevronDown,
  Bell,
  Mail,
  Key,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetUserProfile } from "@/zustand/store";
import axios from "axios";
import { auth } from "@/firebase/config";
import firebase from "firebase/compat/app";
import { useRouter } from "next/navigation";

interface UserAvatarMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
    department: string;
    lastLogin: string;
    permissions: string[];
  };
}

export function UserAvatarMenu({ user }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, getUserData, isloading } = useGetUserProfile();
  const { push } = useRouter();

  // Get current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // const handleSignOut = () => {
  //   // Add sign out logic here
  //   console.log("Signing out...");
  //   // You can add your authentication logout logic here
  // };

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-gradient-to-r from-red-500 to-pink-500";
      case "manager":
        return "bg-gradient-to-r from-purple-500 to-indigo-500";
      case "hr":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      case "lead":
        return "bg-gradient-to-r from-orange-500 to-yellow-500";
      default:
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
    }
  };

  useEffect(() => {
    // socket.on("initial_data", (payload) => {
    // console.log("Hello");
    // });

    //Refresh the Page...
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      //  console.log(user);

      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        //https://firstregistrarsnigeria.com/login/v1/currentuser
        await axios
          .get(
            //"https://frislogin.azurewebsites.net/v1/currentuser",

            // "http://localhost:4000/v1/currentuser",

            "https://hrms-app-login.azurewebsites.net/v1/currentuser",

            {
              headers: { authtoken: idTokenResult.token },
            }
          )
          .then((res) => {
            //  localStorage.setItem("User", JSON.stringify(res.data));

            //  socket.emit("user_email", res.data.email);

            getUserData(res.data);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  // console.log(profile);

  const Logout = () => {
    firebase.auth().signOut();

    push("/");
  };

  return (
    <div className="flex items-center gap-4">
      {/* Date and Time Display */}
      <div className="hidden md:flex flex-col items-end text-right">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{formattedTime}</span>
        </div>
      </div>

      {/* Notifications */}
      <Button
        variant="ghost"
        size="sm"
        className="relative p-2 hover:bg-white/20 rounded-full"
        title="Notifications">
        <Bell className="w-5 h-5 text-gray-600" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">3</span>
        </div>
      </Button>

      {/* User Avatar Dropdown */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-3 p-2 hover:bg-white/20 rounded-xl transition-all duration-200">
            <div className="relative">
              <Avatar className="w-10 h-10 ring-2 ring-white shadow-lg">
                <AvatarImage
                  src={
                    "data:image/png;base64," + profile.photo ||
                    "/placeholder.svg?height=40&width=40"
                  }
                />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                  {/* {profile?.name
                    .split(" ")
                    .map((n: any) => n[0])
                    .join("")
                    .slice(0, 2)} */}
                  {(profile?.name || "")
                    .split(" ")
                    .filter((part: any) => part.length > 0) // Remove empty parts from extra spaces
                    .slice(0, 2) // Consider only first two name parts
                    .map(
                      (part: any, index: any, array: any) =>
                        array.length === 1
                          ? part.substring(0, 2) // For single name: take first 2 letters
                          : part[0] // For multiple names: take initial
                    )
                    .join("")
                    .substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              {/* Online status indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-900">
                {profile?.name}
              </span>
              <span className="text-xs text-gray-500">
                {profile?.department}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-80 bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl p-0 overflow-hidden">
          {/* User Info Header */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-16 h-16 ring-4 ring-white shadow-xl">
                  <AvatarImage
                    src={
                      "data:image/png;base64," + profile.photo ||
                      "/placeholder.svg?height=40&width=40"
                    }
                  />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl">
                    {(profile?.name || "")
                      .split(" ")
                      .filter((part: any) => part.length > 0) // Remove empty parts from extra spaces
                      .slice(0, 2) // Consider only first two name parts
                      .map(
                        (part: any, index: any, array: any) =>
                          array.length === 1
                            ? part.substring(0, 2) // For single name: take first 2 letters
                            : part[0] // For multiple names: take initial
                      )
                      .join("")
                      .substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">
                  {profile?.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{profile?.email}</p>
                <Badge
                  className={`${getRoleColor(
                    user?.role
                  )} text-white px-3 py-1 text-xs font-semibold shadow-lg`}>
                  {profile?.role}
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Role and Permissions */}
            <div className="space-y-3">
              <DropdownMenuLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider px-0">
                Role & Permissions
              </DropdownMenuLabel>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user?.role}</p>
                    <p className="text-xs text-gray-600">
                      {user?.department} Department
                    </p>
                  </div>
                </div>
                {/* <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-700">
                    Permissions:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {user?.permissions.map((permission: any, index: any) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs bg-white/80 border-gray-200 text-gray-700"
                      >
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>

            {/* Session Info */}

            <Separator className="my-4" />

            {/* Menu Items */}
            <div className="space-y-1">
              <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">My Profile</p>
                  <p className="text-xs text-gray-500">
                    View and edit your profile
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 cursor-pointer">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Settings className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Settings</p>
                  <p className="text-xs text-gray-500">
                    Manage your preferences
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 cursor-pointer">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Key className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Change Password</p>
                  <p className="text-xs text-gray-500">Update your security</p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 cursor-pointer">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Messages</p>
                  <p className="text-xs text-gray-500">View your messages</p>
                </div>
              </DropdownMenuItem>
            </div>

            <Separator className="my-4" />

            {/* Sign Out */}
            <DropdownMenuItem
              onClick={Logout}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 cursor-pointer text-red-600 hover:text-red-700">
              <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                <LogOut className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium">Sign Out</p>
                <p className="text-xs text-red-500">End your current session</p>
              </div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
