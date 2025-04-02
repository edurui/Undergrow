import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      greeting: "Hello, {{name}}!",
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      wrongEmailFormat: "Invalid email format",
      dontHaveAccount: "Don't have an account? ",
      alredyHaveAccount: "Already have an account? ",
      // ... más traducciones
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido",
      greeting: "¡Hola, {{name}}!",
      login: "Iniciar Sesión",
      register: "Registrarme",
      email: "Correo Electrónico",
      password: "Contraseña",
      wrongEmailFormat: "Formato de email inválido",
      dontHaveAccount: "¿No tienes cuenta? ",
      alredyHaveAccount: "¿Ya tienes cuenta? ",
      // ... más traducciones
    },
  },
  // Puedes añadir más idiomas aquí (fr, pt, etc.)
};

// --- Detectar el idioma del dispositivo ---
const deviceLanguage = Localization.getLocales()[0]?.languageCode || "en"; // 'en' como fallback

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: deviceLanguage, 
    fallbackLng: "en",
    compatibilityJSON: "v3",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
