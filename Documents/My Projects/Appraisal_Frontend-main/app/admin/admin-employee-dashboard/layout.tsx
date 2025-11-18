type HomeLayoutProps = {
  children: React.ReactNode;
};
export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div>
      <div className="w-full min-h-full">{children}</div>
      {/* </SidebarInset>
      </SidebarProvider> */}
    </div>
  );
}
