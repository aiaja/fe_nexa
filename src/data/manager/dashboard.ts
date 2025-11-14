import type { DashboardOverview, DashboardAnomaly } from "@/interface/manager/dashboard";

export const dashboardItem : DashboardOverview[] = [
    {
        title:"Total Fleets",
        value:"152",
    },
    {
        title:"Fuel Consump. Avg.",
        value:"78%",
    },
    {
        title:"Active Truck",
        value:"29",
    },
    {
        title:"Alert Counts",
        value:"25",
    },
]

export const anomalyItem : DashboardAnomaly[] = [
    {
        title: "Sudden Drop Detection",
        value: "2",
        description: "rapid, unauthorized fuel loss"
    },
    {
        title: "Out of Zone Alert",
        value: "15",
        description: "fuel consumption outside defined area"
    },
    {
        title: "Overconsumption Warning",
        value: "2",
        description: "excessive fuel usage rate"
    },
]