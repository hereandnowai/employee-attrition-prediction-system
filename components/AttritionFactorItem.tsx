
import React from 'react';
import { type AttritionFactor } from '../types';
import { CheckCircleIconMini, ExclamationTriangleIconMini, MinusCircleIconMini } from './icons';

interface AttritionFactorItemProps {
  factor: AttritionFactor;
}

export const AttritionFactorItem: React.FC<AttritionFactorItemProps> = ({ factor }) => {
  const getSentimentStyles = () => {
    // Semantic colors for sentiment icons and titles are kept distinct
    switch (factor.sentiment) {
      case 'Positive':
        return { icon: <CheckCircleIconMini className="w-5 h-5 text-green-500 dark:text-green-400" />, text: 'text-green-600 dark:text-green-300' };
      case 'Negative':
        return { icon: <ExclamationTriangleIconMini className="w-5 h-5 text-red-500 dark:text-red-400" />, text: 'text-red-600 dark:text-red-300' };
      default: // Neutral
        return { icon: <MinusCircleIconMini className="w-5 h-5 text-gray-500 dark:text-gray-400" />, text: 'text-gray-600 dark:text-gray-300' };
    }
  };

  const sentimentStyles = getSentimentStyles();

  return (
    <div className="p-4 bg-[var(--brand-bg-surface-alt)] rounded-lg border border-[var(--brand-border-color-alt)]">
      <div className="flex items-start">
        <span className="mr-2.5 mt-0.5 flex-shrink-0">{sentimentStyles.icon}</span>
        <div>
          <h4 className={`font-semibold text-sm ${sentimentStyles.text}`}>{factor.name}</h4>
          <p className="text-xs text-[var(--text-color-secondary)] mt-1">{factor.value}</p>
        </div>
      </div>
    </div>
  );
};
