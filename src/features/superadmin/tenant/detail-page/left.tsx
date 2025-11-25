import { CreditCard, Truck, UserCircle } from 'lucide-react'
import { TenantWithCounts } from '@/interface/superadmin/tenant'

interface TenantLeftColumnProps {
  tenant: TenantWithCounts
}

export function TenantLeftColumn({ tenant }: TenantLeftColumnProps) {
  const getPlanPrice = (plan: string) => {
    const prices: Record<string, string> = {
      "FREE": "$0/month",
      "STARTER": "$29/month",
      "BUSINESS": "$99/month",
      "ENTERPRISE": "$299/month"
    }
    return prices[plan] || "-"
  }

  return (
    <div className="lg:col-span-1 space-y-4">
      {/* Plan Card */}
      <div className="bg-linear-to-br from-[#0047AB] to-[#003580] rounded-lg p-6 text-white">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="h-5 w-5" />
          <span className="text-sm font-medium opacity-90">Current Plan</span>
        </div>
        <p className="text-2xl font-bold mb-1">{tenant.plan}</p>
        <p className="text-sm opacity-75">{getPlanPrice(tenant.plan)}</p>
      </div>

      <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
        <div className="flex items-center gap-2 mb-2">
          <Truck className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-900">Total Fleets</span>
        </div>
        <p className="text-2xl font-bold text-purple-700">{tenant._count.fleets}</p>
      </div>

      <div className="bg-amber-50 rounded-lg p-5 border border-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <UserCircle className="h-4 w-4 text-amber-600" />
          <span className="text-sm font-medium text-amber-900">Total Drivers</span>
        </div>
        <p className="text-2xl font-bold text-amber-700">{tenant._count.drivers}</p>
      </div>
    </div>
  )
}