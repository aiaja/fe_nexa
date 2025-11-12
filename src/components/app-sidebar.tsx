"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { getNavigationByRole, getRoleFromPathname } from "@/data/navigation";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const currentRole = getRoleFromPathname(pathname);
  const navigationItems = getNavigationByRole(currentRole);

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
    // Example: redirect to login or clear session
    // window.location.href = '/login';
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <a href="/" aria-label="Home">
          <img 
            src="/nexa-logo.svg" 
            alt="Nexa Logo" 
            className="h-8 w-auto"
          />
        </a>
      </SidebarHeader>
      
      <SidebarContent>
        <NavMain items={navigationItems} />
      </SidebarContent>
      
      <SidebarFooter>
        <Button 
          variant="destructive" 
          onClick={handleLogout}
          className="w-full"
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}