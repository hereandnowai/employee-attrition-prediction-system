
import React from 'react';
import { FeatureCard } from './FeatureCard';
import { 
  DatabaseIcon, AiBrainIcon, ClipboardListIcon, Squares2X2Icon, 
  TargetIcon, BellIcon, CheckBadgeIcon, DocumentTextIcon, ArrowRightIcon
} from './icons';

interface HomePageProps {
  onNavigateToDashboard: () => void;
}

const features = [
  { 
    title: "Data Collection & Integration", 
    description: "Aggregate diverse HR data sources (demographics, performance, engagement, etc.) for a comprehensive employee view.", 
    icon: <DatabaseIcon /> 
  },
  { 
    title: "Predictive Analytics Engine", 
    description: "Utilize ML models (classification, regression) to forecast attrition risk, predict departure timelines, and identify key drivers.", 
    icon: <AiBrainIcon />
  },
  { 
    title: "Key Attrition Factors Analysis", 
    description: "Analyze and weight critical elements like job satisfaction, compensation, work-life balance, career growth, and manager relations.", 
    icon: <ClipboardListIcon />
  },
  { 
    title: "Real-Time Monitoring Dashboard", 
    description: "Interactive visualizations show risk heatmaps, individual scores, retention KPIs, and historical trends.", 
    icon: <Squares2X2Icon /> 
  },
  { 
    title: "Targeted Retention Strategies", 
    description: "AI-powered, personalized recommendations: compensation adjustments, flexible work, mentoring, and upskilling initiatives.", 
    icon: <TargetIcon />
  },
  { 
    title: "Automated Alert System", 
    description: "Timely notifications for employees crossing risk thresholds, sudden engagement changes, or critical talent at high risk.", 
    icon: <BellIcon />
  },
  { 
    title: "Intervention Tracking & ROI", 
    description: "Monitor strategy effectiveness, track implementation, measure success rates, and calculate cost savings from prevented turnover.", 
    icon: <CheckBadgeIcon />
  },
  { 
    title: "Reporting & Analytics", 
    description: "Generate comprehensive reports: monthly risk assessments, departmental scorecards, model accuracy metrics, and executive summaries.", 
    icon: <DocumentTextIcon />
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToDashboard }) => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="text-center mb-10 md:mb-16">
        <img 
            src="https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png" 
            alt="HERE AND NOW AI Logo" 
            className="h-16 md:h-20 mx-auto mb-4" 
        />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-color-primary)] mb-3">
          Employee Attrition Prediction System
        </h1>
        <p className="text-lg sm:text-xl text-[var(--brand-accent-text)] italic mb-4">
          "designed with passion for innovation"
        </p>
        <p className="text-base sm:text-lg text-[var(--text-color-secondary)] max-w-2xl mx-auto mb-8">
          Proactively identify at-risk employees and implement data-driven retention strategies with <strong className="text-[var(--brand-primary)]">Caramel</strong>, your AI HR Assistant.
        </p>
        <button
          onClick={onNavigateToDashboard}
          className="inline-flex items-center justify-center px-8 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-[var(--brand-text-on-primary)] font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-150 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-focus-ring)] focus:ring-opacity-75 group"
        >
          Access Attrition Dashboard
          <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform duration-150 group-hover:translate-x-1" />
        </button>
      </div>

      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-[var(--text-color-primary)] mb-8 md:mb-12">Core Features & Capabilities</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <FeatureCard 
            key={feature.title} 
            title={feature.title} 
            description={feature.description} 
            icon={feature.icon}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
