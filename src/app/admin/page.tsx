import React from 'react';
import { Users, Truck, UserCircle, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export default function SuperAdminDashboard() {
  
  const stats = [
    { icon: Users, label: "Total User", value: "78", subtitle: "Data Overview", color: "text-blue-600" },
    { icon: Truck, label: "Total Fleet", value: "63", subtitle: "Data Overview", color: "text-orange-600" },
    { icon: UserCircle, label: "Total Driver", value: "55", subtitle: "Data Overview", color: "text-purple-600" },
  ];

  const alerts = [
    { 
      title: "System Update", 
      message: "Scheduled maintenance tonight at 11 PM",
      type: "info",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    { 
      title: "Performance Excellent", 
      message: "All systems operating optimally",
      type: "success",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
  ];

  const activityLogs = [
    { name: "Amanda Wan", role: "Supervisor", action: "Logged in to system", time: "22:02" },
    { name: "Lisa Lim", role: "Supervisor", action: "Downloaded October 2024 Monthly Summary Report", time: "21:45" },
    { name: "Robert Kim", role: "Auditor", action: "Logged in to system", time: "21:30" },
    { name: "Sarah Micel", role: "Manager", action: "Updated driver DRV-001 schedule", time: "20:15" },
    { name: "Sarah Micel", role: "Manager", action: "Logged in to system", time: "20:15" },
    { name: "Lisa Lim", role: "Supervisor", action: "Logged in to system", time: "21:45" },
  ];

  const userDistribution = [
    { role: "SuperAdmin", count: 3, color: "#10b981", percentage: 3.8 },
    { role: "Auditor", count: 43, color: "#3b82f6", percentage: 55.1 },
    { role: "Manager", count: 28, color: "#6366f1", percentage: 35.9 },
    { role: "Supervisor", count: 10, color: "#f59e0b", percentage: 5.2 },
  ];

  
  const activityData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: Math.floor(Math.random() * 40) + 20
  }));

  const maxActivity = Math.max(...activityData.map(d => d.value));

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 p-6">
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SuperAdmin Dashboard</h1>
          </div>

        
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.subtitle}</div>
              </div>
            ))}
          </div>

       
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {userDistribution.map((item, index) => {
                      const prevSum = userDistribution.slice(0, index).reduce((s, i) => s + i.percentage, 0);
                      const startAngle = (prevSum / 100) * 360;
                      const endAngle = ((prevSum + item.percentage) / 100) * 360;
                      
                      const startRad = (startAngle * Math.PI) / 180;
                      const endRad = (endAngle * Math.PI) / 180;
                      
                      const x1 = 50 + 50 * Math.cos(startRad);
                      const y1 = 50 + 50 * Math.sin(startRad);
                      const x2 = 50 + 50 * Math.cos(endRad);
                      const y2 = 50 + 50 * Math.sin(endRad);
                      
                      const largeArc = item.percentage > 50 ? 1 : 0;
                      
                      const pathData = [
                        `M 50 50`,
                        `L ${x1} ${y1}`,
                        `A 50 50 0 ${largeArc} 1 ${x2} ${y2}`,
                        `Z`
                      ].join(' ');
                      
                      return (
                        <path
                          key={index}
                          d={pathData}
                          fill={item.color}
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                {userDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-600">{item.role}</span>
                    </div>
                    <span className="font-medium">({item.count})</span>
                  </div>
                ))}
              </div>
            </div>

           
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">System Alerts</h3>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${alert.bgColor} ${alert.borderColor}`}
                  >
                    <div className="flex items-start gap-2">
                      {alert.type === 'info' ? (
                        <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{alert.title}</h4>
                        <p className="text-xs text-gray-600">{alert.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

      
            <div className="rounded-lg border bg-white p-6 shadow-sm lg:row-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold">Log Activity</h3>
              </div>
              <div className="mb-3">
                <div className="text-sm font-medium text-blue-600">Friday, 11 November 2025</div>
              </div>
              <div className="space-y-3 overflow-y-auto" style={{ maxHeight: '600px' }}>
                {activityLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm">{log.name}</span>
                        <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                          {log.role}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{log.action}</p>
                      <span className="text-xs text-gray-400">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          
            <div className="rounded-lg border bg-white p-6 shadow-sm lg:col-span-2">
              <h3 className="text-lg font-semibold mb-2">Activity Trends</h3>
              <p className="text-sm text-gray-500 mb-6">Active users throughout the day</p>
              
              <div className="relative">
                <div className="h-64 flex items-end gap-1 px-2">
                  {activityData.map((item, index) => {
                    const hourStr = `${String(item.hour).padStart(2, '0')}:00`;
                    return (
                      <div
                        key={index}
                        className="group relative flex-1 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                        style={{ 
                          height: `${(item.value / maxActivity) * 100}%`,
                          minHeight: '20px'
                        }}
                      >
                       
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                          <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            {hourStr}: {item.value} users
                          </div>
                          <div className="w-2 h-2 bg-gray-900 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}