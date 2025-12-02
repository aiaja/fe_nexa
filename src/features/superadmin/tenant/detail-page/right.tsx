import { Building2, Mail, MapPin, Calendar } from 'lucide-react'
import { TenantWithCounts } from '@/interface/superadmin/tenant'

interface TenantRightColumnProps {
  tenant: TenantWithCounts
}

export function TenantRightColumn({ tenant }: TenantRightColumnProps) {
  const getStatusColor = (status: string) => {
    if (status === "ACTIVE") return "bg-green-100 text-green-700"
    if (status === "SUSPENDED") return "bg-red-100 text-red-700"
    if (status === "EXPIRED") return "bg-orange-100 text-orange-700"
    if (status === "INACTIVE") return "bg-gray-100 text-gray-700"
    return "bg-gray-100 text-gray-700"
  }

  const getPlanColor = (plan: string) => {
    if (plan === "BASIC") return "bg-blue-100 text-blue-700"
    if (plan === "PREMIUM") return "bg-purple-100 text-purple-700"
    return "bg-gray-100 text-gray-700"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{tenant.company_name}</h1>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{tenant.id}</span>
          <span>•</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tenant.tenantStatus)}`}>
            {tenant.tenantStatus}
          </span>
          <span>•</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(tenant.plan)}`}>
            {tenant.plan}
          </span>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-gray-600" />
          Company Information
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Mail className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="text-base font-medium text-gray-900">{tenant.email}</p>
            </div>
          </div>
          
          {tenant.address && (
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <MapPin className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Company Address</p>
                <p className="text-base font-medium text-gray-900">{tenant.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Account Details */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-600" />
          Account Details
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Created At</p>
            <p className="text-base font-medium text-gray-900">
              {formatDate(tenant.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Last Updated</p>
            <p className="text-base font-medium text-gray-900">
              {formatDate(tenant.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}