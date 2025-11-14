"use client"

import UserManagement from "@/features/admin/users/user-data"
import { userData } from "@/data/admin/user"

export default function Page() {
  return <UserManagement userItems={userData} />
}