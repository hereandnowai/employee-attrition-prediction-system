
import React, { useState, useCallback } from 'react';
import { type Employee, type RetentionStrategy, RiskLevel } from '../types';
import { geminiService } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import { AttritionFactorItem } from './AttritionFactorItem';
import { StrategyCard } from './StrategyCard';
import { 
  UserCircleIcon, ChartBarIcon, LightBulbIcon, ChevronLeftIcon, SparklesIcon, 
  InformationCircleIcon, AcademicCapIcon, ArchiveBoxIcon 
} from './icons'; 

interface EmployeeDetailViewProps {
  employee: Employee;
  onBack: () => void;
}

// Risk styles text colors (e.g., text-green-400) should be evaluated for contrast on light backgrounds.
// Opacity on bg (e.g., bg-green-500/10) should adapt well.
const getRiskStyles = (riskLevel: RiskLevel): { text: string; bg: string; border: string; accent: string } => {
  switch (riskLevel) {
    case RiskLevel.Low: return { text: 'text-green-500 dark:text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', accent: 'text-green-600 dark:text-green-500' };
    case RiskLevel.Medium: return { text: 'text-yellow-500 dark:text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', accent: 'text-yellow-600 dark:text-yellow-500' };
    case RiskLevel.High: return { text: 'text-red-500 dark:text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', accent: 'text-red-600 dark:text-red-500' };
    default: return { text: 'text-gray-500 dark:text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/30', accent: 'text-gray-600 dark:text-gray-500' };
  }
};


