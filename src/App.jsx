import "./styles/App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import UseThemeContext, { ThemeContextProvider } from "./context/ThemeContext";

function App() {
  const [theme, setTheme] = useState(UseThemeContext().theme);

  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div className="h-screen dark:bg-[#212121]">
      <ThemeContextProvider value={{ theme, switchTheme }}>
        <Outlet />
      </ThemeContextProvider>
    </div>
  );
}

export default App;
