
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon, description, index }) => {
  return (
    <div 
      className="bg-[var(--brand-bg-surface-alt)] p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center text-center animate-popIn border-2 border-[var(--brand-primary)]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="mb-4 text-[var(--brand-primary)]">
        {React.cloneElement(icon, { className: "w-10 h-10 md:w-12 md:h-12" })}
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2 text-[var(--text-color-primary)]">{title}</h3>
      <p className="text-sm text-[var(--text-color-secondary)] flex-grow leading-relaxed">{description}</p>
    </div>
  );
};