const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string; defaultOpen?: boolean }> = ({ title, icon, children, className, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`bg-[var(--brand-bg-surface)] border border-[var(--brand-border-color-alt)] rounded-xl shadow-xl ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 md:p-6 text-xl font-semibold text-[var(--text-color-primary)] focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          {icon}
          <h3 className="ml-2">{title}</h3>
        </div>
        <ChevronLeftIcon className={`w-5 h-5 transition-transform duration-200 ${isOpen ? '-rotate-90' : 'rotate-0'}`} />
      </button>
      {isOpen && (
        <div className="p-4 md:p-6 pt-0">
          {children}
        </div>
      )}
    </div>
  );
};


export const EmployeeDetailView: React.FC<EmployeeDetailViewProps> = ({ employee, onBack }) => {
  const [strategies, setStrategies] = useState<RetentionStrategy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const riskStyles = getRiskStyles(employee.riskLevel);

  const generateStrategies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setStrategies([]);
    try {
      const generatedStrategies = await geminiService.generateRetentionStrategies(employee);
      setStrategies(generatedStrategies);
    } catch (err) {
      console.error("Failed to generate strategies:", err);
      let errorMessage = "Failed to generate retention strategies. Please try again.";
      if (err instanceof Error && err.message.toLowerCase().includes("api key")) {
        errorMessage = "Failed to generate retention strategies due to an API key issue. Please check your configuration.";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [employee]);

  const attritionFactors = [
    { id: '1', name: 'Job Satisfaction', value: employee.jobSatisfaction, sentiment: employee.jobSatisfaction.toLowerCase().includes('low') || employee.jobSatisfaction.toLowerCase().includes('stagnant') ? 'Negative' : (employee.jobSatisfaction.toLowerCase().includes('high') ? 'Positive' : 'Neutral') },
    { id: '2', name: 'Compensation', value: employee.compensationConcern, sentiment: employee.compensationConcern.toLowerCase().includes('below') || employee.compensationConcern.toLowerCase().includes('underpaid') ? 'Negative' : (employee.compensationConcern.toLowerCase().includes('satisfied') || employee.compensationConcern.toLowerCase().includes('competitive') ? 'Positive' : 'Neutral') },
    { id: '3', name: 'Work-Life Balance', value: employee.workLifeBalanceIssue, sentiment: employee.workLifeBalanceIssue.toLowerCase().includes('poor') || employee.workLifeBalanceIssue.toLowerCase().includes('overtime') || employee.workLifeBalanceIssue.toLowerCase().includes('disruptive')? 'Negative' : (employee.workLifeBalanceIssue.toLowerCase().includes('excellent') || employee.workLifeBalanceIssue.toLowerCase().includes('good') ? 'Positive' : 'Neutral') },
    { id: '4', name: 'Career Growth', value: employee.careerGrowthConcern, sentiment: employee.careerGrowthConcern.toLowerCase().includes('unclear') || employee.careerGrowthConcern.toLowerCase().includes('stuck') || employee.careerGrowthConcern.toLowerCase().includes('limited') ? 'Negative' : (employee.careerGrowthConcern.toLowerCase().includes('clear path') || employee.careerGrowthConcern.toLowerCase().includes('potential for') ? 'Positive' : 'Neutral') },
    { id: '5', name: 'Manager Relationship', value: employee.managerRelationship, sentiment: employee.managerRelationship.toLowerCase().includes('strained') || employee.managerRelationship.toLowerCase().includes('difficult') ? 'Negative' : (employee.managerRelationship.toLowerCase().includes('excellent') || employee.managerRelationship.toLowerCase().includes('supportive') || employee.managerRelationship.toLowerCase().includes('positive') ? 'Positive' : 'Neutral') },
  ] as const;


  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-[var(--brand-accent-text)] hover:text-[var(--brand-primary-dark)] transition-colors duration-150 text-sm font-medium"
      >
        <ChevronLeftIcon className="w-5 h-5 mr-1" />
        Back to Dashboard
      </button>

      {/* Employee Header */}
      <div className={`p-6 rounded-xl shadow-xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 ${riskStyles.bg} border ${riskStyles.border}`}>
        <img src={employee.avatarUrl} alt={employee.name} className="w-24 h-24 rounded-full border-4 border-[var(--brand-secondary)] object-cover" />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-[var(--text-color-primary)]">{employee.name}</h2>
          <p className={`${riskStyles.accent} text-lg`}>{employee.role} - {employee.department} ({employee.team})</p>
          <div className={`mt-2 inline-block px-4 py-1.5 text-sm font-semibold rounded-full ${riskStyles.text} ${riskStyles.bg} border ${riskStyles.border}`}>
            Risk Score: {employee.riskScore}/100 ({employee.riskLevel})
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <Section title="Employee Profile" icon={<UserCircleIcon className="w-6 h-6 text-[var(--brand-accent-text)]" />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-[var(--text-color-secondary)]">
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Phone:</strong> {employee.phone}</p>
              <p><strong>Location:</strong> {employee.location}</p>
              <p><strong>Years at Company:</strong> {employee.yearsAtCompany}</p>
              <p><strong>Salary:</strong> ${employee.salary > 0 ? employee.salary.toLocaleString() : 'N/A (Contractor)'}</p>
              <p><strong>Last Review:</strong> {employee.lastReviewDate}</p>
              <p><strong>Hire Date:</strong> {employee.hireDate}</p>
              <p><strong>Reports To:</strong> {employee.reportsTo}</p>
              <p><strong>Preferred Work Style:</strong> {employee.preferredWorkStyle}</p>
            </div>
          </Section>

          <Section title="Performance & Engagement" icon={<ChartBarIcon className="w-6 h-6 text-[var(--brand-accent-text)]" />}>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-[var(--text-color-secondary)]">
              <p><strong>Performance Rating:</strong> {employee.performanceRating}/5</p>
              <p><strong>Engagement Score:</strong> {employee.engagementScore}/100</p>
              <p><strong>Training (Last Year):</strong> {employee.trainingHoursLastYear} hrs</p>
              <p><strong>Attendance Rate:</strong> {employee.attendanceRate}%</p>
              <div>
                <strong>Skills:</strong> 
                <div className="flex flex-wrap gap-2 mt-1">
                  {employee.skills.map(skill => <span key={skill} className="bg-[var(--brand-secondary-dark)] dark:bg-opacity-50 px-2 py-0.5 rounded text-xs text-[var(--brand-accent-text)]">{skill}</span>)}
                </div>
              </div>
               <div>
                <strong>Recent Achievements:</strong> 
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {employee.recentAchievements.map((ach, idx) => <li key={idx}>{ach}</li>)}
                </ul>
              </div>
              {employee.trainingCompleted && employee.trainingCompleted.length > 0 && (
                <div>
                  <strong>Training Completed:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {employee.trainingCompleted.map((course, idx) => <li key={idx}>{course}</li>)}
                  </ul>
                </div>
              )}
              {employee.trainingInProgress && employee.trainingInProgress.length > 0 && (
                <div>
                  <strong>Training In Progress:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {employee.trainingInProgress.map((course, idx) => <li key={idx}>{course}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </Section>
          
          <Section title="Key Attrition Factors" icon={<InformationCircleIcon className="w-6 h-6 text-[var(--brand-accent-text)]" />}>
            <div className="space-y-3">
              {attritionFactors.map(factor => (
                <AttritionFactorItem key={factor.id} factor={factor} />
              ))}
            </div>
          </Section>

          <Section title="Career & Development" icon={<AcademicCapIcon className="w-6 h-6 text-[var(--brand-accent-text)]" /> } defaultOpen={false}>
            <div className="space-y-4 text-sm text-[var(--text-color-secondary)]">
              {employee.careerGoals && employee.careerGoals.length > 0 && (
                <div>
                  <strong>Career Goals:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {employee.careerGoals.map((goal, idx) => <li key={idx}>{goal}</li>)}
                  </ul>
                </div>
              )}
              {employee.internalMobilityInterest && employee.internalMobilityInterest !== "None expressed" && (
                 <p><strong>Internal Mobility Interest:</strong> {employee.internalMobilityInterest}</p>
              )}
              {employee.peerFeedbackSummary && (
                <div>
                  <strong>Peer Feedback Summary:</strong>
                  <p className="mt-1 italic">"{employee.peerFeedbackSummary}"</p>
                </div>
              )}
            </div>
          </Section>

          <Section title="Historical Context" icon={<ArchiveBoxIcon className="w-6 h-6 text-[var(--brand-accent-text)]" />} defaultOpen={false}>
             <div className="space-y-4 text-sm text-[var(--text-color-secondary)]">
              {employee.previousRoles && employee.previousRoles.length > 0 && (
                <div>
                  <strong>Previous Roles (within company):</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {employee.previousRoles.map((roleItem, idx) => <li key={idx}>{roleItem.role} ({roleItem.duration})</li>)}
                  </ul>
                </div>
              )}
              {employee.exitInterviewNotes && (
                <div>
                  <strong>Relevant Exit Interview Notes (Similar Past Roles/Context):</strong>
                  <p className="mt-1 italic bg-[var(--brand-secondary-dark)] bg-opacity-30 dark:bg-opacity-50 p-2 rounded">{employee.exitInterviewNotes}</p>
                </div>
              )}
               {!employee.previousRoles?.length && !employee.exitInterviewNotes && (
                 <p>No specific historical data available for this employee in this context.</p>
               )}
            </div>
          </Section>

        </div>

        {/* Right Column: Strategies */}
        <div className="lg:col-span-1 space-y-6">
           <Section title="Retention Strategies" icon={<LightBulbIcon className="w-6 h-6 text-[var(--brand-accent-text)]" />} className="sticky top-24">
            <button
              onClick={generateStrategies}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-[var(--brand-text-on-primary)] font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" color="text-[var(--brand-text-on-primary)]" />
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Generate AI Strategies
                </>
              )}
            </button>
            {error && <p className="mt-4 text-sm text-red-700 dark:text-red-300 bg-red-500/10 dark:bg-red-500/20 p-3 rounded-md border border-red-500/30">{error}</p>}
            
            {strategies.length === 0 && !isLoading && !error && (
              <div className="mt-6 text-center text-[var(--text-color-muted)]">
                 <img src="https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel.jpeg" alt="Caramel AI Assistant" className="w-24 h-24 mx-auto mb-3 rounded-full opacity-80" />
                <p className="font-semibold text-[var(--text-color-secondary)]">I'm Caramel, your AI HR Strategist!</p>
                <p className="text-sm mt-1">Click the button above to generate personalized retention strategies for {employee.name.split(' ')[0]}.</p>
              </div>
            )}

            {strategies.length > 0 && (
              <div className="mt-6 space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2">
                {strategies.map((strategy, index) => (
                  <StrategyCard key={index} strategy={strategy} index={index} />
                ))}
              </div>
            )}
           </Section>
        </div>
      </div>
    </div>
  );
};
