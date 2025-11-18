import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/admin-ui/app-sidebar";
import HeaderBar from "@/components/header-bar";

type HomeLayoutProps = {
  children: React.ReactNode;
};
export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <HeaderBar />
          <div className="p-8 w-full max-w-5xl mx-auto justify-center ">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
