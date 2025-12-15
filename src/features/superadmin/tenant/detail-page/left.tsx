import { CreditCard, Truck, UserCircle } from 'lucide-react'
import { TenantWithCounts } from '@/interface/superadmin/tenant'

interface TenantLeftColumnProps {
  tenant: TenantWithCounts
}

export function TenantLeftColumn({ tenant }: TenantLeftColumnProps) {
  const getPlanDisplay = (plan: string) => {
    const displays: Record<string, string> = {
      "BASIC": "Basic",
      "PREMIUM": "Premium",
    }
    return displays[plan] || "plan"
  }

  const getPeriodDisplay = (period: string) => {
    const displays: Record<string, string> = {
      "TRIAL": "Trial",
      "MONTHLY": "Monthly",
      "QUARTERLY": "Quarterly", 
      "YEARLY": "Yearly"
    }
    return displays[period] || period
  }

  const getPlanPrice = (plan: string, period: string) => {
    if (plan === "BASIC") {
      return "Free Trial"
    }

    const prices: Record<string, string> = {
      "MONTHLY": "$99/month",
      "QUARTERLY": "$279/quarter", 
      "YEARLY": "$999/year" 
    }
    return prices[period] || "$99/month"
  }

  return (
    <div className="lg:col-span-1 space-y-4">
      {/* Plan Card */}
      <div className="bg-linear-to-br from-[#2e72d1] to-[#003580] rounded-lg p-6 text-white">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="h-5 w-5" />
          <span className="text-sm font-medium opacity-90">Current Plan</span>
        </div>
        <p className="text-2xl font-bold mb-1">{tenant.plan}</p>
        <p className="text-sm text-white font-medium mt-1"> {getPeriodDisplay(tenant.period)} </p>
        <p className="text-lg font-semibold text-white mt-2"> {getPlanPrice(tenant.plan, tenant.period)} </p>
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