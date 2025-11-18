"use client";

import { UserAvatarMenu } from "@/components/Avatar/AvatarHeader";
import { ClearForm } from "@/components/clear-form";

import { SidebarLeftUser } from "@/components/ui-form/sidebar-leftUser";
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
import UserDashboard from "@/components/user-dashboard/user-dashboard";
import ProfileSettings from "@/components/usercomponent/userprofile";
import { auth } from "@/firebase/config";
import { useGetUserProfile } from "@/zustand/store";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

// import { UserButton } from "@clerk/nextjs";

export default function Page() {
  const { profile, getUserData, isloading, page, role } = useGetUserProfile();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log(user);

      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        //https://firstregistrarsnigeria.com/login/v1/currentuser
        await axios
          .get(
            //"https://frislogin.azurewebsites.net/v1/currentuser",

            //https://hrms-app-login.azurewebsites.net/v1/loginuser

            "https://hrms-app-login.azurewebsites.net/v1/currentuser",

            {
              headers: { authtoken: idTokenResult.token },
            }
          )
          .then((res) => {
            console.log(res.data);

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
  }, [page, profile]);

  return (
    <SidebarProvider>
      <SidebarLeftUser />
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
          {/* <UserButton /> */}
          <UserAvatarMenu />
        </header>
        {/* Body  */}
        <UserDashboard />
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
