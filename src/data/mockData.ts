import { 
  IdeaValidationResult, 
  CompetitorAnalysisResult, 
  MarketResearchResult, 
  RevenueModelResult, 
  ScorecardResult, 
  BusinessPlanResult, 
  PitchDeckResult, 
  RoadmapResult, 
  InvestorDiscoveryResult, 
  LeanCanvasResult, 
  UnicornPredictorResult,
  StartupState
} from "../types";

export const defaultStartup: StartupState = {
  name: "Nebula Health AI",
  description: "An autonomous, space-grade medical monitoring and real-time biometric diagnostic platform using non-invasive laser spectroscopy and micro-sensors for remote clinical triage.",
  industry: "HealthTech & DeepTech",
  targetAudience: "Private spaceflight companies, defense agencies, and premium offshore enterprise clinics",
  problemStatement: "Biometric monitoring in zero-gravity or extreme remote environments is delayed, prone to error, and relies on bulky equipment that cannot perform instant diagnostic triage.",
  region: "Global & Low Earth Orbit"
};

export const defaultValidation: IdeaValidationResult = {
  feasibilityAnalysis: "Nebula Health AI presents an extraordinarily strong technical feasibility. Non-invasive laser spectroscopy has achieved clinical-grade accuracy in bench tests, and micro-sensor integration aligns with current nanotechnology developments. The primary bottleneck lies in regulatory aerospace certification (FDA/FAA cross-clearance), but the high-margin market makes this a highly viable endeavor.",
  strengths: [
    "Pioneering technology with massive intellectual property defensibility (Spectroscopy-biometrics mesh).",
    "Extremely high-margin unit economics targeting premium aerospace and military clients.",
    "First-mover advantage in space medicine diagnostics as commercial spaceflight scales."
  ],
  weaknesses: [
    "Extended regulatory and aerospace compliance certification cycles (18-24 months).",
    "High initial research & development and lab testing capital expenditures.",
    "Specialized hiring requirements in quantum sensing and aerospace immunology."
  ],
  opportunities: [
    "Rapidly growing commercial spaceflight market (SpaceX, Axiom, Blue Origin scaling).",
    "Secondary spin-off application in military field operations and deep-sea exploration.",
    "Licensing telemetry algorithms to consumer smartwatch companies for massive passive revenue."
  ],
  risks: [
    "Regulatory approval delays leading to capital exhaustion before product launch.",
    "Competitors in military bio-tech releasing alternative wrist-based wearable trackers.",
    "Sensor drift under extreme G-force variations violating telemetry standards."
  ],
  validationScore: 89,
  marketDemandScore: 92,
  successProbability: 84,
  opportunityScore: 95,
  recommendedNextSteps: [
    "Initiate aerospace-grade micro-sensor bench testing and finalize initial optical specs.",
    "Secure preliminary letters of intent (LOI) from private space operators to validate B2B demand.",
    "Partner with an FDA pre-market clinical advisor specializing in remote telemedicine metrics.",
    "Compile intellectual property filing for the core laser spectroscopic telemetry array."
  ]
};

export const defaultCompetitors: CompetitorAnalysisResult = {
  competitors: [
    {
      name: "BioAstral Telemetry",
      type: "Direct",
      features: ["Space station bio-harnesses", "ECG telemetry", "Delayed database sync"],
      pricing: "$150,000/station/year",
      strength: "NASA vendor relationships, proven flight heritage.",
      weakness: "Relies on bulky wearable chest straps; no real-time AI-based diagnostic triage."
    },
    {
      name: "AeroPulse Clinical",
      type: "Indirect",
      features: ["Military field wearables", "Oxygen saturation telemetry", "Basic mobile UI"],
      pricing: "$2,500/device + cloud subscription",
      strength: "Heavy defense funding, shockproof military certifications.",
      weakness: "Limited to earthly atmospheric conditions; does not compute complex metabolic bio-markers."
    },
    {
      name: "Orion Sensing",
      type: "Emerging",
      features: ["Non-invasive sweat sensors", "NFC patch connection", "Basic AI trends"],
      pricing: "Freemium patch + $49/month B2B SaaS",
      strength: "Low-cost high-volume model, comfortable patch form factor.",
      weakness: "Low telemetry range; patch adhesives fail under intense humidity and g-forces."
    }
  ],
  swot: {
    strengths: "IP defensibility, non-invasive proprietary laser sensing, and real-time edge AI diagnostics.",
    weaknesses: "High initial hardware prototyping cost, lack of immediate space flight heritage.",
    opportunities: " Commercial space station expansion, remote offshore drilling health insurance cost reductions.",
    threats: "Large consumer tech giants (Apple, Garmin) releasing military-grade biometric upgrades."
  },
  gapAnalysis: "Current competitors are heavily reliant on physically invasive electrodes or simple surface thermal wear. Nebula Health AI fills a critical clinical vacuum by combining laser-based non-invasive optical telemetry with instant edge-computing diagnostics, eliminating physical connection wires and lag completely.",
  positioning: [
    { name: "Nebula Health AI", innovation: 95, marketShare: 15 },
    { name: "BioAstral Telemetry", innovation: 65, marketShare: 70 },
    { name: "AeroPulse Clinical", innovation: 75, marketShare: 55 },
    { name: "Orion Sensing", innovation: 80, marketShare: 25 }
  ]
};

