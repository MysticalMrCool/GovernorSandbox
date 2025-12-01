// src/data/countries.js

export const COUNTRIES = {
  Japan: {
    name: "Japan",
    id: "JP",
    flag: "🇯🇵",
    coordinates: [138.2529, 36.2048],
    dimensions: { PDI: 54, IDV: 46, MAS: 95, UAI: 92, LTO: 88, IVR: 42 },
    wellbeing: {
      health: 75,
      psychological: 45,
      social: 55,
      civic: 60,
      economic: 70,
      environmental: 65
    },
    stressor: "Aging Society & Youth Mental Health",
    stressorDetail: "30% of population over 65. Youth suicide rates among highest in OECD. Gender wage gap persists at 25%.",
    context: "High Uncertainty Avoidance favors stability. Collectivism favors group harmony over individual mandates.",
    culturalInsights: [
      "High UAI (92): Citizens fear ambiguity—pilot programs need clear boundaries",
      "Collectivist (IDV 46): Group-based solutions outperform individual approaches",
      "Long-term oriented (LTO 88): Frame benefits across generations"
    ],
    blueprint: {
      name: "National Mental Health Mandate",
      type: "Top-Down",
      desc: "Enforce mandatory counseling for all students and tax penalties for companies with poor work-life balance.",
      fitScore: 0.3,
      whyBad: "Clashes with high UAI (fear of sudden change) and stigma around mental health in collectivist culture."
    },
    probes: [
      {
        id: 1,
        name: "School Wellness Workshops",
        type: "Community",
        fit: 0.9,
        status: "active",
        desc: "Small group sessions led by peers.",
        culturalFit: "Leverages group harmony and reduces stigma through peer support.",
        affectedDomains: ['psychological', 'social'],
        lesson: "Group-based mental health support reduces stigma in collectivist cultures."
      },
      {
        id: 2,
        name: "Time-Bank 2.0",
        type: "Tech",
        fit: 0.8,
        status: "active",
        desc: "Digital credits for eldercare volunteering.",
        culturalFit: "Builds on traditional mimamori (watch-over) norms.",
        affectedDomains: ['social', 'health'],
        lesson: "Digital platforms succeed when formalizing existing cultural practices."
      },
      {
        id: 3,
        name: "Radical Individual Therapy",
        type: "Individualist",
        fit: 0.2,
        status: "active",
        desc: "1-on-1 Western-style therapy focus.",
        culturalFit: "CLASH: Individual focus conflicts with collectivist norms.",
        affectedDomains: ['psychological'],
        lesson: "Individual-focused interventions fail in collectivist cultures."
      }
    ]
  },

  UK: {
    name: "United Kingdom",
    id: "UK",
    flag: "🇬🇧",
    coordinates: [-3.4360, 55.3781],
    dimensions: { PDI: 35, IDV: 89, MAS: 66, UAI: 35, LTO: 51, IVR: 69 },
    wellbeing: {
      health: 65,
      psychological: 55,
      social: 50,
      civic: 45,
      economic: 55,
      environmental: 60
    },
    stressor: "Regional Inequality & Eroding Trust",
    stressorDetail: "Post-Brexit divisions persist. NHS under severe strain. Life expectancy in North lags South by 5+ years.",
    context: "High Individualism and Low Power Distance. Citizens expect voice, transparency, and dislike authority.",
    culturalInsights: [
      "Low PDI (35): Top-down mandates face resistance—co-design is essential",
      "High IDV (89): Frame policies around personal choice and individual benefit",
      "Low UAI (35): Open to experimentation and novel approaches"
    ],
    blueprint: {
      name: "Centralized Levelling Up Fund",
      type: "Bureaucratic",
      desc: "A massive fund managed by London bureaucrats to redistribute wealth to the North.",
      fitScore: 0.4,
      whyBad: "Low PDI culture resists centralized authority. Perceived as 'London telling us what to do.'"
    },
    probes: [
      {
        id: 1,
        name: "Civic Trust Dividends",
        type: "Incentive",
        fit: 0.85,
        status: "active",
        desc: "Cash rewards for civic volunteering.",
        culturalFit: "Appeals to individualism through personal incentives.",
        affectedDomains: ['civic', 'social'],
        lesson: "Individual incentives can bootstrap collective action in high-individualism cultures."
      },
      {
        id: 2,
        name: "Citizen Assemblies",
        type: "Democratic",
        fit: 0.9,
        status: "active",
        desc: "Local decision-making bodies with real power.",
        culturalFit: "Perfect fit for low PDI—citizens expect voice.",
        affectedDomains: ['civic', 'psychological'],
        lesson: "Deliberative democracy increases trust when citizens see input translated to action."
      },
      {
        id: 3,
        name: "Strict Curfews",
        type: "Authoritarian",
        fit: 0.1,
        status: "active",
        desc: "Top-down movement restrictions.",
        culturalFit: "CLASH: Major conflict with liberty values.",
        affectedDomains: ['civic'],
        lesson: "Authoritarian measures backfire in low-PDI, high-individualism cultures."
      }
    ]
  },

  India: {
    name: "India",
    id: "IN",
    flag: "🇮🇳",
    coordinates: [78.9629, 20.5937],
    dimensions: { PDI: 77, IDV: 48, MAS: 56, UAI: 40, LTO: 51, IVR: 26 },
    wellbeing: {
      health: 45,
      psychological: 50,
      social: 65,
      civic: 40,
      economic: 40,
      environmental: 35
    },
    stressor: "Education Gaps & Gender Inequality",
    stressorDetail: "Nearly half of 5th graders below reading proficiency. Female labor force participation under 30%. 90% in informal work.",
    context: "High Power Distance but low Uncertainty Avoidance. Respects hierarchy but adaptable/chaotic execution.",
    culturalInsights: [
      "High PDI (77): Respected elders and authority figures legitimize initiatives",
      "Low UAI (40): Comfortable with improvisation—'jugaad' innovation spirit",
      "Collectivist (IDV 48): Community and family networks are key channels"
    ],
    blueprint: {
      name: "Standardized Digital Exam System",
      type: "Technocratic",
      desc: "A single digital exam platform required for all rural villages immediately.",
      fitScore: 0.2,
      whyBad: "Ignores infrastructure gaps, removes human connection, and imposes rigid standardization on adaptive culture."
    },
    probes: [
      {
        id: 1,
        name: "Edu-Hubs",
        type: "Community",
        fit: 0.9,
        status: "active",
        desc: "Physical centers mixing elders & tech.",
        culturalFit: "Respects hierarchy while introducing technology gradually.",
        affectedDomains: ['psychological', 'social', 'economic'],
        lesson: "Hybrid spaces honoring traditional authority achieve highest adoption."
      },
      {
        id: 2,
        name: "Women's Micro-Grants",
        type: "Economic",
        fit: 0.85,
        status: "active",
        desc: "Small loans via self-help groups.",
        culturalFit: "Works through existing collectivist structures.",
        affectedDomains: ['economic', 'civic'],
        lesson: "Community networks are powerful channels for economic intervention."
      },
      {
        id: 3,
        name: "Robotic Teachers",
        type: "Alien",
        fit: 0.4,
        status: "active",
        desc: "AI-powered teaching screens.",
        culturalFit: "PARTIAL CLASH: Loses human connection critical in high-PDI culture.",
        affectedDomains: ['psychological'],
        lesson: "Technology should augment, not replace, authority figures in high-PDI cultures."
      }
    ]
  },

  Cameroon: {
    name: "Cameroon",
    id: "CM",
    flag: "🇨🇲",
    coordinates: [12.3547, 7.3697],
    dimensions: { PDI: 80, IDV: 20, MAS: 50, UAI: 60, LTO: 30, IVR: 30 },
    wellbeing: {
      health: 35,
      psychological: 40,
      social: 55,
      civic: 30,
      economic: 30,
      environmental: 45
    },
    stressor: "Conflict & Health Access",
    stressorDetail: "Anglophone crisis displaced 700,000+. Life expectancy 60-65 years. Health spending under 4% of GDP.",
    context: "Very High Power Distance and Collectivism. Authority and community elders are key to legitimacy.",
    culturalInsights: [
      "Very High PDI (80): Chiefs and elders must endorse initiatives for adoption",
      "High Collectivism (IDV 20): Programs must benefit the community, not just individuals",
      "Traditional palaver system: Consensus-building through community dialogue expected"
    ],
    blueprint: {
      name: "National Health ID Cards",
      type: "Bureaucratic",
      desc: "Mandatory digital ID for all health access, managed by central government.",
      fitScore: 0.3,
      whyBad: "Deep mistrust of central government in conflict zones. Excludes displaced populations without documentation."
    },
    probes: [
      {
        id: 1,
        name: "Agro-Ecology Co-ops",
        type: "Community",
        fit: 0.9,
        status: "active",
        desc: "Farming co-ops led by village chiefs.",
        culturalFit: "High authority endorsement + community benefit = perfect fit.",
        affectedDomains: ['economic', 'health', 'environmental'],
        lesson: "Chief-endorsed cooperatives achieve near-universal adoption."
      },
      {
        id: 2,
        name: "Diaspora Funding App",
        type: "Network",
        fit: 0.8,
        status: "active",
        desc: "Transparent funding from relatives abroad.",
        culturalFit: "Leverages extended family networks with accountability.",
        affectedDomains: ['economic', 'civic'],
        lesson: "Diaspora networks are powerful when paired with local governance."
      },
      {
        id: 3,
        name: "Privatized Clinics",
        type: "Market",
        fit: 0.2,
        status: "active",
        desc: "Pay-per-use private health clinics.",
        culturalFit: "CLASH: Market logic conflicts with community poverty norms.",
        affectedDomains: ['health'],
        lesson: "Market-based health models fail where poverty is widespread."
      }
    ]
  }
};

export default COUNTRIES;
