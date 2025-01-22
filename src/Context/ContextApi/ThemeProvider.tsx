import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import { ThemeEnum } from '@/Core/Enums/ThemeEnum';
import useLocalStorageOptions from '@/Hooks/useLocalStorageOptions';
import { LocalStorageEnum } from '@/Core/Enums/LocalStorage';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
  isDarkMode?:boolean
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const {setValueLocalStorage,getValueLocalStorage}=useLocalStorageOptions();
  const [theme, setTheme] = useState(getValueLocalStorage({key:LocalStorageEnum[4]}) || ThemeEnum[0]);
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    setValueLocalStorage({key:LocalStorageEnum[4],value:theme})
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => (current === ThemeEnum[0] ? ThemeEnum[1] : ThemeEnum[0]));
  };
  const contextValue: ThemeContextType = { theme, setTheme, toggleTheme,isDarkMode:theme==ThemeEnum[1] };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
