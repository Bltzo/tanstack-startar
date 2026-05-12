import { BarChart3, LayoutGrid, Settings, Users, Wrench } from "lucide-react";

import { Logo } from "~/components/common/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import * as m from "~/i18n/messages";
import { getLocale } from "~/i18n/runtime";
const SIDEBAR_ITEMS = [
  {
    title: m.sidebarDashboardTitle(),
    href: "/dashboard",
    icon: LayoutGrid,
    isActive: true,
  },
  { title: m.sidebarAnalyticsTitle(), href: "/analytics", icon: BarChart3 },
  { title: m.sidebarUsersTitle(), href: "/users", icon: Users },
  { title: m.sidebarToolsTitle(), href: "/tools", icon: Wrench },
  { title: m.sidebarSettingsTitle(), href: "/settings", icon: Settings },
];

export function DashboardSidebar() {
  const dir = getLocale() === "ar" ? "rtl" : "ltr";
  const side = dir === "rtl" ? "right" : "left";
  return (
    <Sidebar dir={dir} side={side}>
      <SidebarHeader className="px-4 py-3">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{m.sidebarNavigationTitle()}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
