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
} from "lucide-react";
import type { NavItem, UserRole } from "@/interface/navigation";


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
    title: "Fleet & Driver",
    url: "/manager/",
    icon: Truck,
    items: [
        {
            title: "Fleet Management",
            url: "/manager/fleet",
        },
        {
            title: "Driver Management",
            url: "/manager/driver",
        }
    ]
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
            title: "History Routes",
            url: "/manager/history",
        },
        {
            title: "Route Editor",
            url: "/manager/route-editor",
        },
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
  "executive": executiveItems,
  "auditor": auditorItems,
  "manager": managerItems,
  guest: guestItems,
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