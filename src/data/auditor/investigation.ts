import { InvestigationData } from "@/interface/auditor/incident-reports/investigation";

export const investigationData: Record<string, InvestigationData> = {
  "INC-0847": {
    summary: {
      id: "INC-0847",
      caseNumber: "A-2024-0847",
      type: "Fuel Theft",
      fleetId: "F-001",
      driverId: "D-001",
      date: "06 Nov 2024, 14:32 WIB",
      severity: "CRITICAL",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0847",
        time: "13:00",
        location: "Depot A",
        saverity: "MEDIUM",
        details: ["Refueled: 140L", "Tank: 95% (180L)"],
      },
      {
        id: "2",
        incidentId: "INC-0847",
        time: "13:45",
        location: "Checkpoint 1 (Route A)",
        saverity: "MEDIUM",
        details: ["Tank: 88% (135L)", "Speed: 65 km/h"],
      },
      {
        id: "3",
        incidentId: "INC-0847",
        time: "14:20",
        location: "Anomaly Location (Route KM 57)",
        saverity: "CRITICAL",
        details: [
          "GPS signal lost 12 minutes",
          "Suspected unauthorized stop",
          "Fuel missing: 45L",
        ],
      },
    ],
  },

  "INC-0848": {
    summary: {
      id: "INC-0848",
      caseNumber: "A-2024-0848",
      type: "Sudden Drop / Unauthorized Stop",
      fleetId: "F-002",
      driverId: "D-002",
      date: "06 Nov 2024, 15:10 WIB",
      severity: "HIGH",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0848",
        time: "14:30",
        location: "Depot A",
        saverity: "MEDIUM",
        details: ["Departure from depot", "Tank: 90% (160L)"],
      },
      {
        id: "2",
        incidentId: "INC-0848",
        time: "14:50",
        location: "Route KM 15 (Authorized)",
        saverity: "MEDIUM",
        details: ["Normal route", "Speed: 60 km/h"],
      },
      {
        id: "3",
        incidentId: "INC-0848",
        time: "15:10",
        location: "Route KM 23 (Unauthorized Stop)",
        saverity: "CRITICAL",
        details: [
          "Vehicle stopped for 20 minutes without authorization",
          "Fuel level decreased by 12L (indicates light siphoning or consumption during stop)",
        ],
      },
    ],
  },

  // INCIDENT 0849: Overconsumption Pattern - Truck #F-003
  "INC-0849": {
    summary: {
      id: "INC-0849",
      caseNumber: "A-2024-0849",
      type: "Overconsumption",
      fleetId: "F-003",
      driverId: "D-003",
      date: "06 Nov 2024, 16:05 WIB",
      severity: "HIGH",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0849",
        time: "15:00",
        location: "Depot B",
        saverity: "MEDIUM",
        details: ["Start of trip", "Tank: 92% (165L)"],
      },
      {
        id: "2",
        incidentId: "INC-0849",
        time: "15:30",
        location: "Route KM 30",
        saverity: "HIGH",
        details: [
          "Initial consumption spike detected",
          "Fuel usage 25% above baseline",
        ],
      },
      {
        id: "3",
        incidentId: "INC-0849",
        time: "16:05",
        location: "Route KM 45",
        saverity: "CRITICAL",
        details: [
          "Fuel consumption confirmed 38% above normal (pattern over 3 trips)",
          "Suggested inspection for aggressive driving or engine maintenance",
        ],
      },
    ],
  },

  // INCIDENT 0850: Sensor Malfunction - Truck #F-004
  "INC-0850": {
    summary: {
      id: "INC-0850",
      caseNumber: "A-2024-0850",
      type: "Sensor Malfunction",
      fleetId: "F-004",
      driverId: "D-004",
      date: "07 Nov 2024, 07:50 WIB",
      severity: "MEDIUM",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0850",
        time: "07:00",
        location: "Depot C",
        saverity: "MEDIUM",
        details: ["Vehicle check out", "Tank: 95% (170L)"],
      },
      {
        id: "2",
        incidentId: "INC-0850",
        time: "07:35",
        location: "Route KM 5",
        saverity: "HIGH",
        details: ["Fuel sensor reading unstable: Jumped from 88% to 75% then 85%"],
      },
      {
        id: "3",
        incidentId: "INC-0850",
        time: "07:50",
        location: "Depot C (Returning)",
        saverity: "CRITICAL",
        details: [
          "Inconsistent fuel sensor readings confirmed",
          "Temperature fluctuation detected (likely due to sensor issue)",
          "Recommended sensor replacement/recalibration",
        ],
      },
    ],
  },

  // INCIDENT 0851: Fuel Theft Attempt - Truck #F-005
  "INC-0851": {
    summary: {
      id: "INC-0851",
      caseNumber: "A-2024-0851",
      type: "Sudden Drop / Fuel Theft Attempt",
      fleetId: "F-005",
      driverId: "D-005",
      date: "07 Nov 2024, 08:20 WIB",
      severity: "CRITICAL",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0851",
        time: "07:45",
        location: "Depot A",
        saverity: "MEDIUM",
        details: ["Departure", "Tank: 98% (176L)"],
      },
      {
        id: "2",
        incidentId: "INC-0851",
        time: "08:10",
        location: "Route KM 8",
        saverity: "HIGH",
        details: [
          "Unauthorized vehicle stop detected (Stopped for 5 minutes)",
          "Fuel drop began immediately after stop",
        ],
      },
      {
        id: "3",
        incidentId: "INC-0851",
        time: "08:20",
        location: "Route KM 10",
        saverity: "CRITICAL",
        details: [
          "Confirmed fuel drop of 40L in 10 minutes",
          "Strong evidence of siphoning/fuel extraction",
        ],
      },
    ],
  },

  "INC-0852": {
    summary: {
      id: "INC-0852",
      caseNumber: "A-2024-0852",
      type: "Out of Zone",
      fleetId: "F-003",
      driverId: "D-002",
      date: "07 Nov 2024, 08:15 WIB",
      severity: "HIGH",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0852",
        time: "07:30",
        location: "Depot B",
        saverity: "MEDIUM",
        details: ["Departure from depot", "Tank: 92% (165L)"],
      },
      {
        id: "2",
        incidentId: "INC-0852",
        time: "08:05",
        location: "Route B (authorized)",
        saverity: "MEDIUM",
        details: ["Normal route", "Speed: 60 km/h"],
      },
      {
        id: "3",
        incidentId: "INC-0852",
        time: "08:15",
        location: "Industrial Zone C (Unauthorized Area)",
        saverity: "CRITICAL",
        details: [
          "Vehicle outside authorized zone",
          "Detected during night shift",
          "Fuel drop: 35L total",
        ],
      },
    ],
  },

  "INC-0853": {
    summary: {
      id: "INC-0853",
      caseNumber: "A-2024-0853",
      type: "Overconsumption",
      fleetId: "F-001",
      driverId: "D-003",
      date: "07 Nov 2024, 10:30 WIB",
      severity: "HIGH",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0853",
        time: "09:00",
        location: "Depot A",
        saverity: "MEDIUM",
        details: ["Tank: 94% (170L)", "Start of trip"],
      },
      {
        id: "2",
        incidentId: "INC-0853",
        time: "10:00",
        location: "Route C",
        saverity: "HIGH",
        details: [
          "Fuel usage 40% above normal",
          "Aggressive acceleration detected",
        ],
      },
      {
        id: "3",
        incidentId: "INC-0853",
        time: "10:30",
        location: "Route C Sector 3",
        saverity: "CRITICAL",
        details: [
          "Overconsumption pattern detected",
          "Suggested engine check overdue",
        ],
      },
    ],
  },

  "INC-0854": {
    summary: {
      id: "INC-0854",
      caseNumber: "A-2024-0854",
      type: "Sensor Malfunction",
      fleetId: "F-001",
      driverId: "D-004",
      date: "07 Nov 2024, 13:20 WIB",
      severity: "CRITICAL",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0854",
        time: "12:40",
        location: "Depot A",
        saverity: "MEDIUM",
        details: ["Departure", "Tank: 89%"],
      },
      {
        id: "2",
        incidentId: "INC-0854",
        time: "13:05",
        location: "Route D",
        saverity: "HIGH",
        details: ["Sensor reading fluctuating", "Error code: FUEL-ERR-02"],
      },
      {
        id: "3",
        incidentId: "INC-0854",
        time: "13:20",
        location: "Route D KM 22",
        saverity: "CRITICAL",
        details: ["Fuel sensor inconsistent", "Multiple anomalies recorded"],
      },
    ],
  },

  "INC-0855": {
    summary: {
      id: "INC-0855",
      caseNumber: "A-2024-0855",
      type: "Out of Zone",
      fleetId: "F-001",
      driverId: "D-001",
      date: "07 Nov 2024, 14:50 WIB",
      severity: "CRITICAL",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0855",
        time: "14:00",
        location: "Authorized Route E",
        saverity: "MEDIUM",
        details: ["Route normal", "Speed 60 km/h"],
      },
      {
        id: "2",
        incidentId: "INC-0855",
        time: "14:35",
        location: "Near Route Exit E",
        saverity: "HIGH",
        details: ["Deviation detected"],
      },
      {
        id: "3",
        incidentId: "INC-0855",
        time: "14:50",
        location: "50 km Off Route",
        saverity: "CRITICAL",
        details: [
          "Vehicle 50km off authorized route",
          "GPS active but no driver communication",
        ],
      },
    ],
  },

  "INC-0856": {
    summary: {
      id: "INC-0856",
      caseNumber: "A-2024-0856",
      type: "Sudden Drop",
      fleetId: "F-002",
      driverId: "D-005",
      date: "08 Nov 2024, 09:10 WIB",
      severity: "HIGH",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0856",
        time: "08:40",
        location: "Depot C",
        saverity: "MEDIUM",
        details: ["Tank: 91% (160L)", "Trip started normally"],
      },
      {
        id: "2",
        incidentId: "INC-0856",
        time: "09:00",
        location: "Route F",
        saverity: "HIGH",
        details: ["Fuel drop detected: 28L", "Sudden tank fluctuation"],
      },
      {
        id: "3",
        incidentId: "INC-0856",
        time: "09:10",
        location: "Route F KM 14",
        saverity: "CRITICAL",
        details: ["Fuel loss confirmed", "Potential siphoning activity"],
      },
    ],
  },

  "INC-0857": {
    summary: {
      id: "INC-0857",
      caseNumber: "A-2024-0857",
      type: "Out of Zone",
      fleetId: "F-004",
      driverId: "D-006",
      date: "08 Nov 2024, 11:25 WIB",
      severity: "CRITICAL",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0857",
        time: "10:50",
        location: "Authorized Route G",
        saverity: "MEDIUM",
        details: ["Normal route", "Speed stable at 55 km/h"],
      },
      {
        id: "2",
        incidentId: "INC-0857",
        time: "11:10",
        location: "Route Split G2",
        saverity: "HIGH",
        details: ["Deviation started", "GPS direction mismatch"],
      },
      {
        id: "3",
        incidentId: "INC-0857",
        time: "11:25",
        location: "Unauthorized Zone H",
        saverity: "CRITICAL",
        details: [
          "Vehicle detected outside zone",
          "Driver unresponsive to dispatch calls",
        ],
      },
    ],
  },

  "INC-0858": {
    summary: {
      id: "INC-0858",
      caseNumber: "A-2024-0858",
      type: "Overconsumption",
      fleetId: "F-003",
      driverId: "D-002",
      date: "08 Nov 2024, 12:05 WIB",
      severity: "HIGH",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0858",
        time: "11:20",
        location: "Depot B",
        saverity: "MEDIUM",
        details: ["Tank: 87% (150L)", "Trip started"],
      },
      {
        id: "2",
        incidentId: "INC-0858",
        time: "11:50",
        location: "Route H",
        saverity: "HIGH",
        details: [
          "Consumption 35% above normal",
          "Frequent throttle spikes detected",
        ],
      },
      {
        id: "3",
        incidentId: "INC-0858",
        time: "12:05",
        location: "Route H Sector 2",
        saverity: "CRITICAL",
        details: [
          "Overconsumption pattern confirmed",
          "Maintenance inspection recommended",
        ],
      },
    ],
  },

  "INC-0859": {
    summary: {
      id: "INC-0859",
      caseNumber: "A-2024-0859",
      type: "Sudden Drop",
      fleetId: "F-007",
      driverId: "D-007",
      date: "08 Nov 2024, 14:10 WIB",
      severity: "HIGH",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0859",
        time: "13:20",
        location: "Depot D",
        saverity: "MEDIUM",
        details: ["Tank: 93% (170L)", "Smooth departure"],
      },
      {
        id: "2",
        incidentId: "INC-0859",
        time: "13:50",
        location: "Route J",
        saverity: "HIGH",
        details: ["Fuel loss: 30L", "Sensor shows sudden drop"],
      },
      {
        id: "3",
        incidentId: "INC-0859",
        time: "14:10",
        location: "Route J KM 9",
        saverity: "CRITICAL",
        details: [
          "Abrupt tank reduction verified",
          "Suspicious stationary period",
        ],
      },
    ],
  },

  "INC-0860": {
    summary: {
      id: "INC-0860",
      caseNumber: "A-2024-0860",
      type: "Out of Zone",
      fleetId: "F-005",
      driverId: "D-008",
      date: "08 Nov 2024, 15:20 WIB",
      severity: "MEDIUM",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0860",
        time: "14:40",
        location: "Route K (Authorized)",
        saverity: "MEDIUM",
        details: ["Normal route", "Tank 88%"],
      },
      {
        id: "2",
        incidentId: "INC-0860",
        time: "15:00",
        location: "Route Exit K",
        saverity: "HIGH",
        details: ["Deviation detected", "Vehicle turning off designated road"],
      },
      {
        id: "3",
        incidentId: "INC-0860",
        time: "15:20",
        location: "Unauthorized Plantation Sector",
        saverity: "CRITICAL",
        details: ["Out of zone confirmed", "No authorized operations in area"],
      },
    ],
  },

  "INC-0861": {
    summary: {
      id: "INC-0861",
      caseNumber: "A-2024-0861",
      type: "Overconsumption",
      fleetId: "F-006",
      driverId: "D-009",
      date: "09 Nov 2024, 08:40 WIB",
      severity: "HIGH",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0861",
        time: "08:00",
        location: "Depot E",
        saverity: "MEDIUM",
        details: ["Tank: 89% (155L)", "Trip initiated"],
      },
      {
        id: "2",
        incidentId: "INC-0861",
        time: "08:25",
        location: "Route L",
        saverity: "HIGH",
        details: [
          "Consumption 38% higher than expected",
          "Aggressive acceleration detected",
        ],
      },
      {
        id: "3",
        incidentId: "INC-0861",
        time: "08:40",
        location: "Route L Sector 5",
        saverity: "CRITICAL",
        details: [
          "Overconsumption confirmed",
          "Engine temperature slightly elevated",
        ],
      },
    ],
  },

  "INC-0862": {
    summary: {
      id: "INC-0862",
      caseNumber: "A-2024-0862",
      type: "Sudden Drop",
      fleetId: "F-002",
      driverId: "D-010",
      date: "09 Nov 2024, 09:55 WIB",
      severity: "HIGH",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0862",
        time: "09:10",
        location: "Depot C",
        saverity: "MEDIUM",
        details: ["Tank: 92% (162L)", "Departure"],
      },
      {
        id: "2",
        incidentId: "INC-0862",
        time: "09:35",
        location: "Route M",
        saverity: "HIGH",
        details: [
          "Fuel drop detected: 25L",
          "Short unauthorized stop recorded",
        ],
      },
      {
        id: "3",
        incidentId: "INC-0862",
        time: "09:55",
        location: "Route M KM 11",
        saverity: "CRITICAL",
        details: [
          "Confirmed sudden drop event",
          "Potential siphoning activity suspected",
        ],
      },
    ],
  },

  "INC-0863": {
    summary: {
      id: "INC-0863",
      caseNumber: "A-2024-0863",
      type: "Out of Zone",
      fleetId: "F-004",
      driverId: "D-006",
      date: "09 Nov 2024, 11:10 WIB",
      severity: "CRITICAL",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0863",
        time: "10:30",
        location: "Authorized Route N",
        saverity: "MEDIUM",
        details: ["Route normal", "Speed 52 km/h"],
      },
      {
        id: "2",
        incidentId: "INC-0863",
        time: "10:55",
        location: "Route Fork N2",
        saverity: "HIGH",
        details: ["Unexpected route deviation detected"],
      },
      {
        id: "3",
        incidentId: "INC-0863",
        time: "11:10",
        location: "Unauthorized Forest Sector",
        saverity: "CRITICAL",
        details: [
          "Vehicle outside approved operation area",
          "Driver unreachable",
        ],
      },
    ],
  },

  "INC-0864": {
    summary: {
      id: "INC-0864",
      caseNumber: "A-2024-0864",
      type: "Overconsumption",
      fleetId: "F-003",
      driverId: "D-002",
      date: "09 Nov 2024, 13:20 WIB",
      severity: "MEDIUM",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0864",
        time: "12:45",
        location: "Depot B",
        saverity: "MEDIUM",
        details: ["Tank: 86% (148L)", "Trip start"],
      },
      {
        id: "2",
        incidentId: "INC-0864",
        time: "13:05",
        location: "Route O",
        saverity: "HIGH",
        details: [
          "Fuel usage trending above normal",
          "Irregular throttle pattern detected",
        ],
      },
      {
        id: "3",
        incidentId: "INC-0864",
        time: "13:20",
        location: "Route O Sector 4",
        saverity: "CRITICAL",
        details: [
          "Overconsumption confirmed",
          "Potential engine calibration issue",
        ],
      },
    ],
  },

  "INC-0865": {
    summary: {
      id: "INC-0865",
      caseNumber: "A-2024-0865",
      type: "Sudden Drop",
      fleetId: "F-007",
      driverId: "D-011",
      date: "09 Nov 2024, 15:15 WIB",
      severity: "HIGH",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0865",
        time: "14:40",
        location: "Depot D",
        saverity: "MEDIUM",
        details: ["Tank: 95% (175L)", "Smooth departure"],
      },
      {
        id: "2",
        incidentId: "INC-0865",
        time: "14:55",
        location: "Route P",
        saverity: "HIGH",
        details: [
          "Fuel drop: 32L detected",
          "Short stationary period in isolated area",
        ],
      },
      {
        id: "3",
        incidentId: "INC-0865",
        time: "15:15",
        location: "Route P KM 7",
        saverity: "CRITICAL",
        details: [
          "Confirmed sudden drop",
          "Possible unauthorized fuel extraction",
        ],
      },
    ],
  },

  "INC-0866": {
    summary: {
      id: "INC-0866",
      caseNumber: "A-2024-0866",
      type: "Out of Zone",
      fleetId: "F-002",
      driverId: "D-010",
      date: "10 Nov 2024, 08:10 WIB",
      severity: "HIGH",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0866",
        time: "07:40",
        location: "Authorized Route Q",
        saverity: "MEDIUM",
        details: ["Normal departure", "Tank: 90% (160L)"],
      },
      {
        id: "2",
        incidentId: "INC-0866",
        time: "08:00",
        location: "Route Q Turnpoint",
        saverity: "HIGH",
        details: ["Deviation initiated", "GPS mismatch noted"],
      },
      {
        id: "3",
        incidentId: "INC-0866",
        time: "08:10",
        location: "Restricted Valley Area",
        saverity: "CRITICAL",
        details: [
          "Vehicle outside authorized zone",
          "Driver unresponsive to dispatch",
        ],
      },
    ],
  },

  "INC-0867": {
    summary: {
      id: "INC-0867",
      caseNumber: "A-2024-0867",
      type: "Overconsumption",
      fleetId: "F-006",
      driverId: "D-009",
      date: "10 Nov 2024, 09:25 WIB",
      severity: "HIGH",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0867",
        time: "08:50",
        location: "Depot E",
        saverity: "MEDIUM",
        details: ["Tank: 88% (154L)", "Trip started"],
      },
      {
        id: "2",
        incidentId: "INC-0867",
        time: "09:10",
        location: "Route R",
        saverity: "HIGH",
        details: [
          "Fuel usage 34% above baseline",
          "Aggressive acceleration detected",
        ],
      },
      {
        id: "3",
        incidentId: "INC-0867",
        time: "09:25",
        location: "Route R Sector 2",
        saverity: "CRITICAL",
        details: [
          "Overconsumption confirmed",
          "Engine vibration irregularity observed",
        ],
      },
    ],
  },

  "INC-0868": {
    summary: {
      id: "INC-0868",
      caseNumber: "A-2024-0868",
      type: "Sudden Drop",
      fleetId: "F-003",
      driverId: "D-002",
      date: "10 Nov 2024, 10:45 WIB",
      severity: "HIGH",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0868",
        time: "10:05",
        location: "Depot B",
        saverity: "MEDIUM",
        details: ["Tank: 90% (158L)", "Smooth departure"],
      },
      {
        id: "2",
        incidentId: "INC-0868",
        time: "10:25",
        location: "Route S",
        saverity: "HIGH",
        details: ["Fuel drop recorded: 27L", "Short stationary stop detected"],
      },
      {
        id: "3",
        incidentId: "INC-0868",
        time: "10:45",
        location: "Route S KM 8",
        saverity: "CRITICAL",
        details: ["Confirmed abrupt fuel loss", "Potential siphoning attempt"],
      },
    ],
  },

  "INC-0869": {
    summary: {
      id: "INC-0869",
      caseNumber: "A-2024-0869",
      type: "Out of Zone",
      fleetId: "F-005",
      driverId: "D-008",
      date: "10 Nov 2024, 12:30 WIB",
      severity: "CRITICAL",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0869",
        time: "11:55",
        location: "Authorized Route T",
        saverity: "MEDIUM",
        details: ["Standard route", "Speed 58 km/h"],
      },
      {
        id: "2",
        incidentId: "INC-0869",
        time: "12:15",
        location: "Route T Fork",
        saverity: "HIGH",
        details: ["Deviation detected", "Direction mismatch"],
      },
      {
        id: "3",
        incidentId: "INC-0869",
        time: "12:30",
        location: "Restricted Plantation Sector",
        saverity: "CRITICAL",
        details: ["Vehicle outside allowed boundary", "Driver unreachable"],
      },
    ],
  },

  "INC-0870": {
    summary: {
      id: "INC-0870",
      caseNumber: "A-2024-0870",
      type: "Overconsumption",
      fleetId: "F-001",
      driverId: "D-003",
      date: "10 Nov 2024, 14:15 WIB",
      severity: "MEDIUM",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0870",
        time: "13:40",
        location: "Depot A",
        saverity: "MEDIUM",
        details: ["Tank: 87% (150L)", "Trip started"],
      },
      {
        id: "2",
        incidentId: "INC-0870",
        time: "14:00",
        location: "Route U",
        saverity: "HIGH",
        details: [
          "Fuel consumption trending 30% above normal",
          "Repeated throttle spikes",
        ],
      },
      {
        id: "3",
        incidentId: "INC-0870",
        time: "14:15",
        location: "Route U Sector 3",
        saverity: "CRITICAL",
        details: ["Overconsumption confirmed", "Maintenance check suggested"],
      },
    ],
  },

  "INC-0871": {
    summary: {
      id: "INC-0871",
      caseNumber: "A-2024-0871",
      type: "Sudden Drop",
      fleetId: "F-002",
      driverId: "D-005",
      date: "10 Nov 2024, 16:05 WIB",
      severity: "HIGH",
    },
    timeline: [
      {
        id: "1",
        incidentId: "INC-0871",
        time: "15:30",
        location: "Depot C",
        saverity: "MEDIUM",
        details: ["Tank: 94% (168L)", "Start of trip"],
      },
      {
        id: "2",
        incidentId: "INC-0871",
        time: "15:50",
        location: "Route V",
        saverity: "HIGH",
        details: ["Fuel drop: 29L detected", "Sensor fluctuation recorded"],
      },
      {
        id: "3",
        incidentId: "INC-0871",
        time: "16:05",
        location: "Route V KM 6",
        saverity: "CRITICAL",
        details: [
          "Confirmed sudden drop",
          "Possible unauthorized fuel extraction",
        ],
      },
    ],
  },
};
