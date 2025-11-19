"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavMain } from "@/data/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  getNavigationByRole,
  getRoleFromPathname,
  NAVIGATION_MAP,
  ROLE_CONFIG,
} from "@/data/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentRole = getRoleFromPathname(pathname);
  const navigationItems = getNavigationByRole(currentRole);

  const isSuperAdmin = pathname.startsWith("/admin");
  
  const roleOptions = Object.entries(ROLE_CONFIG).map(([role, config]) => ({
    value: role,
    ...config,
  }));

  const handleRoleSwitch = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
    // Example: redirect to login or clear session
    // window.location.href = '/login';
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="items-center">
        {isSuperAdmin ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full justify-between p-6" variant="outline">
                <div className="flex flex-wrap gap-2">
                  <img
                    src="/nexa.svg"
                    alt="Nexa Logo"
                    className="h-6 w-auto shrink-0"
                  />

                  <span className="text-base font-semibold text-gray-800 flex-1 text-left">
                    Diesel Track
                  </span>
                </div>

                <ChevronsUpDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Akses Layanan</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {roleOptions.map((role) => {
                const Icon = role.icon;
                return (
                  <DropdownMenuItem
                    key={role.value}
                    onClick={() => handleRoleSwitch(role.path)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-md">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span>{role.label}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button className="w-full justify-center p-6" variant="outline">
            <div className="flex flex-wrap gap-2">
              <img
                src="/nexa.svg"
                alt="Nexa Logo"
                className="h-6 w-auto shrink-0"
              />

              <span className="text-base font-semibold text-gray-800 flex-1 text-left">
                Diesel Track
              </span>
            </div>
          </Button>
        )}
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navigationItems} />
      </SidebarContent>

      <SidebarFooter>
        <Button variant="destructive" onClick={handleLogout} className="w-full">
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
