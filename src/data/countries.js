// src/data/countries.js
// Evidence-based country data with research-backed baselines and interventions

export const COUNTRIES = {
  Japan: {
    name: "Japan",
    id: "JP",
    flag: "🇯🇵",
    coordinates: [138.2529, 36.2048],
    
    // Hofstede Cultural Dimensions
    dimensions: { PDI: 54, IDV: 46, MAS: 95, UAI: 92, LTO: 88, IVR: 42 },
    
    // Research-backed baseline wellbeing (0-100 scale)
    wellbeing: {
      health: 78,        // Highest life expectancy globally, but aging burden
      psychological: 52, // Depression prevalence doubled 2013-2020 (7.9% → 17.3%)
      social: 58,        // High isolation, kodoku-shi, hikikomori phenomenon
      civic: 65,         // Moderate institutional trust
      economic: 72,      // Strong but strained by aging demographics
      environmental: 71  // Strong environmental standards
    },
    
    stressor: "Aging Society & Youth Mental Health Crisis",
    stressorDetail: "World's most aged society (30% over 65). Depression prevalence doubled post-COVID. High youth suicide rates and 'kodoku-shi' (solitary death) phenomenon.",
    context: "High Uncertainty Avoidance favors stability. Collectivism supports group-based interventions over individual mandates.",
    
    // Context Factors (0-1 scale) - derived from World Bank, OECD indices
    contextFactors: {
      institutionalTrust: 0.70,
      culturalOpenness: 0.50,      // Conservative culture
      implementationCapacity: 0.85, // High government capability
      civilSocietyStrength: 0.70,
      conflictLevel: 0.00,
      economicStability: 0.75,
      digitalReadiness: 0.90
    },
    
    culturalInsights: [
      "High UAI (92): Citizens fear ambiguity—pilot programs need clear boundaries",
      "Collectivist (IDV 46): Group-based solutions outperform individual approaches",
      "Long-term oriented (LTO 88): Frame benefits across generations",
      "High stigma around mental health care-seeking - indirect approaches work better"
    ],
    
    blueprint: {
      name: "National Mental Health Mandate",
      type: "Top-Down",
      desc: "Enforce mandatory counseling for all students and tax penalties for companies with poor work-life balance.",
      fitScore: 0.3,
      whyBad: "Clashes with high UAI (fear of sudden change) and stigma around mental health in collectivist culture."
    },
    
    // Evidence-based policy probes with research sources
    probes: [
      {
        id: 1,
        name: "Ikoino Saron (Elder Salons)",
        type: "Community",
        desc: "Community gathering spaces for adults 65+ combining social activities, light exercise, and mutual support.",
        evidenceSource: "Bull World Health Organ 2019",
        evidenceNote: "Participation halved incidence of long-term care needs and reduced dementia risk by approximately one-third. 86.5% of municipalities implemented by 2017.",
        confidence: "high", // RCT/meta-analysis
        baseFit: 0.85,
        status: "active",
        culturalFit: "Leverages group harmony and respects elders within collectivist framework.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 2.0,
          psychological: 2.5,
          social: 3.0,
          economic: -0.5,  // Cost of implementation
          civic: 1.5,
          environmental: 0
        },
        lagMonths: { min: 6, max: 12 },
        lesson: "Community-based elder programs achieve high adoption when framed around social belonging rather than health intervention."
      },
      {
        id: 2,
        name: "Gatekeeper Training Program",
        type: "Community",
        desc: "Training community members (teachers, employers, neighbors) to identify at-risk youth showing suicide warning signs.",
        evidenceSource: "BJPsych Open 2023",
        evidenceNote: "Effective pre-pandemic but youth suicide increased post-2020. Shows effectiveness depends on social environment stability.",
        confidence: "medium", // Cohort studies
        baseFit: 0.75,
        status: "active",
        culturalFit: "Works through existing social networks rather than individual intervention.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 1.0,
          psychological: 1.5,
          social: 2.0,
          economic: -0.5,  // Training costs
          civic: 1.0,
          environmental: 0
        },
        lagMonths: { min: 3, max: 6 },
        lesson: "Community-based mental health detection can be disrupted by social isolation events."
      },
      {
        id: 3,
        name: "LTCI Reform (Long-Term Care Insurance)",
        type: "Policy",
        desc: "Population-wide approach to long-term care integrating prevention, community support, and formal services.",
        evidenceSource: "Arch Public Health 2022",
        evidenceNote: "Japan's LTCI system is considered a model for aging societies, though cost sustainability is a challenge.",
        confidence: "high",
        baseFit: 0.80,
        status: "active",
        culturalFit: "Aligns with long-term orientation and collective responsibility for elder care.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 1.5,
          psychological: 1.0,
          social: 2.0,
          economic: -2.0,  // Significant cost
          civic: 1.0,
          environmental: 0
        },
        lagMonths: { min: 24, max: 36 },
        lesson: "Population-wide care systems require long implementation periods but create lasting infrastructure."
      },
      {
        id: 4,
        name: "School Mental Health Education",
        type: "Education",
        desc: "Teaching youth to recognize mental illness symptoms in themselves and peers within school curriculum.",
        evidenceSource: "WEF 2022",
        evidenceNote: "Part of broader school-based mental health initiatives showing promise in reducing stigma.",
        confidence: "medium",
        baseFit: 0.70,
        status: "active",
        culturalFit: "School-based approach respects authority while normalizing mental health awareness.",
        affectedDomains: ['health', 'psychological', 'social', 'civic'],
        effectWeights: {
          health: 0.5,
          psychological: 2.0,
          social: 1.5,
          economic: 0,
          civic: 0.5,
          environmental: 0
        },
        lagMonths: { min: 6, max: 12 },
        lesson: "School-based mental health programs can reduce stigma but require cultural sensitivity."
      },
      {
        id: 5,
        name: "Dementia-Friendly Communities",
        type: "Community",
        desc: "Creating inclusive public spaces, training businesses, and building support networks for dementia patients and families.",
        evidenceSource: "Global Health Med 2024",
        evidenceNote: "Emerging evidence shows improved quality of life for dementia patients and reduced caregiver burden.",
        confidence: "medium",
        baseFit: 0.78,
        status: "active",
        culturalFit: "Extends traditional community care values to address growing dementia prevalence.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 1.0,
          psychological: 1.5,
          social: 2.0,
          economic: -1.0,
          civic: 0.5,
          environmental: 0
        },
        lagMonths: { min: 12, max: 18 },
        lesson: "Community-wide dementia support requires coordination across multiple sectors."
      }
    ],
    
    // Country-specific risk events
    riskEvents: [
      {
        id: 'pandemic_resurgence',
        name: 'Pandemic Resurgence',
        description: 'New COVID variant or other pandemic requiring social distancing measures.',
        probability: 0.15, // Annual probability
        affectedDomains: ['psychological', 'social'],
        modifier: -1.5,
        isPersistent: false,
        duration: 6 // months
      },
      {
        id: 'care_workforce_shortage',
        name: 'Care Workforce Shortage',
        description: 'Aging population outpaces available caregivers, straining health systems.',
        probability: 0.80, // Very likely ongoing issue
        affectedDomains: ['health'],
        modifier: -0.5,
        isPersistent: true,
        duration: null
      },
      {
        id: 'natural_disaster',
        name: 'Natural Disaster',
        description: 'Earthquake, typhoon, or other natural disaster disrupting services.',
        probability: 0.10,
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic', 'environmental'],
        modifier: -1.0,
        isPersistent: false,
        duration: 3
      }
    ]
  },

  UK: {
    name: "United Kingdom",
    id: "UK",
    flag: "🇬🇧",
    coordinates: [-3.4360, 55.3781],
    
    dimensions: { PDI: 35, IDV: 89, MAS: 66, UAI: 35, LTO: 51, IVR: 69 },
    
    // Research-backed baseline wellbeing
    wellbeing: {
      health: 72,        // Strong NHS but regional disparities
      psychological: 62, // Mental health awareness growing
      social: 58,        // Community fragmentation in left-behind areas
      civic: 55,         // Low trust in politicians, Brexit divisions
      economic: 65,      // Strong overall but severe regional gaps
      environmental: 68  // Good standards but regional variation
    },
    
    stressor: "Regional Inequality & Eroding Trust",
    stressorDetail: "Among highest geographic inequality in OECD. Persistent North-South divide. 'Left behind' communities linked to Brexit vote. Local government funding cut 46% in worst-affected areas.",
    context: "High Individualism and Low Power Distance. Citizens expect voice, transparency, and dislike top-down authority.",
    
    contextFactors: {
      institutionalTrust: 0.50,       // Low - post-Brexit, political churn
      culturalOpenness: 0.70,          // Relatively open to innovation
      implementationCapacity: 0.70,    // Hampered by political cycles
      civilSocietyStrength: 0.75,      // Strong NGO sector
      conflictLevel: 0.05,             // Some social tension
      economicStability: 0.65,         // Cost of living pressures
      digitalReadiness: 0.85
    },
    
    culturalInsights: [
      "Low PDI (35): Top-down mandates face resistance—co-design is essential",
      "High IDV (89): Frame policies around personal choice and individual benefit",
      "Low UAI (35): Open to experimentation and novel approaches",
      "Strong skepticism of London-centric policy making"
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
        name: "Citizens' Assembly (Local)",
        type: "Democratic",
        desc: "Deliberative democracy bodies at local level where randomly selected citizens discuss and recommend policy solutions.",
        evidenceSource: "Newcastle Univ 2023",
        evidenceNote: "Local citizens' assemblies show high participant engagement and increased political efficacy among participants.",
        confidence: "high",
        baseFit: 0.90,
        status: "active",
        culturalFit: "Perfect fit for low PDI—citizens expect voice and input in decisions affecting them.",
        affectedDomains: ['health', 'psychological', 'social', 'civic', 'environmental'],
        effectWeights: {
          health: 0.5,
          psychological: 1.5,
          social: 2.0,
          economic: 0,
          civic: 3.0,
          environmental: 1.0
        },
        lagMonths: { min: 6, max: 12 },
        lesson: "Local deliberative democracy increases trust when citizens see input translated to action."
      },
      {
        id: 2,
        name: "Citizens' Assembly (National)",
        type: "Democratic",
        desc: "National-level deliberative process on major policy issues like climate or NHS reform.",
        evidenceSource: "OECD 2020",
        evidenceNote: "76% of mini-public recommendations were implemented. Climate Assembly UK moved online without quality loss.",
        confidence: "high",
        baseFit: 0.85,
        status: "active",
        culturalFit: "Appeals to desire for voice while maintaining national-scale impact.",
        affectedDomains: ['health', 'psychological', 'social', 'civic', 'environmental'],
        effectWeights: {
          health: 0.5,
          psychological: 1.0,
          social: 1.5,
          economic: 0,
          civic: 2.5,
          environmental: 1.5
        },
        lagMonths: { min: 12, max: 24 },
        lesson: "National assemblies build legitimacy for difficult policy decisions."
      },
      {
        id: 3,
        name: "Levelling Up Fund",
        type: "Economic",
        desc: "Infrastructure investment targeting economically disadvantaged areas in the North and Midlands.",
        evidenceSource: "IFS 2024",
        evidenceNote: "IFS found progress 'glacial' - employment, educational attainment, and life satisfaction all worsened while regional gaps widened.",
        confidence: "medium",
        baseFit: 0.55,
        status: "active",
        culturalFit: "Good intent but implementation perceived as top-down and slow.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic', 'environmental'],
        effectWeights: {
          health: 0.5,
          psychological: 0.5,
          social: 1.0,
          economic: 1.5,
          civic: 0.5,
          environmental: 0.5
        },
        lagMonths: { min: 24, max: 48 },
        lesson: "Large infrastructure investments require consistent multi-decade commitment to show results."
      },
      {
        id: 4,
        name: "Devolution Deal",
        type: "Governance",
        desc: "Transfer of powers to combined authorities and regional mayors.",
        evidenceSource: "Regional Studies 2023",
        evidenceNote: "Mixed results - effectiveness depends on capacity of receiving authorities and clarity of powers transferred.",
        confidence: "medium",
        baseFit: 0.75,
        status: "active",
        culturalFit: "Aligns with desire for local control and reduced London dominance.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic', 'environmental'],
        effectWeights: {
          health: 0.5,
          psychological: 0.5,
          social: 1.0,
          economic: 1.5,
          civic: 2.0,
          environmental: 0.5
        },
        lagMonths: { min: 36, max: 60 },
        lesson: "Devolution works when local authorities have genuine power and resources."
      },
      {
        id: 5,
        name: "R&D Redistribution",
        type: "Economic",
        desc: "Moving research funding and institutions outside the Southeast to create new innovation hubs.",
        evidenceSource: "DLUHC 2022",
        evidenceNote: "Early stages - evidence limited but economic theory supports geographic spread of innovation.",
        confidence: "low",
        baseFit: 0.60,
        status: "active",
        culturalFit: "Addresses resentment of London concentration but faces academic resistance.",
        affectedDomains: ['psychological', 'social', 'economic', 'civic', 'environmental'],
        effectWeights: {
          health: 0,
          psychological: 0.5,
          social: 0.5,
          economic: 2.0,
          civic: 0.5,
          environmental: 1.0
        },
        lagMonths: { min: 48, max: 72 },
        lesson: "Research ecosystem building takes a generation - requires patient capital."
      },
      {
        id: 6,
        name: "Digital Connectivity (5G Rollout)",
        type: "Tech",
        desc: "Expanding 5G coverage to underserved areas, particularly rural regions.",
        evidenceSource: "Gov data 2024",
        evidenceNote: "5G coverage outside London rose from 67% to 78% in just 9 months (2023-24) - rapid progress.",
        confidence: "high",
        baseFit: 0.82,
        status: "active",
        culturalFit: "Appeals to individual benefit and innovation culture.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 1.0,
          psychological: 0.5,
          social: 1.5,
          economic: 1.5,
          civic: 1.0,
          environmental: 0
        },
        lagMonths: { min: 12, max: 18 },
        lesson: "Infrastructure investment can show rapid results with strong implementation."
      }
    ],
    
    riskEvents: [
      {
        id: 'political_cycle_disruption',
        name: 'Political Cycle Disruption',
        description: 'Change in government or policy priorities disrupting long-term programs.',
        probability: 0.40,
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic', 'environmental'],
        modifier: -1.0,
        isPersistent: false,
        duration: 12,
        note: 'Particularly affects policies with long lag times'
      },
      {
        id: 'funding_cut',
        name: 'Funding Cut',
        description: 'Austerity measures or budget reductions affecting program delivery.',
        probability: 0.25,
        affectedDomains: ['economic', 'social'],
        modifier: -1.5,
        isPersistent: true,
        duration: null
      },
      {
        id: 'cost_of_living_crisis',
        name: 'Cost of Living Crisis',
        description: 'Inflation and energy costs straining household budgets and public services.',
        probability: 0.60,
        affectedDomains: ['economic', 'psychological'],
        modifier: -1.0,
        isPersistent: true,
        duration: null
      }
    ]
  },

  India: {
    name: "India",
    id: "IN",
    flag: "🇮🇳",
    coordinates: [78.9629, 20.5937],
    
    dimensions: { PDI: 77, IDV: 48, MAS: 56, UAI: 40, LTO: 51, IVR: 26 },
    
    // Research-backed baseline wellbeing
    wellbeing: {
      health: 55,        // Improving but significant rural-urban gaps
      psychological: 50, // Growing awareness but stigma persists
      social: 62,        // Strong community structures, caste challenges
      civic: 58,         // Active democracy, implementation gaps
      economic: 52,      // Fast growth but inequality
      environmental: 45  // Air quality, water challenges
    },
    
    stressor: "Education Gaps & Gender Inequality",
    stressorDetail: "World's largest population (1.43B). 50% of Grade 5 students can't read at Grade 2 level. Low female workforce participation (20.5%). 85M+ households in Self-Help Groups.",
    context: "High Power Distance but low Uncertainty Avoidance. Respects hierarchy but comfortable with adaptive 'jugaad' approaches.",
    
    contextFactors: {
      institutionalTrust: 0.55,
      culturalOpenness: 0.60,
      implementationCapacity: 0.50,    // Varies widely by state
      civilSocietyStrength: 0.70,      // Vibrant NGO sector
      conflictLevel: 0.15,             // Regional tensions
      economicStability: 0.65,
      digitalReadiness: 0.60           // Urban-rural divide
    },
    
    culturalInsights: [
      "High PDI (77): Respected elders and authority figures legitimize initiatives",
      "Low UAI (40): Comfortable with improvisation—'jugaad' innovation spirit",
      "Collectivist (IDV 48): Community and family networks are key channels",
      "Education predicts SHG success - literate members get larger loans, stay longer"
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
        name: "NEP FLN Focus",
        type: "Education",
        desc: "National Education Policy prioritizing Foundational Literacy & Numeracy (FLN) in early grades.",
        evidenceSource: "ASER 2024",
        evidenceNote: "First improvement in foundational learning outcomes in two decades. Government schools outperformed private schools in FLN metrics.",
        confidence: "high",
        baseFit: 0.82,
        status: "active",
        culturalFit: "Works through existing school authority while allowing local adaptation.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 1.0,
          psychological: 1.5,
          social: 1.0,
          economic: 0.5,
          civic: 0.5,
          environmental: 0
        },
        lagMonths: { min: 24, max: 36 },
        lesson: "Focusing resources on foundational skills shows measurable improvement even in large systems."
      },
      {
        id: 2,
        name: "NEP Higher Ed Reform",
        type: "Education",
        desc: "Multiple entry-exit pathways, credit transfer system, and flexible degree structures.",
        evidenceSource: "Sage 2024",
        evidenceNote: "Early implementation phase - structural reforms showing promise but full impact years away.",
        confidence: "medium",
        baseFit: 0.68,
        status: "active",
        culturalFit: "Aligns with jugaad spirit of flexibility, but bureaucratic resistance exists.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic', 'environmental'],
        effectWeights: {
          health: 0.5,
          psychological: 1.0,
          social: 1.0,
          economic: 2.0,
          civic: 0.5,
          environmental: 0.5
        },
        lagMonths: { min: 48, max: 72 },
        lesson: "Higher education reform requires generational patience to see full effects."
      },
      {
        id: 3,
        name: "SHG Microfinance",
        type: "Economic",
        desc: "Women's Self-Help Groups providing savings, credit, and financial literacy through community networks.",
        evidenceSource: "World Development 2023",
        evidenceNote: "Strong impact on women's decision-making and financial independence. 85M households reached, targeting 100M. BUT does not affect attitudes toward domestic violence.",
        confidence: "high",
        baseFit: 0.88,
        status: "active",
        culturalFit: "Works through collectivist structures and provides economic agency within community framework.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 1.0,
          psychological: 2.0,
          social: 2.5,
          economic: 2.0,
          civic: 1.5,
          environmental: 0
        },
        lagMonths: { min: 12, max: 24 },
        lesson: "Community networks are powerful channels for economic intervention but cannot alone change deep cultural norms."
      },
      {
        id: 4,
        name: "SHG + Health Literacy",
        type: "Integrated",
        desc: "Combining microfinance SHGs with health education, nutrition, and family planning information.",
        evidenceSource: "PLOS ONE 2020",
        evidenceNote: "Integration of health literacy with economic programs shows synergistic effects - women gain both resources and knowledge.",
        confidence: "high",
        baseFit: 0.85,
        status: "active",
        culturalFit: "Trusted community networks become channels for health information.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 2.5,
          psychological: 1.5,
          social: 2.0,
          economic: 1.5,
          civic: 1.0,
          environmental: 0
        },
        lagMonths: { min: 12, max: 18 },
        lesson: "Existing trust networks amplify health interventions when integrated thoughtfully."
      },
      {
        id: 5,
        name: "SWAYAM Digital Learning",
        type: "Tech",
        desc: "Free online courses platform providing access to quality education across geographies.",
        evidenceSource: "Gov data 2024",
        evidenceNote: "Growing enrollment but effectiveness limited by digital access in rural areas.",
        confidence: "medium",
        baseFit: 0.62,
        status: "active",
        culturalFit: "Appeals to education aspiration but constrained by digital divide.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 0.5,
          psychological: 1.0,
          social: 0.5,
          economic: 1.5,
          civic: 0.5,
          environmental: 0
        },
        lagMonths: { min: 6, max: 12 },
        lesson: "Digital education can supplement but not replace in-person learning in infrastructure-limited contexts."
      },
      {
        id: 6,
        name: "NISHTHA Teacher Training",
        type: "Capacity",
        desc: "National initiative for school heads and teachers providing integrated training and development.",
        evidenceSource: "PIB 2024",
        evidenceNote: "Millions of teachers trained but quality and application of training varies significantly.",
        confidence: "medium",
        baseFit: 0.72,
        status: "active",
        culturalFit: "Respects authority of teachers while building their capacity.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 0.5,
          psychological: 1.0,
          social: 1.0,
          economic: 0.5,
          civic: 0.5,
          environmental: 0
        },
        lagMonths: { min: 18, max: 24 },
        lesson: "Teacher training scale is achievable but translating training to classroom change is harder."
      }
    ],
    
    riskEvents: [
      {
        id: 'digital_divide',
        name: 'Digital Divide Impact',
        description: 'Rural areas unable to access or benefit from digital interventions.',
        probability: 0.70,
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic', 'environmental'],
        modifier: -1.5,
        isPersistent: true,
        duration: null,
        note: 'Particularly affects digital interventions; modifier applies as effectiveness reduction'
      },
      {
        id: 'teacher_capacity_gap',
        name: 'Teacher Capacity Gap',
        description: 'Shortage of trained teachers limits education program effectiveness.',
        probability: 0.60,
        affectedDomains: ['psychological', 'social', 'civic'],
        modifier: -1.0,
        isPersistent: true,
        duration: null
      },
      {
        id: 'monsoon_disruption',
        name: 'Monsoon Disruption',
        description: 'Severe monsoon causing flooding, displacement, and service disruption.',
        probability: 0.30,
        affectedDomains: ['health', 'economic'],
        modifier: -0.5,
        isPersistent: false,
        duration: 4
      },
      {
        id: 'state_implementation_variance',
        name: 'State Implementation Variance',
        description: 'Different states implement programs with varying effectiveness.',
        probability: 0.80,
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic', 'environmental'],
        modifier: 1.0, // Can be positive or negative
        isPersistent: true,
        duration: null,
        note: 'Creates ±1.0 variance rather than pure negative'
      }
    ]
  },

  Cameroon: {
    name: "Cameroon",
    id: "CM",
    flag: "🇨🇲",
    coordinates: [12.3547, 7.3697],
    
    dimensions: { PDI: 80, IDV: 20, MAS: 50, UAI: 60, LTO: 30, IVR: 30 },
    
    // Research-backed baseline wellbeing - crisis context
    wellbeing: {
      health: 38,        // Conflict destroying infrastructure, high disease burden
      psychological: 35, // Trauma, displacement, GBV
      social: 42,        // Community disruption, 2.1M displaced
      civic: 32,         // Trust collapse in conflict zones
      economic: 40,      // Conflict impact, negative coping mechanisms
      environmental: 48  // Climate shocks, flooding
    },
    
    stressor: "Multiple Simultaneous Crises",
    stressorDetail: "Anglophone conflict (since 2016), Lake Chad Basin instability, CAR refugee crisis. 4.3M people need humanitarian aid (1 in 6). 200+ health facilities destroyed. 41% of schools non-functional in conflict zones.",
    context: "Very High Power Distance and Collectivism. Chiefs and elders critical to legitimacy. Traditional 'palaver' consensus-building expected.",
    
    contextFactors: {
      institutionalTrust: 0.30,        // Very low in conflict areas
      culturalOpenness: 0.55,
      implementationCapacity: 0.35,    // Severely constrained
      civilSocietyStrength: 0.50,      // NGOs active but access limited
      conflictLevel: 0.75,             // Active armed conflict
      economicStability: 0.40,
      digitalReadiness: 0.25
    },
    
    culturalInsights: [
      "Very High PDI (80): Chiefs and elders must endorse initiatives for adoption",
      "High Collectivism (IDV 20): Programs must benefit the community, not just individuals",
      "Traditional palaver system: Consensus-building through community dialogue expected",
      "Deep mistrust of central government in conflict zones"
    ],
    
    blueprint: {
      name: "National Health ID Cards",
      type: "Bureaucratic",
      desc: "Mandatory digital ID for all health access, managed by central government.",
      fitScore: 0.2,
      whyBad: "Deep mistrust of central government in conflict zones. Excludes displaced populations without documentation."
    },
    
    probes: [
      {
        id: 1,
        name: "CHW Mobile Clinics",
        type: "Health",
        desc: "Community Health Workers delivering basic care through mobile services reaching conflict-affected areas.",
        evidenceSource: "OCHA 2024",
        evidenceNote: "1.2M reached in 2023, but 1.8M still need emergency health assistance. Only 33% of health response funded.",
        confidence: "high",
        baseFit: 0.80,
        status: "active",
        culturalFit: "Community-embedded workers build trust; mobile approach adapts to insecurity.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 2.5,
          psychological: 1.5,
          social: 1.5,
          economic: 0.5,
          civic: 0.5,
          environmental: 0
        },
        lagMonths: { min: 3, max: 6 },
        lesson: "Community health workers can maintain services where formal systems cannot reach."
      },
      {
        id: 2,
        name: "UHC Registration",
        type: "Policy",
        desc: "Universal Health Coverage enrollment providing access to basic health services.",
        evidenceSource: "Borgen Project 2025",
        evidenceNote: "3M+ registered by Dec 2024, 400K+ with free HIV access. Progress despite conflict.",
        confidence: "medium",
        baseFit: 0.65,
        status: "active",
        culturalFit: "Universal approach appeals to collectivist values; implementation challenged by conflict.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 2.0,
          psychological: 1.0,
          social: 1.0,
          economic: -0.5,  // Implementation cost
          civic: 1.0,
          environmental: 0
        },
        lagMonths: { min: 6, max: 12 },
        lesson: "Health coverage can expand even in crisis with strong political will."
      },
      {
        id: 3,
        name: "Malaria Vaccination",
        type: "Health",
        desc: "First country malaria vaccine rollout targeting children under 5.",
        evidenceSource: "Gov data 2024",
        evidenceNote: "47% coverage achieved by Dec 2024. Cameroon was first country to introduce routine malaria vaccination.",
        confidence: "high",
        baseFit: 0.78,
        status: "active",
        culturalFit: "Child health universally valued; vaccination culturally accepted.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 3.0,
          psychological: 0.5,
          social: 0.5,
          economic: 1.0,  // Reduced disease burden
          civic: 0.5,
          environmental: 0
        },
        lagMonths: { min: 3, max: 6 },
        lesson: "Vaccination programs can succeed in conflict when integrated with trusted health systems."
      },
      {
        id: 4,
        name: "GBV Response Services",
        type: "Protection",
        desc: "Gender-Based Violence case management, psychosocial support, and safe spaces for survivors.",
        evidenceSource: "IOM 2024",
        evidenceNote: "Critical need in displacement context. Services reaching fraction of those in need.",
        confidence: "medium",
        baseFit: 0.68,
        status: "active",
        culturalFit: "Challenging given gender norms but essential. Works best through women's groups.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 1.5,
          psychological: 2.5,
          social: 2.0,
          economic: 0.5,
          civic: 1.0,
          environmental: 0
        },
        lagMonths: { min: 3, max: 6 },
        lesson: "GBV services require sustained presence and community trust to be effective."
      },
      {
        id: 5,
        name: "Education in Emergencies",
        type: "Education",
        desc: "Maintaining schooling in conflict-affected areas through temporary learning spaces and teacher support.",
        evidenceSource: "EU 2024",
        evidenceNote: "59% of schools functional in NW-SW (improved from 46% in 2022). Slow but real progress.",
        confidence: "medium",
        baseFit: 0.72,
        status: "active",
        culturalFit: "Education highly valued; community protection of schools possible when elders engaged.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 0.5,
          psychological: 2.0,
          social: 2.5,
          economic: 1.0,
          civic: 1.5,
          environmental: 0
        },
        lagMonths: { min: 6, max: 12 },
        lesson: "Education can continue in conflict with community protection and flexible approaches."
      },
      {
        id: 6,
        name: "WASH Services",
        type: "Infrastructure",
        desc: "Water, Sanitation, and Hygiene services for displaced and host communities.",
        evidenceSource: "OCHA 2024",
        evidenceNote: "Essential service showing rapid impact on health outcomes when implemented.",
        confidence: "high",
        baseFit: 0.82,
        status: "active",
        culturalFit: "Universal need. Community-based management builds ownership.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic', 'environmental'],
        effectWeights: {
          health: 2.5,
          psychological: 1.0,
          social: 1.5,
          economic: 0.5,
          civic: 0.5,
          environmental: 2.0
        },
        lagMonths: { min: 1, max: 3 },
        lesson: "WASH infrastructure shows fastest impact on community health of any intervention."
      },
      {
        id: 7,
        name: "Peacebuilding Dialogue",
        type: "Governance",
        desc: "Community reconciliation initiatives bringing together conflict parties through traditional dialogue.",
        evidenceSource: "IOM 2024",
        evidenceNote: "Limited evidence of effectiveness at scale. Works in specific local contexts.",
        confidence: "low",
        baseFit: 0.55,
        status: "active",
        culturalFit: "Aligns with traditional palaver system but conflict dynamics limit effectiveness.",
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic'],
        effectWeights: {
          health: 0.5,
          psychological: 1.5,
          social: 2.0,
          economic: 0.5,
          civic: 3.0,
          environmental: 0
        },
        lagMonths: { min: 12, max: 24 },
        lesson: "Peacebuilding requires addressing root causes, not just facilitating dialogue."
      }
    ],
    
    // HIGH FREQUENCY risk events for conflict context
    riskEvents: [
      {
        id: 'conflict_escalation',
        name: 'Conflict Escalation',
        description: 'Increase in armed violence disrupting all services and displacing populations.',
        probability: 0.50,
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic', 'environmental'],
        modifier: -2.5,  // Severe impact
        isPersistent: false,
        duration: 6,
        note: 'Can cause -2.0 to -3.0 depending on severity'
      },
      {
        id: 'access_constraints',
        name: 'Access Constraints/Lockdowns',
        description: 'Security situations preventing humanitarian access to affected populations.',
        probability: 0.70,
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic', 'environmental'],
        modifier: -1.5,
        isPersistent: false,
        duration: 3,
        note: 'Reduces effectiveness of all interventions by limiting reach'
      },
      {
        id: 'displacement_surge',
        name: 'Displacement Surge',
        description: 'New wave of internal displacement straining services and host communities.',
        probability: 0.40,
        affectedDomains: ['social', 'health'],
        modifier: -1.0,
        isPersistent: false,
        duration: 6
      },
      {
        id: 'funding_discontinuity',
        name: 'Funding Discontinuity',
        description: 'International funding gaps or delays affecting program continuity.',
        probability: 0.60,
        affectedDomains: ['health', 'psychological', 'social', 'economic', 'civic', 'environmental'],
        modifier: -1.0,
        isPersistent: false,
        duration: 6,
        note: 'Only 33% of health response currently funded'
      },
      {
        id: 'ied_attack',
        name: 'IED/Attack Event',
        description: 'Direct attack on health facilities, schools, or humanitarian workers.',
        probability: 0.25,
        affectedDomains: ['health', 'psychological'],
        modifier: -2.0,
        isPersistent: false,
        duration: 3
      }
    ]
  }
};

export default COUNTRIES;
