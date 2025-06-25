
import React, { useState, useCallback, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { DashboardPage } from './components/DashboardPage';
import { EmployeeDetailView } from './components/EmployeeDetailView';
import { SettingsPage } from './components/SettingsPage';
import { type Employee } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import type { AppView } from './types';
import { SETTINGS_STORAGE_KEY } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        const theme = JSON.parse(storedSettings).theme;
        if (theme === 'light') {
          document.documentElement.classList.add('light-theme');
        } else {
          document.documentElement.classList.remove('light-theme');
        }
      } else {
        document.documentElement.classList.remove('light-theme'); // Default to dark
      }
    } catch (error) {
      console.error("Failed to apply theme from localStorage in App.tsx:", error);
      document.documentElement.classList.remove('light-theme'); 
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleNavigateToHome = useCallback(() => {
    setCurrentView('home');
    setSelectedEmployee(null);
  }, []);

  const handleNavigateToDashboard = useCallback(() => {
    setCurrentView('dashboard');
    setSelectedEmployee(null);
  }, []);
  
  const handleNavigateToSettings = useCallback(() => {
    setCurrentView('settings');
    setSelectedEmployee(null);
  }, []);

  const handleSelectEmployee = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setCurrentView('employeeDetail');
  }, []);

  const handleBackToDashboardFromDetail = useCallback(() => {
    setCurrentView('dashboard');
    setSelectedEmployee(null);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onNavigateToDashboard={handleNavigateToDashboard} />;
      case 'dashboard':
        return <DashboardPage onSelectEmployee={handleSelectEmployee} />;
      case 'employeeDetail':
        if (selectedEmployee) {
          return <EmployeeDetailView employee={selectedEmployee} onBack={handleBackToDashboardFromDetail} />;
        }
        setCurrentView('dashboard'); 
        return <DashboardPage onSelectEmployee={handleSelectEmployee} />;
      case 'settings':
        return <SettingsPage onNavigateBack={handleNavigateToDashboard} />;
      default:
        return <HomePage onNavigateToDashboard={handleNavigateToDashboard} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentView={currentView}
        onLogoClick={handleNavigateToHome}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToDashboard={currentView === 'employeeDetail' || currentView === 'settings' ? handleNavigateToDashboard : handleNavigateToDashboard}
        onNavigateToSettings={handleNavigateToSettings}
      />
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10"> {/* Added relative z-10 to ensure main content is above ::before pseudo-element if issues arise */}
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
