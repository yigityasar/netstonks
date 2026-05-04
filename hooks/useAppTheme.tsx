import React, { createContext, useContext } from 'react';

type ThemeType = 'light' | 'dark';

const ThemeContext = createContext<ThemeType>('light');

export const ThemeProvider: React.FC<{ theme: ThemeType; children: React.ReactNode }> = ({ theme, children }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = () => {
  return useContext(ThemeContext);
};