export const defaultMarket: MarketResearchResult = {
  tam: 18200, // $18.2B remote monitoring
  sam: 4100,  // $4.1B premium aerospace + defense
  som: 850,   // $850M reachable commercial space flight & offshore clinical telemetry
  tamExplanation: "The total global remote biometric diagnostic, telemedicine, and premium spaceflight health monitoring market, forecasted to reach $18.2 Billion by 2029.",
  samExplanation: "The addressable segment within specialized high-altitude aviation, defense contractor systems, commercial orbital spaceports, and deep-sea hyperbaric stations.",
  somExplanation: "Our highly targeted launch customer segment: private space ventures (SpaceX, Axiom), elite defense research divisions, and ultra-high-net-worth deep exploration crews.",
  industryTrends: [
    "Exponential commercialization of low Earth orbit (LEO) with commercial orbital habitats.",
    "Heavy military shift towards real-time AI-driven field triage telemetry over standard static tracking.",
    "Widespread institutional adoption of decentralized optical and laser-based diagnostic sensors."
  ],
  marketGrowth: "22.4% CAGR (2025 - 2030)",
  customerPersonas: [
    {
      name: "Commander Sarah Mercer",
      role: "Director of Space Operations, Commercial Habitat Corp",
      painPoints: [
        "Bulky diagnostic equipment eating up valuable spacecraft weight and cargo volume.",
        "Diagnostic telemetry lag from orbit to terrestrial medical centers.",
        "Astronaut crew fatigue from wearing continuous physical electrode straps."
      ],
      gains: [
        "100% wireless, zero-weight-impact non-invasive medical diagnostics.",
        "Instant orbital edge AI alerts flagging arrhythmia or atmospheric blood hypoxia.",
        "Drastic improvement in crew comfort and mission compliance rates."
      ]
    },
    {
      name: "Colonel Raymond Vance",
      role: "Lead Medical Architect, Special Operations Command",
      painPoints: [
        "Field telemetry failures due to dust, sweat, and physical wear.",
        "Combat triage bottlenecks when dealing with multi-casualty remote operations."
      ],
      gains: [
        "Solid-state optical sensor that does not fail under extreme battlefield elements.",
        "Autonomous triage software highlighting critical casualties on the HUD immediately."
      ]
    }
  ],
  userPainPoints: [
    "Electrode wear irritation and skin degradation during long-term confinement.",
    "Hardware lag and server dependency for core life-saving diagnostics.",
    "Inefficient remote triage requiring expensive real-time medical staff standby."
  ],
  futureOpportunities: [
    "Developing neonatal incubator laser diagnostic units.",
    "Licensing specialized biometric telemetry to hypersonic premium airlines.",
    "Creating an open-source clinical diagnostic protocol for the global aerospace community."
  ]
};

export const defaultRevenue: RevenueModelResult = {
  suggestedModels: [
    {
      modelName: "B2B Aerospace SaaS + HW Licensing",
      pros: [
        "Highly recurring multi-year contracts with aerospace operators.",
        "Combines solid upfront hardware licensing with sticky monthly diagnostic fees.",
        "Massive B2B expansion capability per astronaut/mission."
      ],
      cons: [
        "Long procurement cycles typical in high-altitude B2B transactions.",
        "Hardware manufacturing scaling requires upfront capital injection."
      ],
      revenuePotential: "High",
      pricingStrategy: "$15,000 / spacecraft / month + $85,000 upfront hardware sensing array licensing fee.",
      monetizationRoadmap: [
        "Phase 1: Deploy beta hardware kits with 2 spaceflight testing partners (Zero-upfront SaaS trial).",
        "Phase 2: Formalize commercial spacecraft licensing, charging baseline monthly diagnostics.",
        "Phase 3: Roll out global military and maritime enterprise tier with active-telemetry tracking."
      ]
    },
    {
      modelName: "Direct Defense Enterprise Integration",
      pros: [
        "Massive contract sizes ($10M+ government allocations).",
        "Extremely high customer retention rate once integrated into defensive infrastructure.",
        "Provides massive validation that fuels secondary commercial sales."
      ],
      cons: [
        "Requires intensive classified clearance compliance protocols.",
        "Custom development requests can distract core product roadmap."
      ],
      revenuePotential: "High",
      pricingStrategy: "$2.5M annually for full division licensing, custom secure field servers, and unrestricted telemetry integrations.",
      monetizationRoadmap: [
        "Phase 1: Apply for defense innovation grants and build specialized field-tested telemetry kits.",
        "Phase 2: Establish dedicated air-gapped on-prem diagnostic server instances.",
        "Phase 3: Standardize the software into command and control software suites."
      ]
    }
  ],
  pricingSimulatorConfig: {
    basePrice: 12000,
    growthFactor: 1.15
  }
};

