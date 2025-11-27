import { ArrowLeft, Edit, Trash2, CreditCard, ShieldAlert, CheckCircle } from 'lucide-react'
import { TenantWithCounts } from '@/interface/superadmin/tenant'

interface TenantDetailHeaderProps {
  tenant: TenantWithCounts
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
  onChangePlan: () => void
  onToggleStatus: () => void
}

export function TenantDetailHeader({
  tenant,
  onBack,
  onEdit,
  onDelete,
  onChangePlan,
  onToggleStatus
}: TenantDetailHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Tenant Management</span>
        </button>

        <div className="flex items-center gap-2">
          {(tenant.tenantStatus === 'ACTIVE' || tenant.tenantStatus === 'SUSPENDED') && (
            <button
              onClick={onToggleStatus}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                tenant.tenantStatus === 'ACTIVE'
                  ? 'text-orange-600 bg-orange-50 border border-orange-200 hover:bg-orange-100'
                  : 'text-green-600 bg-green-50 border border-green-200 hover:bg-green-100'
              }`}
            >
              {tenant.tenantStatus === 'ACTIVE' ? (
                <>
                  <ShieldAlert className="h-4 w-4" />
                  Suspend
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Activate
                </>
              )}
            </button>
          )}
          <button
            onClick={onChangePlan}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#0047AB] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <CreditCard className="h-4 w-4" />
            Change Plan
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}