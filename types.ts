
export enum RiskLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  avatarUrl: string;
  jobSatisfaction: string; 
  compensationConcern: string; 
  workLifeBalanceIssue: string; 
  careerGrowthConcern: string; 
  managerRelationship: string; 
  performanceRating: number; // 1-5
  engagementScore: number; // 1-100
  trainingHoursLastYear: number;
  yearsAtCompany: number;
  lastReviewDate: string;
  salary: number;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  recentAchievements: string[];
  attendanceRate: number; // 0-100 %

  // New detailed fields
  hireDate: string;
  reportsTo: string; // Manager's Name
  team: string;
  preferredWorkStyle: 'Remote' | 'Hybrid' | 'In-Office';
  internalMobilityInterest: string; // e.g., "Interested in Product Management roles", "None expressed"
  trainingCompleted: string[];
  trainingInProgress: string[];
  careerGoals: string[];
  peerFeedbackSummary: string; // Short qualitative summary
  exitInterviewNotes: string | null; // For hypothetical past similar roles or if info is available
  previousRoles: { role: string; duration: string }[]; // Roles within the company
}

export interface AttritionFactor {
  id: string;
  name: string;
  value: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

export interface RetentionStrategy {
  title: string;
  description: string;
}

export interface AppSettings {
  theme: 'dark' | 'light';
  notificationsEnabled: boolean;
  mockApiDelay: number; // in milliseconds
}

export type AppView = 'home' | 'dashboard' | 'employeeDetail' | 'settings';