export const defaultScorecard: ScorecardResult = {
  innovation: 96,
  scalability: 88,
  demand: 90,
  competition: 85,
  profitability: 92,
  investmentPotential: 95,
  overallScore: 91,
  dnaAnalysis: {
    innovationDNA: "Pioneering laser spectroscopy metrics combined with biometric machine learning. Extreme IP protection.",
    marketDNA: "Niche high-value market expanding directly alongside commercial spaceflight and high-risk field exploration.",
    founderDNA: "Requires deep-tech multidisciplinary expertise across photonics, clinical medicine, and aerospace systems.",
    productDNA: "Solid-state, non-contact wearable or near-contact diagnostic hub. High-tech, robust, premium hardware-software hybrid."
  }
};

export const defaultBusinessPlan: BusinessPlanResult = {
  executiveSummary: "Nebula Health AI is the premier deep-tech health operating system for extreme commercial, space, and military environments. By replacing traditional contact-based medical telemetry with high-accuracy non-invasive laser spectroscopy, Nebula enables absolute biometric monitoring without physical constraints or communication lag. Operating at the intersection of commercial space commercialization and autonomous healthcare, the company is positioned to capture early dominance in the premium $18.2B remote monitoring clinical sector.",
  companyOverview: "Founded by a specialized team of clinical photonics engineers and former aerospace flight surgeons, Nebula Health AI builds solid-state diagnostic hardware and edge AI software models designed to measure real-time blood metrics, metabolic parameters, and heart-rate variability completely non-invasively.",
  missionStatement: "To secure human life and vital clinical visibility across the solar system, providing wireless medical diagnostics where earthly infrastructure cannot reach.",
  visionStatement: "To become the standard medical operating system powering every spaceship, exploration habitat, and critical field operation on Earth and beyond.",
  productOverview: "Our solution consists of the 'Nebula Hub'-an optical laser transceiver that maps biometrics at a distance of up to 3 meters-and the 'Nebula Core' diagnostic neural network which processes optical scatter telemetry locally, outputting clinical-grade blood oxygenation, heart rate, and metabolic fatigue indicators.",
  marketAnalysis: "With commercial space habitats scaling rapidly and military operations demanding real-time vitals tracking, the premium tele-healthcare sector is experiencing a massive transition towards solid-state sensors that eliminate skin-adhesive failures under harsh conditions.",
  customerSegments: [
    "Commercial spaceflight capsule and habitat operators.",
    "Specialized defense research groups (DARPA, SOCOM, NATO).",
    "Extreme-environment commercial ventures (deep-sea rigs, hyperbaric operations, polar research stations)."
  ],
  marketingStrategy: "Establish heavy technical validation through peer-reviewed aerospace publications, followed by high-profile pilot flight trials with commercial space stations and defense agencies.",
  salesStrategy: "High-touch direct enterprise sales. Deploy custom evaluation telemetry kits, secure multi-year SaaS agreements, and scale pricing based on active spacecraft or deployed field personnel counts.",
  operationalPlan: "Our hardware manufacturing is outsourced to ISO-13485 medical-certified precision electronics partners. Software development, diagnostic telemetry model training, and regulatory FDA verification are handled by our core distributed engineering team.",
  financialPlan: "We target a break-even milestone in Month 24, supported by an initial $2.5M seed round. Key drivers of profitability include hardware-software hybrid licensing fees which maintain a composite 84% gross margin.",
  growthStrategy: "Phase 1: Low Earth Orbit validation. Phase 2: Horizontal terrestrial expansion into premium commercial aviation, nuclear power facilities, and elite professional athletics. Phase 3: Launch of the open-source global biometric telemetry standard.",
  riskAnalysis: "The primary risks are FDA clearance delays and custom micro-sensor chip component shortages. We mitigate these risks through dual-sourcing hardware components and obtaining early institutional IRB testing approvals."
};

