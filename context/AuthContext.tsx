// context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter, useSegments } from 'expo-router';

const AUTH_TOKEN_KEY = 'authToken'; // Clave para guardar en SecureStore

interface AuthState {
  token: string | null;
  isAuthenticated: boolean | null; // null = inicializando, true = logueado, false = no logueado
}

interface AuthContextProps {
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  authState: AuthState;
  isLoading: boolean; // Para saber si estamos cargando el token inicial
}

// Creamos el contexto con un valor inicial undefined o un objeto por defecto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook personalizado para usar el contexto fácilmente
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Proveedor del Contexto
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({ token: null, isAuthenticated: null });
  const [isLoading, setIsLoading] = useState<boolean>(true); // Empezamos cargando

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
        console.log("Stored token on load:", storedToken);
        if (storedToken) {
          setAuthState({ token: storedToken, isAuthenticated: true });
        } else {
          setAuthState({ token: null, isAuthenticated: false });
        }
      } catch (e) {
        console.error("Failed to load auth token:", e);
        setAuthState({ token: null, isAuthenticated: false });
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  const signIn = async (token: string) => {
    try {
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
      setAuthState({ token: token, isAuthenticated: true });
    } catch (e) {
       console.error("Failed to save auth token:", e);
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      setAuthState({ token: null, isAuthenticated: false });
    } catch (e) {
       console.error("Failed to delete auth token:", e);
    }
  };

  const value = {
    signIn,
    signOut,
    authState,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};