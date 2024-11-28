"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
export type ThemeContextType = {
  handleTheme: () => void;
  theme: string;
};
export const ThemeContext = createContext<ThemeContextType | null>(null);
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("dark");
  const handleTheme = () => {
    setTheme((prevTheme) => (prevTheme == "dark" ? "light" : "dark"));
  };
  useEffect(() => {
    if (theme == "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    console.log(theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ handleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
