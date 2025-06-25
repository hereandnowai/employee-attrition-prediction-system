
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  color?: string; // Tailwind text color class e.g. text-[var(--brand-primary)]
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text, color }) => {
  const spinnerColor = color || 'text-[var(--brand-primary)]';
  
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-[6px]',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-solid ${spinnerColor} border-t-transparent`}
      ></div>
      {text && <p className={`text-sm ${spinnerColor}`}>{text}</p>}
    </div>
  );
};