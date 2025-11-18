"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, Truck, Shield, Pickaxe, UserCog } from "lucide-react";
import { getNavigationByRole, getRoleFromPathname } from "@/data/navigation";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentRole = getRoleFromPathname(pathname);
  const navigationItems = getNavigationByRole(currentRole);
  
  // Check if current path is admin (super admin)
  const isSuperAdmin = pathname.startsWith('/admin');

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
    // Example: redirect to login or clear session
    // window.location.href = '/login';
  };

  const roleOptions = [
    { 
      label: "Fleet Manager", 
      value: "fleet-manager", 
      path: "/manager",
      icon: Truck 
    },
    { 
      label: "Internal Auditor", 
      value: "internal-auditor", 
      path: "/auditor",
      icon: Shield 
    },
    { 
      label: "Mining Company Management", 
      value: "mining-company", 
      path: "/executive",
      icon: Pickaxe 
    },
    { 
      label: "Super Admin", 
      value: "super-admin", 
      path: "/admin",
      icon: UserCog 
    },
  ];

  const handleRoleSwitch = (path: string) => {
    router.push(path);
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="px-2 py-1">
        {isSuperAdmin ? (
          // with dropdown
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-lg w-full outline-none focus:outline-none focus:ring-0">
                <img 
                  src="/nexa.svg" 
                  alt="Nexa Logo" 
                  className="h-6 w-auto shrink-0"
                />
                
                <span className="text-base font-semibold text-gray-800 flex-1 text-left">
                  Diesel Track
                </span>
                
                <ChevronsUpDown className="h-4 w-4 text-gray-500" />
              </button>
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
          // without dropdown
          <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-lg w-full outline-none focus:outline-none focus:ring-0">
            <img 
              src="/nexa.svg" 
              alt="Nexa Logo" 
              className="h-6 w-auto shrink-0"
            />
            
            <span className="text-base font-semibold text-gray-900">
              Diesel Track
            </span>
          </div>
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