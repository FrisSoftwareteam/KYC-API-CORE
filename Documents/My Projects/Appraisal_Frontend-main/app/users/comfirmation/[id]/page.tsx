import { UserAvatarMenu } from "@/components/Avatar/AvatarHeader";
import { ClearForm } from "@/components/clear-form";
import { FormPreviewManager } from "@/components/form-preview-manager";
import { FormPreviewUser } from "@/components/form-preview-user";

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

import { UserButton } from "@clerk/nextjs";

export default function Page({ params }: { params: { id: string } }) {
  console.log(params.id);
  return (
    <SidebarProvider>
      <SidebarLeftUser />
      <SidebarInset>
        <header className="sticky top-0 flex h-14  p-2  shrink-0 items-center gap-2 bg-background">
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

              <FormPreviewUser id={params.id} />
            </div>
          </Tabs>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
