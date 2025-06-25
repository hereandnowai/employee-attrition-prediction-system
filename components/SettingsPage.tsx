
import React, { useState, useEffect, useCallback } from 'react';
import { type AppSettings } from '../types';
import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from '../constants';
import { SaveIcon, ChevronLeftIcon } from './icons'; 
import { ToastNotification } from './ToastNotification';

interface SettingsPageProps {
  onNavigateBack: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigateBack }) => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (error) {
        console.error("Failed to parse settings from localStorage", error);
        localStorage.removeItem(SETTINGS_STORAGE_KEY); 
      }
    }
  }, []);

  const handleSettingChange = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = useCallback(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    if (settings.theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
    setToastMessage('Settings saved successfully!');
    setShowToast(true);
  }, [settings]);

  const SettingRow: React.FC<{ label: string; description?: string; children: React.ReactNode }> = ({ label, description, children }) => (
    <div className="py-4 border-b border-[var(--brand-border-color-alt)] last:border-b-0">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <div>
          <label className="block text-md font-medium text-[var(--text-color-primary)]">{label}</label>
          {description && <p className="mt-1 text-sm text-[var(--text-color-muted)]">{description}</p>}
        </div>
        <div className="mt-2 sm:mt-0 flex-shrink-0">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <button
        onClick={onNavigateBack}
        className="mb-2 flex items-center text-[var(--brand-accent-text)] hover:text-[var(--brand-primary-dark)] transition-colors duration-150 text-sm font-medium"
      >
        <ChevronLeftIcon className="w-5 h-5 mr-1" />
        Back to Dashboard
      </button>

      <div className="flex items-center mb-6">
        {/* Icon for the page title is removed here */}
        <h1 className="text-3xl font-semibold text-[var(--text-color-primary)]">Settings</h1>
      </div>

      <div className="bg-[var(--brand-bg-surface)] border border-[var(--brand-border-color)] rounded-xl shadow-2xl p-6 md:p-8">
        <SettingRow label="Theme Preference" description="Choose your preferred application theme.">
          <div className="flex space-x-4">
            {(['dark', 'light'] as const).map((themeOption) => (
              <label key={themeOption} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value={themeOption}
                  checked={settings.theme === themeOption}
                  onChange={() => handleSettingChange('theme', themeOption)}
                  className="form-radio h-4 w-4 text-[var(--brand-primary)] accent-[var(--brand-primary)] focus:ring-1 focus:ring-offset-0 focus:ring-[var(--brand-focus-ring)] bg-[var(--brand-bg-surface-alt)] border-[var(--brand-border-color)]"
                />
                <span className="text-sm text-[var(--text-color-secondary)] capitalize">{themeOption}</span>
              </label>
            ))}
          </div>
        </SettingRow>

        <SettingRow label="Enable In-App Notifications" description="Toggle to receive system notifications.">
          <label htmlFor="notificationsEnabled" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="notificationsEnabled"
                className="sr-only"
                checked={settings.notificationsEnabled}
                onChange={(e) => handleSettingChange('notificationsEnabled', e.target.checked)}
              />
              <div className={`block w-10 h-6 rounded-full transition-colors ${settings.notificationsEnabled ? 'bg-[var(--brand-primary)]' : 'bg-gray-500 dark:bg-gray-600'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.notificationsEnabled ? 'translate-x-full' : ''}`}></div>
            </div>
          </label>
        </SettingRow>

        <SettingRow label="Mock API Response Delay" description="Set delay for simulated API calls (for development).">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
             <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={settings.mockApiDelay}
              onChange={(e) => handleSettingChange('mockApiDelay', parseInt(e.target.value, 10))}
              className="w-full sm:w-48 h-2 bg-gray-500 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[var(--brand-primary)]"
            />
            <input
              type="number"
              min="0"
              max="5000"
              step="100"
              value={settings.mockApiDelay}
              onChange={(e) => handleSettingChange('mockApiDelay', parseInt(e.target.value, 10))}
              className="w-20 px-2 py-1 bg-[var(--brand-bg-surface-alt)] text-[var(--text-color-primary)] border border-[var(--brand-border-color)] rounded-md focus:ring-1 focus:ring-[var(--brand-focus-ring)] focus:border-[var(--brand-focus-ring)]"
            />
            <span className="text-sm text-[var(--text-color-muted)]">ms</span>
          </div>
        </SettingRow>

        <div className="mt-8 pt-6 border-t border-[var(--brand-border-color)]">
          <button
            onClick={handleSaveSettings}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-[var(--brand-text-on-primary)] font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--brand-focus-ring)] focus:ring-opacity-75"
          >
            <SaveIcon className="w-5 h-5 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
      <ToastNotification
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
    </div>
  );
};
