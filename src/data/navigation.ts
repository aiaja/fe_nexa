import {
  ChartColumn,
  FileChartColumn,
  Bolt,
  Users,
  Search,
  FileChartColumnIncreasing,
  Truck,
  Map,
  Fuel,
  LayoutDashboard,
  Shield,
  Pickaxe,
  UserCog,
  Landmark
} from "lucide-react";
import type { NavItem, UserRole, RoleConfig } from "@/interface/navigation";

const superadminItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/superadmin",
    icon: ChartColumn,
  }, 
  {
    title: "Master Tenants",
    url: "/superadmin/tenants",
    icon: Landmark,
  },
];


const adminItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: ChartColumn,
  },
  {
    title: "Master Data",
    url: "/admin/",
    icon: Bolt,
    items: [
        {
            title: "Fleet Master",
            url: "/admin/fleet",
        },
        {
            title: "Driver Master",
            url: "/admin/driver"
        }
    ]
  },    
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
  },
];

const executiveItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/executive",
    icon: ChartColumn,
  },
  {
    title: "Strategic Reports",
    url: "/executive/reports",
    icon: FileChartColumn,
  },
];

const auditorItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/auditor",
    icon: ChartColumn,
  },
  {
    title: "Incident Reports",
    url: "/auditor/incident",
    icon: Search,
  },
  {
    title: "Analytics",
    url: "/auditor/",
    icon: FileChartColumnIncreasing,
    items: [
        {
            title: "Fleet Analytics",
            url: "/auditor/fleet",
        },
        {
            title: "Driver Analytics",
            url: "/auditor/driver",
        }
    ]
  },
  {
    title: "Reports",
    url: "/auditor/reports",
    icon: FileChartColumn,
  },
];

const managerItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/manager",
    icon: ChartColumn,
  },
  {
    title: "Maps & Routes",
    url: "/manager",
    icon: Map,
    items: [
        {
            title: "Live Maps",
            url: "/manager/maps",
        },
        {
            title: "Delivery Schedule",
            url: "/manager/schedule",
        },
        {
            title: "Delivery History",
            url: "/manager/history",
        },
        {
            title: "Route Editor",
            url: "/manager/route-editor",
        },
    ]
  },
  {
    title: "Master Data",
    url: "/manager/",
    icon: Truck,
    items: [
        {
            title: "Fleet Data",
            url: "/manager/fleet",
        },
        {
            title: "Driver Data",
            url: "/manager/driver",
        }
    ]
  },
  {
    title: "Refueling Analytics",
    url: "/manager/refueling",
    icon: Fuel,
  },
  {
    title: "Reports",
    url: "/manager/reports",
    icon: FileChartColumn,
  },
];

const guestItems: NavItem[] = [
  {
    title: "Login",
    url: "/login",
    icon: LayoutDashboard,
  },
];

export const NAVIGATION_MAP: Record<UserRole, NavItem[]> = {
  "admin": adminItems,
  "superadmin": superadminItems,
  "executive": executiveItems,
  "auditor": auditorItems,
  "manager": managerItems,
  guest: guestItems,
} as const;

export const ROLE_CONFIG: Record<Exclude<UserRole, "guest" | "superadmin">, RoleConfig> = {
  admin: {
    label: "Admin",
    icon: Shield,
    path: "/admin",
  },
  manager: {
    label: "Fleet Manager",
    icon: Truck,
    path: "/manager",
  },
  auditor: {
    label: "Internal Auditor",
    icon: Pickaxe,
    path: "/auditor",
  },
  executive: {
    label: "Mining Company Manager",
    icon: UserCog,
    path: "/executive",
  },
} as const;

export const getNavigationByRole = (role: UserRole): NavItem[] => {
  return NAVIGATION_MAP[role] || guestItems;
};

/**
 * Extract role from pathname
 * @example "/manager/dashboard" -> "manager"
 * @example "/admin/master-data" -> "admin"
 */
export const getRoleFromPathname = (pathname: string): UserRole => {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] as UserRole | undefined;

  if (
    firstSegment &&
    Object.keys(NAVIGATION_MAP).includes(firstSegment)
  ) {
    return firstSegment;
  }

  return "guest";
};