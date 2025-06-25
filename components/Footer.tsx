
import React from 'react';
import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon, BlogIcon } from './icons';

const socialLinks = [
  { name: 'Blog', href: 'https://hereandnowai.com/blog', icon: BlogIcon },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/hereandnowai/', icon: LinkedInIcon },
  { name: 'Instagram', href: 'https://instagram.com/hereandnow_ai', icon: InstagramIcon },
  { name: 'GitHub', href: 'https://github.com/hereandnowai', icon: GitHubIcon },
  { name: 'X', href: 'https://x.com/hereandnow_ai', icon: XIcon },
  { name: 'YouTube', href: 'https://youtube.com/@hereandnow_ai', icon: YouTubeIcon },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--footer-bg)] border-t border-[var(--brand-border-color)] mt-auto shadow-top">
      <div className="container mx-auto px-4 py-8 text-center text-[var(--text-color-secondary)]">
        <div className="mb-4">
          <img 
            src="https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png" 
            alt="HERE AND NOW AI" 
            className="h-8 mx-auto mb-2"
          />
          <p className="text-sm italic text-[var(--text-color-muted)]">"designed with passion for innovation"</p>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-color-muted)] hover:text-[var(--brand-primary)] transition-colors duration-150"
              aria-label={item.name}
            >
              <item.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} HERE AND NOW AI. All rights reserved.</p>
        <p className="mt-1 text-xs text-[var(--text-color-muted)]">Developed by Adhithya J [ AI Products Engineering Team ]</p>
         <p className="mt-1 text-xs text-[var(--text-color-muted)]">
          Contact: <a href="mailto:info@hereandnowai.com" className="hover:text-[var(--brand-primary)]">info@hereandnowai.com</a> | 
          Mobile: <a href="tel:+919962961000" className="hover:text-[var(--brand-primary)]">+91 996 296 1000</a>
        </p>
      </div>
    </footer>
  );
};