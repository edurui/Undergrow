const primaryHighlight = "#00c88e";
const darkBackground = "#0f0f0f";
const lightText = "#ffffff";
const darkText = "#0f0f0f"; 
const darkCard = "#1a1a1a";
const lightBackground = "#f0f0f0";
const lightCard = "#ffffff";
const darkBorder = "#333333";
const lightBorder = "#cccccc";
const darkPlaceholder = "#888888";
const lightPlaceholder = "#999999";
const buttonTextLight = "#ffffff";
const buttonTextDark = darkBackground;

export const Colors = {
  light: {
    text: darkText,
    background: lightBackground, 
    tint: primaryHighlight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: primaryHighlight,
    primary: primaryHighlight,
    highlight: primaryHighlight,
    card: lightCard,
    border: lightBorder,
    placeholder: lightPlaceholder,
    buttonText: buttonTextLight,
  },
  dark: {
    text: lightText, 
    background: darkBackground,
    tint: lightText,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: lightText, 
    primary: primaryHighlight, 
    highlight: primaryHighlight,
    card: darkCard,
    border: darkBorder,
    placeholder: darkPlaceholder,
    buttonText: buttonTextDark,
  },
};