export const defaultPitchDeck: PitchDeckResult = {
  slides: [
    {
      number: 1,
      title: "Nebula Health AI",
      subtitle: "The Medical Operating System for commercial space, defense, and deep exploration.",
      bulletPoints: [
        "Non-invasive laser medical diagnostic telemetry.",
        "Clinical-grade blood & cardiac vitals from 3 meters away.",
        "Edge-computing diagnostic triage with zero signal delay."
      ],
      designSuggestion: "Clean, ultra-premium dark slide featuring a soft glowing holographic heart orb in the center. Space Black background with luxury gold typography.",
      type: "Cover"
    },
    {
      number: 2,
      title: "The Biometric Lag Problem",
      subtitle: "Current medical telemetry fails in extreme environments.",
      bulletPoints: [
        "Traditional electrodes require sticky gels and wires that fail under intense sweat and g-forces.",
        "Wearable watches lose contact easily, providing unreliable, noisy telemetry data.",
        "Real-time diagnostic analysis currently relies on heavy server connections, creating lethal lag in remote regions."
      ],
      designSuggestion: "High-contrast visual showing a side-by-side comparison of cluttered physical wires versus clean, modern spaceflight cabins.",
      type: "Problem"
    },
    {
      number: 3,
      title: "The Laser Spectroscopic Solution",
      subtitle: "Continuous clinical telemetry without physical contact.",
      bulletPoints: [
        "Nebula Hub: Solid-state laser transceivers projecting non-invasive biometric spectroscopy.",
        "Biometric Mesh: Instant edge-AI tracking mapping blood oxygen, cardiac metrics, and glucose.",
        "Zero Cables, Zero Hassle: Clinical-grade telemetry completely integrated into cabin surfaces."
      ],
      designSuggestion: "A visual simulation of an elegant, sleek sensor emitting subtle, luxury electric-blue light rays onto a clean human outline.",
      type: "Solution"
    },
    {
      number: 4,
      title: "The Commercial Orbit Scale",
      subtitle: "Commercial spaceports, defense, and maritime are booming.",
      bulletPoints: [
        "TAM: $18.2 Billion remote medical diagnostic sector.",
        "SAM: $4.1 Billion specialized aerospace & defense contracting.",
        "SOM: $850 Million launch sector targeting commercial LEO capsules and deep maritime rigs."
      ],
      designSuggestion: "Visual TAM/SAM/SOM bento-grid visualization with high-tech progress bars glowing in neon cyan.",
      type: "Market Opportunity"
    },
    {
      number: 5,
      title: "The Business Model Matrix",
      subtitle: "Compounding high-margin B2B hardware-software contracts.",
      bulletPoints: [
        "Baseline Upfront Licensing: $85,000 per vessel or command center for custom sensor hardware calibration.",
        "Recurring Diagnostic SaaS: $15,000 per active craft/month for diagnostic AI processing and continuous telemetry cloud updates.",
        "Target Gross Margins: Composite 84% gross margins driven by scaling software volume."
      ],
      designSuggestion: "Clean pricing matrix card layout with a subtle glass reflection effect.",
      type: "Business Model"
    }
  ]
};

export const defaultRoadmap: RoadmapResult = {
  plan30Days: [
    {
      title: "IP Protection & Optical Design",
      description: "File provisional utility patents for the laser spectroscopic sensor mesh and lock in initial custom optical lens manufacturers.",
      kpis: ["Utility patent filed", "Optical supplier contract signed"]
    },
    {
      title: "Terrestrial Prototyping",
      description: "Assemble the first solid-state bench prototype to measure blood oxygenation on static human test targets with 95% clinical accuracy.",
      kpis: ["Optical calibration complete", "95% accuracy achieved in lab environment"]
    }
  ],
  plan90Days: [
    {
      title: "Seed Capital Closing",
      description: "Secure the first $2.5M seed funding round from specialized aerospace and deep-tech venture capital firms.",
      kpis: ["$2.5M capital deposited", "Core photonics hires completed"]
    },
    {
      title: "Letters of Intent (LOIs)",
      description: "Secure at least two non-binding commercial space station pilot trial agreements.",
      kpis: ["2 B2B LOIs executed"]
    }
  ],
  plan6Months: [
    {
      title: "Zero-G Test Flight Validation",
      description: "Conduct active telemetry micro-gravity validation trials on suborbital commercial flights.",
      kpis: ["Suborbital flight test logs", "Sensor calibration verified in zero-g environment"]
    },
    {
      title: "FDA Pre-Submission Review",
      description: "Submit core medical telemetry software algorithms for initial FDA pre-market clinical consultations.",
      kpis: ["FDA pre-sub file submitted", "Assigned regulatory lead officer"]
    }
  ],
  plan1Year: [
    {
      title: "Commercial Launch",
      description: "Officially install the first commercial Nebula Hub units on commercial space habitats and close active SaaS billing.",
      kpis: ["3 operational spacecraft installed", "$45,000 Monthly Recurring Revenue reached"]
    }
  ]
};

