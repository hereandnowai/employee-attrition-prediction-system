
import React from 'react';
import { HomeIcon, Squares2X2Icon, SettingsIcon } from './icons'; 
import type { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onLogoClick: () => void;
  onNavigateToHome: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  onLogoClick,
  onNavigateToHome,
  onNavigateToDashboard,
  onNavigateToSettings
}) => {
  
  let secondaryAction = null;

  if (currentView === 'employeeDetail' || currentView === 'settings') {
    secondaryAction = {
      label: 'Dashboard',
      handler: onNavigateToDashboard,
      icon: <Squares2X2Icon className="h-5 w-5 mr-2" />
    };
  } else if (currentView === 'dashboard') {
    secondaryAction = {
      label: 'Home',
      handler: onNavigateToHome,
      icon: <HomeIcon className="h-5 w-5 mr-2" />
    };
  }

  return (
    <header className="bg-[var(--header-bg)] shadow-lg sticky top-0 z-50 border-b border-[var(--brand-border-color)]">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="cursor-pointer" onClick={onLogoClick}>
            <img 
              src="https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png" 
              alt="HERE AND NOW AI Logo" 
              className="h-10 md:h-12" 
            />
          </div>
          {secondaryAction && (
            <button
              onClick={secondaryAction.handler}
              className="hidden sm:flex items-center px-4 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-[var(--brand-text-on-primary)] font-semibold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--brand-focus-ring)] focus:ring-opacity-75"
              aria-label={`Go to ${secondaryAction.label}`}
            >
              {secondaryAction.icon}
              {secondaryAction.label}
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
           {secondaryAction && (
             <button
              onClick={secondaryAction.handler}
              className="sm:hidden flex items-center p-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-[var(--brand-text-on-primary)] font-semibold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--brand-focus-ring)] focus:ring-opacity-75"
              aria-label={`Go to ${secondaryAction.label}`}
            >
              {secondaryAction.icon}
            </button>
           )}
          <button
            onClick={onNavigateToSettings}
            className="p-2 text-[var(--brand-accent-text)] hover:text-[var(--brand-primary-dark)] rounded-full hover:bg-[var(--brand-secondary-light)] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--brand-focus-ring)] focus:ring-offset-2 focus:ring-offset-[var(--header-bg)]"
            aria-label="Open Settings"
          >
            <SettingsIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
