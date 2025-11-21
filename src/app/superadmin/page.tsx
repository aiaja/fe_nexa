import React from 'react';
import { Building2, TrendingUp, Activity, AlertTriangle } from 'lucide-react';

const SuperAdminDashboard = () => {
  // SEMUA DATA INI BISA DIAMBIL DARI BACKEND SEKARANG
  const metrics = {
    totalTenants: 24,
    activeTenants: 18,
    trialTenants: 4,
    suspendedTenants: 1,
    expiredTenants: 1,
    inactiveTenants: 0
  };

  const tenantsByPlan = [
    { plan: 'FREE', count: 5, color: '#10b981', percentage: 21 },
    { plan: 'STARTER', count: 8, color: '#3b82f6', percentage: 33 },
    { plan: 'BUSINESS', count: 9, color: '#8b5cf6', percentage: 38 },
    { plan: 'ENTERPRISE', count: 2, color: '#f59e0b', percentage: 8 }
  ];

  const tenantsByStatus = [
    { status: 'ACTIVE', count: 18, color: '#10b981' },
    { status: 'TRIAL', count: 4, color: '#3b82f6' },
    { status: 'SUSPENDED', count: 1, color: '#ef4444' },
    { status: 'EXPIRED', count: 1, color: '#6b7280' },
    { status: 'INACTIVE', count: 0, color: '#9ca3af' }
  ];

  // Data dari Tenant model - semua field available
  const tenantList = [
    { 
      id: 'tenant-010', 
      company_name: 'PT Problem Tenant', 
      plan: 'BUSINESS', 
      tenantStatus: 'SUSPENDED', 
      email: 'admin@problem.co.id', 
      address: 'Jakarta',
      createdAt: '2024-08-15T10:00:00Z',
      updatedAt: '2025-11-20T15:30:00Z'
    },
    { 
      id: 'tenant-001', 
      company_name: 'PT Adaro Mining', 
      plan: 'ENTERPRISE', 
      tenantStatus: 'ACTIVE', 
      email: 'admin@adaromining.co.id', 
      address: 'Jakarta',
      createdAt: '2024-03-15T08:00:00Z',
      updatedAt: '2025-11-15T12:00:00Z'
    },
    { 
      id: 'tenant-004', 
      company_name: 'PT Vale Indonesia', 
      plan: 'ENTERPRISE', 
      tenantStatus: 'ACTIVE', 
      email: 'admin@vale.co.id', 
      address: 'Sorowako',
      createdAt: '2024-02-01T09:00:00Z',
      updatedAt: '2025-11-10T11:00:00Z'
    },
    { 
      id: 'tenant-002', 
      company_name: 'PT Bukit Asam', 
      plan: 'BUSINESS', 
      tenantStatus: 'ACTIVE', 
      email: 'admin@bukitasam.co.id', 
      address: 'Tanjung Enim',
      createdAt: '2024-05-20T14:00:00Z',
      updatedAt: '2025-11-18T10:00:00Z'
    },
    { 
      id: 'tenant-005', 
      company_name: 'PT Freeport', 
      plan: 'BUSINESS', 
      tenantStatus: 'ACTIVE', 
      email: 'admin@freeport.co.id', 
      address: 'Timika',
      createdAt: '2024-06-12T11:00:00Z',
      updatedAt: '2025-11-12T16:00:00Z'
    },
    { 
      id: 'tenant-020', 
      company_name: 'PT Mining Jaya', 
      plan: 'FREE', 
      tenantStatus: 'TRIAL', 
      email: 'admin@miningjaya.co.id', 
      address: 'Jakarta',
      createdAt: '2025-11-20T10:00:00Z',
      updatedAt: '2025-11-20T10:00:00Z'
    },
    { 
      id: 'tenant-022', 
      company_name: 'PT Bauxite Indo', 
      plan: 'FREE', 
      tenantStatus: 'TRIAL', 
      email: 'admin@bauxite.co.id', 
      address: 'Pontianak',
      createdAt: '2025-11-15T13:00:00Z',
      updatedAt: '2025-11-15T13:00:00Z'
    },
    { 
      id: 'tenant-021', 
      company_name: 'PT Coal Express', 
      plan: 'STARTER', 
      tenantStatus: 'ACTIVE', 
      email: 'admin@coalexpress.co.id', 
      address: 'Samarinda',
      createdAt: '2025-11-18T09:00:00Z',
      updatedAt: '2025-11-19T14:00:00Z'
    },
    { 
      id: 'tenant-011', 
      company_name: 'PT Expired Company', 
      plan: 'STARTER', 
      tenantStatus: 'EXPIRED', 
      email: 'admin@expired.co.id', 
      address: 'Bandung',
      createdAt: '2024-01-10T08:00:00Z',
      updatedAt: '2025-11-15T10:00:00Z'
    },
    { 
      id: 'tenant-003', 
      company_name: 'PT Indo Coal', 
      plan: 'BUSINESS', 
      tenantStatus: 'ACTIVE', 
      email: 'admin@indocoal.co.id', 
      address: 'Samarinda',
      createdAt: '2024-07-10T12:00:00Z',
      updatedAt: '2025-11-14T09:00:00Z'
    }
  ];

  // Helper: Calculate days since registration
  const getDaysSince = (dateString: string): number => {
    const created = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Helper: Calculate trial days remaining (14 day trial)
  const getTrialDaysRemaining = (createdAt: string): number => {
    const created = new Date(createdAt);
    const trialEnd = new Date(created.getTime() + (14 * 24 * 60 * 60 * 1000));
    const now = new Date();
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">SuperAdmin Dashboard</h1>
        <p className="text-gray-600 mt-1">Platform-wide tenant management and monitoring</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Tenants */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Tenants</p>
              <p className="text-3xl font-bold text-gray-900">{metrics.totalTenants}</p>
              <div className="mt-2 flex items-center gap-4 text-xs">
                <span className="text-green-600 font-medium">{metrics.activeTenants} Active</span>
                <span className="text-blue-600 font-medium">{metrics.trialTenants} Trial</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Subscriptions</p>
              <p className="text-3xl font-bold text-green-600">{metrics.activeTenants}</p>
              <p className="text-xs text-gray-500 mt-2">{((metrics.activeTenants / metrics.totalTenants) * 100).toFixed(0)}% of total</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Trial Accounts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Trial Accounts</p>
              <p className="text-3xl font-bold text-blue-600">{metrics.trialTenants}</p>
              <p className="text-xs text-gray-500 mt-2">14-day trial period</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Attention Required */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Needs Attention</p>
              <p className="text-3xl font-bold text-red-600">{metrics.suspendedTenants + metrics.expiredTenants}</p>
              <div className="mt-2 flex items-center gap-4 text-xs">
                <span className="text-red-600 font-medium">{metrics.suspendedTenants} Suspended</span>
                <span className="text-gray-600 font-medium">{metrics.expiredTenants} Expired</span>
              </div>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Subscription Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Subscription Plan Distribution</h2>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {tenantsByPlan.map((item, idx) => {
                  const prevPercentage = tenantsByPlan.slice(0, idx).reduce((sum, i) => sum + i.percentage, 0);
                  const circumference = 2 * Math.PI * 40;
                  const rotate = (prevPercentage / 100) * 360;
                  
                  return (
                    <circle
                      key={idx}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={item.color}
                      strokeWidth="20"
                      strokeDasharray={`${(item.percentage / 100) * circumference} ${circumference}`}
                      strokeDashoffset="0"
                      style={{
                        transform: `rotate(${rotate}deg)`,
                        transformOrigin: '50% 50%'
                      }}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{metrics.totalTenants}</p>
                  <p className="text-xs text-gray-600">Tenants</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {tenantsByPlan.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium text-gray-700">{item.plan}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.count} ({item.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tenant Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Tenant Status Overview</h2>
          </div>

          <div className="space-y-4">
            {tenantsByStatus.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.status}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${(item.count / metrics.totalTenants) * 100}%`,
                      backgroundColor: item.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1 text-xs">Active</p>
                <p className="text-lg font-bold text-green-600">{metrics.activeTenants}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1 text-xs">Suspended</p>
                <p className="text-lg font-bold text-red-600">{metrics.suspendedTenants}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1 text-xs">Expired</p>
                <p className="text-lg font-bold text-gray-600">{metrics.expiredTenants}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;