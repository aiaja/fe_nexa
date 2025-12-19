"use client";

import Link from "next/link";
import { Users, TrendingUp, CheckSquare, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoleCard } from "@/interface/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Footer } from "react-day-picker";

const roles: RoleCard[] = [
  {
    id: "manager",
    title: "Manager",
    icon: <Users className="w-12 h-12 text-blue-600" />,
    description:
      "Oversee operations, approve requests, and view high-level reports.",
    href: "/manager",
  },
  {
    id: "executive",
    title: "Executive",
    icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
    description:
      "View strategic insights, performance metrics, and executive summaries.",
    href: "/executive",
  },
  {
    id: "auditor",
    title: "Auditor",
    icon: <CheckSquare className="w-12 h-12 text-blue-600" />,
    description:
      "Access compliance logs, review transaction history, and generate audit trails.",
    href: "/auditor",
  },
  {
    id: "admin",
    title: "Admin",
    icon: <Shield className="w-12 h-12 text-blue-600" />,
    description:
      "Manage users, configure system settings, and handle daily maintenance.",
    href: "/admin",
  },
  {
    id: "superadmin",
    title: "Super Admin",
    icon: <Lock className="w-12 h-12 text-gray-400" />,
    description:
      "Full system control, advanced configurations, and root access management.",
    href: "/superadmin",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-600">
      {/* Header */}
      <div className="flex flex-col items-center justify-center py-16 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Diesel Track</h1>
        <p className="text-xl text-blue-100 max-w-2xl text-center">
          Please select your role to access the dashboard and management tools.
        </p>
      </div>

      {/* Role Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-4 pb-16">
        {roles.map((role) => (
          <Card key={role.id} className="w-[25%]">
            <CardContent
              className={`rounded-2xl ${role.restricted ? "opacity-60" : ""}`}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-50 rounded-xl">{role.icon}</div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
                {role.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 px-8 text-center text-sm ">
                {role.description}
              </p>
            </CardContent>
            {/* Button */}
            <CardFooter>
              {!role.restricted ? (
                <Link href={role.href} className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                    Access Role →
                  </Button>
                </Link>
              ) : (
                <Button
                  disabled
                  className="w-full bg-gray-200 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
                >
                  Restricted Access
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <Footer className="bg-primary text-blue-100 py-4 mt-auto">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-sm">
            © 2025 Nexa Diesel Track Systems. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </Footer>
    </div>
  );
}
