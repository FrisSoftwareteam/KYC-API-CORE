import { UserAvatarMenu } from "@/components/Avatar/AvatarHeader";
import { SidebarLeft } from "@/components/ui-form/sidebar-left";
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
import { UserButton } from "@clerk/nextjs";
//import { useQuery } from "@tanstack/react-query";
import React from "react";

const page = () => {
  // const { data } = useQuery({
  //   queryKey: ["form_fields"],
  //   queryFn: async () => {
  //     try {
  //       return await fetch(
  //         `http://localhost:3000/operations/question/${params.id}`
  //       )
  //         .then((res: any) => res.json())
  //         .then((data: any) => data?.question?.form_fields?.formFields);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // });

  // console.log(data);
  return (
    <>
      {" "}
      <SidebarProvider>
        <SidebarLeft />
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

          <div className="flex flex-1 flex-col gap-4 p-4 mt-4">
            {/* <FormPreview form_fields={data} id={params.id} /> */}
          </div>
        </SidebarInset>
        <SidebarRight />
      </SidebarProvider>
    </>
  );
};

export default page;
