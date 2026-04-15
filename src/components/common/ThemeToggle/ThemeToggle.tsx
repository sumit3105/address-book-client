import React from 'react';
import { useThemeContext, type ThemeMode } from '@/contexts/ThemeContext';
import { ThemeSelectWrapper, StyledSelect, SelectIcon } from './ThemeToggle.styles';

const ThemeToggle: React.FC = () => {
  const { themeMode, setThemeMode } = useThemeContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeMode(e.target.value as ThemeMode);
  };

  return (
    <ThemeSelectWrapper>
      <StyledSelect value={themeMode} onChange={handleChange} aria-label="Select theme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </StyledSelect>
      <SelectIcon>
        <svg xmlns="http://www.3000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </SelectIcon>
    </ThemeSelectWrapper>
  );
};

export default ThemeToggle;
