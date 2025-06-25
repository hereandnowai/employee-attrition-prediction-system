
import React from 'react';
import { type Employee, RiskLevel } from '../types';
import { ArrowRightIcon } from './icons';

interface EmployeeCardProps {
  employee: Employee;
  onSelectEmployee: (employee: Employee) => void;
}

// Risk color classes remain semantic and should work on both light/dark card backgrounds
const getRiskColorClasses = (riskLevel: RiskLevel): { base: string, text: string, bgFill: string, border: string } => {
  switch (riskLevel) {
    case RiskLevel.Low:
      return { base: 'green-500', text: 'text-green-400', bgFill: 'bg-green-500', border: 'border-green-500/30' };
    case RiskLevel.Medium:
      return { base: 'yellow-500', text: 'text-yellow-400', bgFill: 'bg-yellow-500', border: 'border-yellow-500/30' };
    case RiskLevel.High:
      return { base: 'red-500', text: 'text-red-400', bgFill: 'bg-red-500', border: 'border-red-500/30' };
    default:
      return { base: 'slate-500', text: 'text-slate-300', bgFill: 'bg-slate-500', border: 'border-slate-600/30' };
  }
};

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onSelectEmployee }) => {
  const riskColors = getRiskColorClasses(employee.riskLevel);

  return (
    <div className="bg-[var(--brand-bg-surface)] rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden flex flex-col border border-[var(--brand-border-color-alt)]">
      <div className="p-6 flex-grow">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={employee.avatarUrl}
            alt={employee.name}
            className="w-16 h-16 rounded-full border-2 border-[var(--brand-secondary)] object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-[var(--text-color-primary)]">{employee.name}</h3>
            <p className="text-sm text-[var(--brand-accent-text)]">{employee.role}</p>
            <p className="text-xs text-[var(--text-color-muted)]">{employee.department}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-[var(--text-color-secondary)]">Risk Score</span>
            <span className={`text-sm font-bold ${riskColors.text}`}>{employee.riskScore}/100</span>
          </div>
          <div className="w-full bg-[var(--brand-bg-base)] opacity-50 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${riskColors.bgFill}`} 
              style={{ width: `${employee.riskScore}%` }}
            ></div>
          </div>
        </div>

        <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${riskColors.border} ${riskColors.text} bg-${riskColors.base}/20`}>
          {employee.riskLevel} Risk
        </div>
      </div>
      
      <button
        onClick={() => onSelectEmployee(employee)}
        className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-[var(--brand-text-on-primary)] font-semibold py-3 px-6 text-sm transition-colors duration-150 flex items-center justify-center space-x-2"
      >
        <span>View Details</span>
        <ArrowRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
