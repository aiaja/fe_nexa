import { IncidentReport } from "@/interface/auditor/incident-reports/incidents";

export const incidentReports: IncidentReport[] = [
  {
    id: "A-2024-0847",
    title: "Suspected Fuel Theft - Truck #F-001",
    vehicleName: "Truck #F-001",
    priority: "CRITICAL",
    category: "SUDDEN DROP",
    detectionDate: "06 Nov 2024, 14:32 WIB",
    driver: {
      id: "D-001",
      name: "Ahmad Suryanto",
    },
    fleet: {
      id: "F-001",
      model: "Hero Ranger 2019",
    },
    severity: {
      level: "CRITICAL",
      confidence: 92,
    },
    keyIndicators: [
      "Fuel drop: 45L in 8 minutes (expected: 0L)",
      "Location: Outside designated route",
      "GPS signal lost for 12 minutes",
      "3rd incident this month for this driver",
    ],
  },
  {
    id: "A-2024-0852",
    title: "Out of Zone Activity - Truck #F-002",
    vehicleName: "Truck #F-002",
    priority: "HIGH",
    category: "OUT OF ZONE",
    detectionDate: "07 Nov 2024, 08:15 WIB",
    driver: {
      id: "D-002",
      name: "Dika Kusuma",
    },
    fleet: {
      id: "F-003",
      model: "Isuzu Giga 2021",
    },
    severity: {
      level: "HIGH",
      confidence: 81,
    },
    keyIndicators: [
      "Fuel level decreased by 35L",
      "Vehicle outside authorized zone for 28 minutes",
      "Occurred during night shift",
    ],
  },
  {
    id: "A-2024-0853",
    title: "Overconsumption Pattern - Truck #F-007",
    vehicleName: "Truck #F-007",
    priority: "HIGH",
    category: "OVERCONSUMPTION",
    detectionDate: "07 Nov 2024, 10:30 WIB",
    driver: {
      id: "D-003",
      name: "Ahmad Suryanto",
    },
    fleet: {
      id: "F-001",
      model: "Hero Ranger 2019",
    },
    severity: {
      level: "HIGH",
      confidence: 87,
    },
    keyIndicators: [
      "Fuel consumption 40% above normal",
      "Pattern detected over 3 consecutive trips",
      "No maintenance records in last 2 months",
    ],
  },
  {
    id: "A-2024-0854",
    title: "Fleet Sensor Malfunction - Truck #F-004",
    vehicleName: "Truck #F-004",
    priority: "MEDIUM",
    category: "SUDDEN DROP",
    detectionDate: "07 Nov 2024, 13:20 WIB",
    driver: {
      id: "D-004",
      name: "Kurniawan Adi",
    },
    fleet: {
      id: "F-001",
      model: "Hero Ranger 2019",
    },
    severity: {
      level: "CRITICAL",
      confidence: 68,
    },
    keyIndicators: [
      "Fuel sensor reading inconsistent",
      "Multiple sensor errors detected",
      "Temperature fluctuation normal range",
      "3rd incident this month for this driver",
    ],
  },
  {
    id: "A-2024-0855",
    title: "Out of Zone - Truck #F-004",
    vehicleName: "Truck #F-004",
    priority: "CRITICAL",
    category: "OUT OF ZONE",
    detectionDate: "07 Nov 2024, 14:50 WIB",
    driver: {
      id: "D-001",
      name: "Ahmad Suryanto",
    },
    fleet: {
      id: "F-001",
      model: "Hero Ranger 2019",
    },
    severity: {
      level: "CRITICAL",
      confidence: 90,
    },
    keyIndicators: [
      "Vehicle detected 50km from authorized route",
      "GPS tracking active",
      "Fuel level normal",
      "No communication from driver",
    ],
  },
  {
    id: "A-2024-0856",
    title: "Driver Behavior Alert - Truck #F-005",
    vehicleName: "Truck #F-005",
    priority: "HIGH",
    category: "OVERCONSUMPTION",
    detectionDate: "07 Nov 2024, 15:30 WIB",
    driver: {
      id: "D-001",
      name: "Ahmad Suryanto",
    },
    fleet: {
      id: "F-001",
      model: "Hero Ranger 2019",
    },
    severity: {
      level: "MEDIUM",
      confidence: 79,
    },
    keyIndicators: [
      "Aggressive acceleration detected",
      "Hard braking events: 15 in 2 hours",
      "Fuel efficiency decreased by 25%",
    ],
  },
  {
    id: "A-2024-0857",
    title: "Overconsumption Warning - Truck #F-006",
    vehicleName: "Truck #F-006",
    priority: "HIGH",
    category: "OVERCONSUMPTION",
    detectionDate: "07 Nov 2024, 16:10 WIB",
    driver: {
      id: "D-001",
      name: "Ahmad Suryanto",
    },
    fleet: {
      id: "F-001",
      model: "Hero Ranger 2019",
    },
    severity: {
      level: "HIGH",
      confidence: 84,
    },
    keyIndicators: [
      "Daily fuel usage 35% above baseline",
      "Route efficiency normal",
      "Vehicle load within normal range",
    ],
  },
  {
    id: "A-2024-0858",
    title: "Sudden Drop Alert - Truck #F-010",
    vehicleName: "Truck #F-010",
    priority: "CRITICAL",
    category: "SUDDEN DROP",
    detectionDate: "08 Nov 2024, 07:25 WIB",
    driver: {
      id: "D-001",
      name: "Ahmad Suryanto",
    },
    fleet: {
      id: "F-001",
      model: "Hero Ranger 2019",
    },
    severity: {
      level: "CRITICAL",
      confidence: 93,
    },
    keyIndicators: [
      "Fuel level dropped 58L in 5 minutes",
      "No refueling station nearby",
      "Vehicle stationary during drop",
      "Driver not responding to calls",
    ],
  },
  {
    id: "A-2024-0859",
    title: "Overconsumption Warning - Truck #F-008",
    vehicleName: "Truck #F-008",
    priority: "HIGH",
    category: "OVERCONSUMPTION",
    detectionDate: "07 Nov 2024, 15:30 WIB",
    driver: {
      id: "D-001",
      name: "Ahmad Suryanto",
    },
    fleet: {
      id: "F-001",
      model: "Hero Ranger 2019",
    },
    severity: {
      level: "HIGH",
      confidence: 84,
    },
    keyIndicators: [
      "Fuel consumption exceeds normal by 28%",
      "Consistent pattern over 5 days",
      "No engine issues reported",
    ],
  },
  {
    id: "A-2024-0860",
    title: "Out of Zone - Truck #F-009",
    vehicleName: "Truck #F-009",
    priority: "HIGH",
    category: "OUT OF ZONE",
    detectionDate: "07 Nov 2024, 08:15 WIB",
    driver: {
      id: "D-001",
      name: "Ahmad Suryanto",
    },
    fleet: {
      id: "F-001",
      model: "Hero Ranger 2019",
    },
    severity: {
      level: "HIGH",
      confidence: 84,
    },
    keyIndicators: [
      "Vehicle 30km outside designated area",
      "Duration: 45 minutes",
      "Fuel level stable",
    ],
  },
  {
    id: "A-2024-0861",
    title: "Sudden Drop Alert - Truck #F-010",
    vehicleName: "Truck #F-010",
    priority: "CRITICAL",
    category: "SUDDEN DROP",
    detectionDate: "08 Nov 2024, 07:25 WIB",
    driver: {
      id: "D-001",
      name: "Ahmad Suryanto",
    },
    fleet: {
      id: "F-001",
      model: "Hero Ranger 2019",
    },
    severity: {
      level: "CRITICAL",
      confidence: 93,
    },
    keyIndicators: [
      "Rapid fuel decrease: 52L in 7 minutes",
      "Vehicle moving during event",
      "GPS signal intermittent",
    ],
  },
  {
    id: "A-2024-0862",
    title: "Overconsumption Pattern - Truck #F-011",
    vehicleName: "Truck #F-011",
    priority: "HIGH",
    category: "OVERCONSUMPTION",
    detectionDate: "07 Nov 2024, 15:30 WIB",
    driver: {
      id: "D-001",
      name: "Ahmad Suryanto",
    },
    fleet: {
      id: "F-001",
      model: "Hero Ranger 2019",
    },
    severity: {
      level: "HIGH",
      confidence: 84,
    },
    keyIndicators: [
      "Weekly fuel usage up 32%",
      "Driver behavior normal",
      "Possible fuel leak suspected",
    ],
  },
];
