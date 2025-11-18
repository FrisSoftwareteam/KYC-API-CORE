"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import { ClearForm } from "@/components/clear-form";

import { SidebarLeftManager } from "@/components/ui-form/sidebar-leftManager";

import { SidebarRight } from "@/components/ui-form/sidebar-right";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs } from "@/components/ui/tabs";
import ProfileSettings from "@/components/usercomponent/userprofile";
import { useGetUserProfile } from "@/zustand/store";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/firebase/config";
import axios from "axios";
import { UserButton } from "@clerk/nextjs";
import { UserAvatarMenu } from "@/components/Avatar/AvatarHeader";
import UserDashboard from "@/components/user-dashboard/user-dashboard";
import { SidebarLeftManager2 } from "@/components/ui-form/sidebar-leftManager2";

export default function Page() {
  const { profile, getUserData, isloading, page, role } = useGetUserProfile();
  const router = useRouter();

  return (
    // <RoleGuard allowedRoles={["manager"]}>

    <SidebarProvider>
      <SidebarLeftManager2 />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 p-2 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    HR Project Management & Task
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <UserAvatarMenu />
        </header>
        {/* Body  */}
        <UserDashboard />
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
    // </RoleGuard>
  );
}
