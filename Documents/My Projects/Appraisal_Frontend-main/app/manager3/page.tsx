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
import { SidebarLeftManager3 } from "@/components/ui-form/sidebar-leftManager3";

export default function Page() {
  const { profile, getUserData, isloading, page, role } = useGetUserProfile();
  const router = useRouter();

  useEffect(() => {
    // socket.on("initial_data", (payload) => {
    // console.log("Hello");
    // });

    //Refresh the Page...
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log(user);

      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        //https://firstregistrarsnigeria.com/login/v1/currentuser
        await axios
          .get(
            //"https://frislogin.azurewebsites.net/v1/currentuser",

            "https://hrms-app-login.azurewebsites.net/v1/currentuser",

            {
              headers: { authtoken: idTokenResult.token },
            }
          )
          .then((res) => {
            // console.log(res.data);

            // if (res?.data?.role === "admin") {
            //   router.push("/admin");
            // } else {
            //   router.push("/");
            // }

            getUserData(res.data);

            if (res.data.role === "user") {
              router.push("/users");
            } else if (res.data.role === "admin") {
              router.push("/admin");
            } else if (res.data.role === "manager") {
              router.push("/manager");
            } else if (res.data.role === "manager2") {
              router.push("/manager2");
            } else if (res.data.role === "manager3") {
              router.push("/manager3");
            } else if (res.data.role === "manager4") {
              router.push("/manager4");
            }
          });
      }
    });

    return () => unsubscribe();
  }, [page, role, profile]);

  return (
    // <RoleGuard allowedRoles={["manager"]}>

    <SidebarProvider>
      <SidebarLeftManager3 />
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
