export const COUNTRIES = {
  Japan: {
    name: "Japan",
    id: "JP",
    flag: "🇯🇵",
    dimensions: { PDI: 54, IDV: 46, MAS: 95, UAI: 92, LTO: 88, IVR: 42 },
    stressor: "Aging Society & Youth Mental Health",
    context: "High Uncertainty Avoidance favors stability. Collectivism favors group harmony over individual mandates.",
    blueprint: {
      name: "National Mental Health Mandate",
      type: "Top-Down",
      desc: "Enforce mandatory counseling for all students and tax penalties for companies with poor work-life balance.",
      risk: "High",
      fitScore: 0.3 // Low fit due to high UAI (fear of change) and top-down nature
    },
    probes: [
      { id: 1, name: "School Wellness Workshops", type: "Community", fit: 0.9, status: "active", desc: "Small group sessions led by peers (High Cultural Fit)." },
      { id: 2, name: "Time-Bank 2.0", type: "Tech", fit: 0.8, status: "active", desc: "Digital credits for eldercare (Leverages Reciprocity)." },
      { id: 3, name: "Radical Individual Therapy", type: "Individualist", fit: 0.2, status: "active", desc: "1-on-1 therapy focus (Clashes with Stigma/Collectivism)." }
    ]
  },
  UK: {
    name: "United Kingdom",
    id: "UK",
    flag: "🇬🇧",
    dimensions: { PDI: 35, IDV: 89, MAS: 66, UAI: 35, LTO: 51, IVR: 69 },
    stressor: "Regional Inequality & Trust",
    context: "High Individualism and Low Power Distance. Citizens expect voice, transparency, and dislike authority.",
    blueprint: {
      name: "Centralized Levelling Up Fund",
      type: "Bureaucratic",
      desc: "A massive fund managed by London bureaucrats to redistribute wealth to the North.",
      risk: "High",
      fitScore: 0.4 // Low fit due to Low PDI (dislike of central authority)
    },
    probes: [
      { id: 1, name: "Civic Trust Dividends", type: "Incentive", fit: 0.85, status: "active", desc: "Cash rewards for civic volunteering (High Individualism Fit)." },
      { id: 2, name: "Citizen Assemblies", type: "Democratic", fit: 0.9, status: "active", desc: "Local decision making bodies (High Fit for Low PDI)." },
      { id: 3, name: "Strict Curfews", type: "Authoritarian", fit: 0.1, status: "active", desc: "Top-down control measures (Major clash with Liberty values)." }
    ]
  },
  India: {
    name: "India",
    id: "IN",
    flag: "🇮🇳",
    dimensions: { PDI: 77, IDV: 48, MAS: 56, UAI: 40, LTO: 51, IVR: 26 },
    stressor: "Education Gaps & Gender Inequality",
    context: "High Power Distance but low Uncertainty Avoidance. Respects hierarchy but adaptable/chaotic execution.",
    blueprint: {
      name: "Standardized Digital Exam System",
      type: "Technocratic",
      desc: "A single digital exam platform required for all rural villages immediately.",
      risk: "Very High",
      fitScore: 0.2 // Fail due to infrastructure gaps and rigid standardization
    },
    probes: [
      { id: 1, name: "Edu-Hubs", type: "Community", fit: 0.9, status: "active", desc: "Physical centers mixing elders & tech (Respects Hierarchy)." },
      { id: 2, name: "Women's Micro-Grants", type: "Economic", fit: 0.85, status: "active", desc: "Small loans via self-help groups (Collectivist Fit)." },
      { id: 3, name: "Robotic Teachers", type: "Alien", fit: 0.4, status: "active", desc: "Replacing local teachers with screens (Loss of human connection)." }
    ]
  },
    Cameroon: {
    name: "Cameroon",
    id: "CM",
    flag: "🇨🇲",
    dimensions: { PDI: 80, IDV: 20, MAS: 50, UAI: 60, LTO: 30, IVR: 30 }, // Approx/generalized values based on region
    stressor: "Conflict & Health Access",
    context: "Very High Power Distance and Collectivism. Authority and community elders are key to legitimacy.",
    blueprint: {
      name: "National Health ID Cards",
      type: "Bureaucratic",
      desc: "Mandatory digital ID for all health access, managed by central government.",
      risk: "High",
      fitScore: 0.3 // Mistrust of central gov in conflict zones causes rejection
    },
    probes: [
      { id: 1, name: "Agro-Ecology Co-ops", type: "Community", fit: 0.9, status: "active", desc: "Farming co-ops led by village chiefs (High Authority Fit)." },
      { id: 2, name: "Diaspora Funding App", type: "Network", fit: 0.8, status: "active", desc: "Transparent funding from relatives abroad (Collectivist Fit)." },
      { id: 3, name: "Privatized Clinics", type: "Market", fit: 0.2, status: "active", desc: "Pay-per-use clinics (Clashes with community poverty norms)." }
    ]
  }
};