export const defaultInvestors: InvestorDiscoveryResult = {
  investors: [
    {
      name: "Nebula Ventures (Aerospace & DeepTech)",
      type: "Venture Capital",
      focusAreas: ["DeepTech", "Commercial Space", "Biotechnology"],
      fundingStage: "Seed & Series A",
      range: "$500K - $3.5M"
    },
    {
      name: "Starship Catalyst (SpaceTech & Frontier Capital)",
      type: "Venture Capital",
      focusAreas: ["Frontier Tech", "Orbital Logistics", "Remote Telemetry"],
      fundingStage: "Pre-Seed & Seed",
      range: "$250K - $1.5M"
    },
    {
      name: "Dr. Catherine Thorne",
      type: "Angel",
      focusAreas: ["HealthTech", "Optical Sensors", "Autonomous Health Systems"],
      fundingStage: "Pre-Seed",
      range: "$50K - $300K"
    },
    {
      name: "Apex Frontier Lab",
      type: "Accelerator",
      focusAreas: ["DeepTech hardware", "SaaS platforms", "Government procurement"],
      fundingStage: "Inception Program",
      range: "$150K upfront equity + $500K cloud credits"
    }
  ]
};

export const defaultLeanCanvas: LeanCanvasResult = {
  problem: [
    "Traditional diagnostic electrodes fail during sweat and movement.",
    "Data lag in remote or orbital stations prevents instant medical triage.",
    "Expensive medical hardware takes up crucial payload weight."
  ],
  solution: [
    "Proprietary non-contact laser spectroscopic diagnostic transceiver.",
    "Edge AI algorithms processing clinical vitals locally in real-time.",
    "Solid-state, zero-contact hardware sensor integrated into cabins."
  ],
  keyMetrics: [
    "Vitals diagnostic accuracy vs. clinical gold standard ECG devices.",
    "Active spacecraft or operational field personnel count.",
    "Monthly Recurring SaaS Revenue growth rate."
  ],
  uniqueValueProposition: "The only zero-contact, wireless clinical medical diagnostic OS for commercial aerospace, deep-tech defense, and remote telemetry habitats.",
  customerSegments: [
    "Commercial space station habitat builders.",
    "Defense research and military telemedicine units.",
    "Offshore commercial maritime vessels & polar bases."
  ],
  channels: [
    "Direct technical enterprise sales.",
    "Joint validation publications in military/aerospace journals.",
    "DeepTech industry conferences and government agency demos."
  ],
  revenueStreams: [
    "$85,000 Upfront Sensor Hardware Calibration & Licensing.",
    "$15,000 Monthly Active Spacecraft Telemetry & Analytics SaaS."
  ],
  costStructure: [
    "Specialized optical sensor engineering salaries.",
    "ISO-13485 clinical micro-sensor manufacturing setup.",
    "Regulatory aerospace and FDA clinical testing clearances."
  ]
};

export const defaultUnicornPredictor: UnicornPredictorResult = {
  growthPotential: "Highly parabolic. As the commercial space industry transitions from government monopoly to high-volume commercial tourism, Nebula is uniquely positioned as the sole certified developer of wireless, zero-weight-impact clinical diagnostics.",
  marketDominance: "Extremely strong. Backed by solid utility optical patents and military-grade hardware flight heritage, competitors will face high barriers to entry, giving Nebula a near-monopoly in the high-end orbital sector.",
  fundingPotential: "Investor-grade magnet. High-concept hardware combined with recurring multi-year SaaS contracts perfectly align with Tier 1 deep-tech VC investment models.",
  unicornScore: 94,
  confidenceLevel: 88,
  recommendations: [
    "Secure secondary intellectual patents covering consumer-wearable optical sensor drift.",
    "Establish direct clinical partnerships with national aerospace research labs to co-author papers.",
    "Keep standard micro-sensor blueprints fully modular to scale production costs rapidly."
  ]
};
