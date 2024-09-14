import { createContext, useContext } from "react";

export const themeContext = createContext({
  theme: localStorage.getItem("theme") || "light",
  switchTheme: () => {},
});

export const ThemeContextProvider = themeContext.Provider;

export default function UseThemeContext() {
  return useContext(themeContext);
}