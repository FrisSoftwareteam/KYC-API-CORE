type HomeLayoutProps = {
  children: React.ReactNode;
};
export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div>
      <div className="w-full">{children}</div>
      {/* </SidebarInset>
      </SidebarProvider> */}
    </div>
  );
}
