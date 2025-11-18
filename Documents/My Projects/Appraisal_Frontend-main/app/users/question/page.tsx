import { ClearForm } from "@/components/clear-form";

import { FormPreview } from "@/components/form-preview";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@clerk/nextjs/server";

import { UserButton } from "@clerk/nextjs";
import { UserAvatarMenu } from "@/components/Avatar/AvatarHeader";

export default function Page() {
  const { userId } = auth();
  return (
    <SidebarProvider>
      <SidebarLeftUser />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 z-50  p-2  shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    HR Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <UserAvatarMenu />
        </header>
        {/* Body  */}
        <div className="flex w-full flex-col gap-4 p-4 -mb-5">
          <Tabs defaultValue="preview" className="flex-1">
            <div className="mx-auto flex w-full  flex-col gap-4 rounded-md border shadow-sm">
              <div className="flex items-center gap-1.5 border-b p-4">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                <ClearForm />
              </div>
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-1">
                <TabsTrigger
                  value="preview"
                  className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <div>Questioniare</div>
                </TabsTrigger>

                {/* <TabsTrigger
                  value="code"
                  className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Code
                </TabsTrigger> */}
              </TabsList>
              <TabsContent value="preview" className="m-4 p-2 ">
                {" "}
                <FormPreview id={userId} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
