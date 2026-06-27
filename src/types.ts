export interface IdeaValidationResult {
  feasibilityAnalysis: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  risks: string[];
  validationScore: number;
  marketDemandScore: number;
  successProbability: number;
  opportunityScore: number;
  recommendedNextSteps: string[];
}

export interface Competitor {
  name: string;
  type: 'Direct' | 'Indirect' | 'Emerging';
  features: string[];
  pricing: string;
  strength: string;
  weakness: string;
}

export interface CompetitorAnalysisResult {
  competitors: Competitor[];
  swot: {
    strengths: string;
    weaknesses: string;
    opportunities: string;
    threats: string;
  };
  gapAnalysis: string;
  positioning: Array<{
    name: string;
    innovation: number;
    marketShare: number;
  }>;
}

export interface CustomerPersona {
  name: string;
  role: string;
  painPoints: string[];
  gains: string[];
}

export interface MarketResearchResult {
  tam: number; // in millions
  sam: number; // in millions
  som: number; // in millions
  tamExplanation: string;
  samExplanation: string;
  somExplanation: string;
  industryTrends: string[];
  marketGrowth: string;
  customerPersonas: CustomerPersona[];
  userPainPoints: string[];
  futureOpportunities: string[];
}

export interface RevenueModel {
  modelName: string;
  pros: string[];
  cons: string[];
  revenuePotential: 'High' | 'Medium' | 'Low';
  pricingStrategy: string;
  monetizationRoadmap: string[];
}

export interface RevenueModelResult {
  suggestedModels: RevenueModel[];
  pricingSimulatorConfig: {
    basePrice: number;
    growthFactor: number;
  };
}

export interface StartupDNA {
  innovationDNA: string;
  marketDNA: string;
  founderDNA: string;
  productDNA: string;
}

export interface ScorecardResult {
  innovation: number;
  scalability: number;
  demand: number;
  competition: number;
  profitability: number;
  investmentPotential: number;
  overallScore: number;
  dnaAnalysis: StartupDNA;
}

export interface BusinessPlanResult {
  executiveSummary: string;
  companyOverview: string;
  missionStatement: string;
  visionStatement: string;
  productOverview: string;
  marketAnalysis: string;
  customerSegments: string[];
  marketingStrategy: string;
  salesStrategy: string;
  operationalPlan: string;
  financialPlan: string;
  growthStrategy: string;
  riskAnalysis: string;
}

export interface PitchDeckSlide {
  number: number;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  designSuggestion: string;
  type: string;
}

export interface PitchDeckResult {
  slides: PitchDeckSlide[];
}

export interface RoadmapMilestone {
  title: string;
  description: string;
  kpis: string[];
}

export interface RoadmapResult {
  plan30Days: RoadmapMilestone[];
  plan90Days: RoadmapMilestone[];
  plan6Months: RoadmapMilestone[];
  plan1Year: RoadmapMilestone[];
}

export interface Investor {
  name: string;
  type: 'Angel' | 'Venture Capital' | 'Accelerator' | 'Incubator';
  focusAreas: string[];
  fundingStage: string;
  range: string;
}

export interface InvestorDiscoveryResult {
  investors: Investor[];
}

export interface LeanCanvasResult {
  problem: string[];
  solution: string[];
  keyMetrics: string[];
  uniqueValueProposition: string;
  customerSegments: string[];
  channels: string[];
  revenueStreams: string[];
  costStructure: string[];
}

export interface UnicornPredictorResult {
  growthPotential: string;
  marketDominance: string;
  fundingPotential: string;
  unicornScore: number;
  confidenceLevel: number;
  recommendations: string[];
}

export interface NameSuggestion {
  name: string;
  domain: string;
  tagline: string;
}

export interface NameGeneratorResult {
  suggestions: NameSuggestion[];
}

export interface MentorMessage {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
}

export interface StartupState {
  name: string;
  description: string;
  industry: string;
  targetAudience: string;
  problemStatement: string;
  region: string;
}
