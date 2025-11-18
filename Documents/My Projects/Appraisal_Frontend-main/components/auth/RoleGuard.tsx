// components/RoleGuard.tsx
"use client";
import { auth } from "@/firebase/config";
import { useGetUserProfile } from "@/zustand/store";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function RoleGuard({ children }: { children: ReactNode }) {
  // const { user, isLoaded } = useUser();
  const { profile, getUserData, isloading } = useGetUserProfile();
  const router = useRouter();

  useEffect(() => {
    if (!isloading) return;

    console.log(profile);

    // if (!profile?.id) {
    //   router.push("/");
    //   return;
    // }

    const role = (profile?.role as string) || "";
  }, [isloading, profile, router]);

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

            "http://localhost:4000/v1/currentuser",

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

  if (isloading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  // if (profile.role === "admin") {
  //   router.push("/");
  // }

  // Unauthenticated user routing
  if (!profile) {
    router.push("/");
  }

  return <>{children}</>;
}
