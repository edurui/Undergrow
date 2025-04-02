import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "../context/AuthContext";
// import axios from "axios"; // Comentado temporalmente
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";

// La URL base sigue aquí pero no se usará mientras la llamada API esté comentada
const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl;

const validateEmail = (text: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
};

const AuthScreen: React.FC = () => {
  const { t } = useTranslation();

  // Estados (todos siguen siendo relevantes)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Hooks y contexto
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? "light"];
  const { signIn } = useAuth(); // Necesario para la simulación

  const logoImage = require("../assets/images/undergrow-logo-nobg.png");

  const handleEmailChange = (text: string) => {
    setEmail(text);

    if (text.length === 0) {
      setIsEmailValid(false);
      setEmailError(null);
    } else {
      const isValid = validateEmail(text);
      setIsEmailValid(isValid);
      setEmailError(isValid ? null : t("wrongEmailFormat"));
    }
  };

  // --- MANEJADOR DE AUTENTICACIÓN ---
  const handleAuthentication = async () => {
    // Validación inicial (sin cambios)
    if (!email || !password || !isEmailValid || isLoading) {
      return;
    }

    // // ========================================================================
    // // === BLOQUE DE LLAMADA A API CON AXIOS (COMENTADO PARA PRUEBAS LOCALES) ===
    // // ========================================================================
    // /*
    // if (!API_BASE_URL) {
    //   Alert.alert(
    //     "Error de Configuración",
    //     "La URL base de la API no está configurada."
    //   );
    //   return;
    // }

    // const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register"; // <-- AJUSTA endpoints
    // const url = `${API_BASE_URL}${endpoint}`;

    // const requestData = {
    //   email: email,
    //   password: password,
    // };

    // console.log(
    //   `Intentando ${isLogin ? "iniciar sesión" : "registrar"} en ${url}`
    // );
    // setIsLoading(true); // Inicia carga API

    // try {
    //   // Petición POST real
    //   const response = await axios.post(url, requestData, {
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   console.log("Respuesta del servidor:", response.data);

    //   // --- Procesar Éxito API ---
    //   // AJUSTA según la respuesta REAL de tu API Spring Boot
    //   const token = response.data?.token;

    //   if (token) {
    //     await signIn(token); // Llama a signIn del contexto con el token real
    //     // La redirección ocurrirá automáticamente desde _layout.tsx
    //   } else {
    //     console.error("Respuesta exitosa pero sin token esperado.");
    //     Alert.alert("Error", "Respuesta inesperada del servidor.");
    //   }
    // } catch (error) {
    //   // --- Manejo de Errores API ---
    //   console.error(`Error en ${isLogin ? "login" : "registro"}:`, error);
    //   let errorMessage = "Ocurrió un error inesperado.";

    //   if (axios.isAxiosError(error)) {
    //     if (error.response) {
    //       const specificError =
    //         error.response.data?.message || error.response.data?.error;
    //       if (error.response.status === 401 || error.response.status === 400) {
    //         errorMessage =
    //           specificError ||
    //           (isLogin
    //             ? "Email o contraseña incorrectos." // Usa tus claves i18n aquí si quieres
    //             : "No se pudo registrar.");
    //       } else if (error.response.status >= 500) {
    //         errorMessage = specificError || "Error en el servidor.";
    //       } else {
    //         errorMessage = specificError || `Error: ${error.response.status}.`;
    //       }
    //     } else if (error.request) {
    //       errorMessage = "No se pudo conectar con el servidor.";
    //     } else {
    //       errorMessage = `Error al preparar la petición: ${error.message}`;
    //     }
    //   } else {
    //     errorMessage = `Error desconocido: ${error}`;
    //   }
    //   Alert.alert(
    //     isLogin ? "Error de Inicio de Sesión" : "Error de Registro",
    //     errorMessage
    //   );
    // } finally {
    //   setIsLoading(false); // Finaliza carga API
    // }
    // */
    // // ========================================================================
    // // === FIN BLOQUE COMENTADO ===============================================
    // // ========================================================================

    // ========================================================================
    // === LÓGICA SIMULADA (PARA PRUEBAS SIN BACKEND - ACTIVADA) ============
    // ========================================================================
    console.log(
      `Simulando ${isLogin ? "inicio de sesión" : "registro"} con:`,
      email
    );
    setIsLoading(true); // Inicia carga (simulada)

    try {
      // Simula una pequeña espera para dar feedback visual de carga
      await new Promise((resolve) => setTimeout(resolve, 500)); // Espera 0.5 segundos

      // Genera un token falso único para la simulación
      const fakeAuthToken = `simulated-token-for-${email}-${Date.now()}`;
      console.log("Generated fake token:", fakeAuthToken);

      // Llama a signIn del contexto con el token falso
      await signIn(fakeAuthToken);
      // La redirección ocurrirá automáticamente desde _layout.tsx porque el estado de AuthContext cambia
    } catch (error) {
      // Error durante la simulación (poco probable aquí, pero por si acaso)
      console.error("Error durante el signIn simulado:", error);
      Alert.alert("Error", "No se pudo procesar la acción simulada."); // Usa t('error.generic') si tienes clave i18n
    } finally {
      setIsLoading(false); // Finaliza carga (simulada)
    }
    // ========================================================================
    // === FIN LÓGICA SIMULADA ================================================
    // ========================================================================
  }; // Fin handleAuthentication

  // Función para cambiar entre Login/Registro (sin cambios)
  const toggleAuthMode = () => {
    if (isLoading) return;
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setIsEmailValid(false);
    setEmailError(null);
  };

  // Cálculo para deshabilitar botón (sin cambios, sigue usando isLoading)
  const isButtonDisabled = !email || !password || !isEmailValid || isLoading;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentColors.background,
      alignItems: "center",
      paddingTop: 40,
      paddingHorizontal: 20,
    },
    logo: {
      width: 150,
      height: 150,
      resizeMode: "contain",
      marginBottom: 40,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: currentColors.text,
      marginBottom: 40,
    },
    input: {
      width: "100%",
      height: 50,
      backgroundColor: currentColors.card,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
      color: currentColors.text,
      borderWidth: 1,
      borderColor: currentColors.border,
    },
    button: {
      width: "100%",
      height: 50,
      backgroundColor: currentColors.primary,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      flexDirection: "row",
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: currentColors.buttonText,
    },
    toggleText: {
      marginTop: 20,
      color: currentColors.placeholder,
      fontSize: 14,
    },
    toggleLink: {
      color: currentColors.primary,
      fontWeight: "bold",
    },
    errorText: {
      width: "100%",
      color: "#ff5555",
      fontSize: 12,
      marginTop: -10,
      marginBottom: 10,
      textAlign: "left",
      paddingLeft: 5,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
  });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: currentColors.background }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Image source={logoImage} style={styles.logo} />

          <Text style={styles.title}>
            {isLogin ? t("login") : t("register")}
          </Text>

          <TextInput
            style={styles.input}
            placeholder={t("email")}
            placeholderTextColor={currentColors.placeholder}
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}

          <TextInput
            style={styles.input}
            placeholder={t("password")}
            placeholderTextColor={currentColors.placeholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />

          <TouchableOpacity
            style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
            onPress={handleAuthentication}
            disabled={isButtonDisabled}
            activeOpacity={isButtonDisabled ? 1 : 0.7}
          >
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color={currentColors.buttonText}
              />
            ) : (
              <Text style={styles.buttonText}>
                {isLogin ? t("login") : t("register")}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleAuthMode} disabled={isLoading}>
            <Text style={styles.toggleText}>
              {isLogin ? t("dontHaveAccount") : t("alredyHaveAccount")}{" "}
              <Text style={styles.toggleLink}>
                {isLogin ? t("register") : t("login")}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthScreen;
