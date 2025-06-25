
import React from 'react';
import { type RetentionStrategy } from '../types';
import { LightBulbIconMini } from './icons';

interface StrategyCardProps {
  strategy: RetentionStrategy;
  index: number;
}

export const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, index }) => {
  return (
    <div className="bg-[var(--brand-bg-surface-alt)] p-4 rounded-lg border border-[var(--brand-border-color-alt)] shadow-lg animate-fadeIn">
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] rounded-full p-2 mr-3">
          <LightBulbIconMini className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-[var(--brand-accent-text)]">{`Strategy ${index + 1}: ${strategy.title}`}</h4>
          <p className="text-sm text-[var(--text-color-secondary)] mt-1 whitespace-pre-wrap">{strategy.description}</p>
        </div>
      </div>
    </div>
  );
};
