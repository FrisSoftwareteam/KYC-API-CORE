import AdminFlowLog from "@/components/admin-page-ui/admin-flow-log/admin-flow.log";
import ManagerPendingLog from "@/components/admin-page-ui/manager-pending-log/manager-pending-log";
import ManagerPendingLog3 from "@/components/admin-page-ui/manager-pending-log3/manager-pending-log3";

import RoleGuard from "@/components/auth/RoleGuard";
import { UserAvatarMenu } from "@/components/Avatar/AvatarHeader";

import { ClearForm } from "@/components/clear-form";
import SplitScreenModals from "@/components/splitScreen/split-screen";
import { SidebarLeftManager } from "@/components/ui-form/sidebar-leftManager";
import { SidebarLeftManager2 } from "@/components/ui-form/sidebar-leftManager2";
import { SidebarLeftManager3 } from "@/components/ui-form/sidebar-leftManager3";
import { SidebarLeftManager4 } from "@/components/ui-form/sidebar-leftManager4";

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
import HeroCard from "@/components/usercomponent/hero-section/hero-section";

import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarLeftManager4 />
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
        <main className="flex-1 p-2 md:p-6 lg:p-10">
          <SplitScreenModals />
        </main>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
