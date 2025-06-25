
import React, { useEffect } from 'react';
import { CheckIcon, InformationCircleIcon, ExclamationTriangleIconMini as WarningIcon } from './icons';

interface ToastNotificationProps {
  message: string;
  show: boolean;
  onClose: () => void;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  show,
  onClose,
  type = 'info',
  duration = 3000,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) {
    return null;
  }

  const typeStyles = {
    success: {
      bg: 'bg-[var(--brand-primary)]',
      text: 'text-[var(--brand-text-on-primary)]', // Dark text on yellow
      icon: <CheckIcon className="w-6 h-6" />,
      border: 'border-[var(--brand-primary-dark)]',
      dismissHover: 'hover:bg-[var(--brand-text-on-primary)]/20'
    },
    info: {
      bg: 'bg-sky-500',
      text: 'text-sky-100', // Light text on blue
      icon: <InformationCircleIcon className="w-6 h-6" />,
      border: 'border-sky-600',
      dismissHover: 'hover:bg-sky-400/50'
    },
    warning: {
      bg: 'bg-yellow-400', // Brighter yellow for warning
      text: 'text-yellow-800', // Darker text on yellow
      icon: <WarningIcon className="w-6 h-6" />, 
      border: 'border-yellow-500',
      dismissHover: 'hover:bg-yellow-300/50'
    },
    error: {
      bg: 'bg-red-600',
      text: 'text-red-100', // Light text on red
      icon: <WarningIcon className="w-6 h-6" />, 
      border: 'border-red-700',
      dismissHover: 'hover:bg-red-500/50'
    },
  };

  const currentStyle = typeStyles[type];

  return (
    <div
      className={`fixed bottom-5 right-5 ${currentStyle.bg} ${currentStyle.text} p-4 rounded-lg shadow-2xl flex items-center space-x-3 border-2 ${currentStyle.border} animate-fadeIn z-[100]`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex-shrink-0">{currentStyle.icon}</div>
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className={`ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg inline-flex h-8 w-8 ${currentStyle.text} ${currentStyle.dismissHover} focus:ring-2 focus:ring-current`}
        aria-label="Dismiss"
      >
        <span className="sr-only">Dismiss</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
