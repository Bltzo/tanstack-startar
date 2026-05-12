import type { ReactNode } from "react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";

import { LocaleSwitcher } from "../theme/LanguageSwitcher";
import { ThemeToggle } from "../theme/ThemeToggle";

import { Search } from "./Search";
import { DashboardSidebar } from "./Sidebar";
import { UserNav } from "./UserNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-background">
          <header className="border-b border-border">
            <div className="flex h-16 items-center gap-4 px-4">
              <SidebarTrigger />
              <div className="ms-auto flex items-center gap-4">
                <Search />
                <ThemeToggle />
                <LocaleSwitcher />
                <UserNav />
              </div>
            </div>
          </header>
          <main className="flex-1 p-8">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
