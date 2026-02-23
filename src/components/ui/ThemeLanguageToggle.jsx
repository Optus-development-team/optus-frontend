import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import './ThemeLanguageToggle.css';

const ThemeLanguageToggle = () => {
  return (
    <div className="theme-language-toggle">
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
};

export default ThemeLanguageToggle;