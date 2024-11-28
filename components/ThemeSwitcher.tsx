"use client";
import { ThemeContext, ThemeContextType } from "@/providers/ThemeProvider";
import React, { useContext } from "react";
import { Button } from "./ui/button";

const ThemeSwitcher = () => {
  const { handleTheme, theme } = useContext(ThemeContext) as ThemeContextType;
  return (
    <Button onClick={handleTheme}>{theme === "dark" ? "Light" : "Dark"}</Button>
  );
};

export default ThemeSwitcher;
