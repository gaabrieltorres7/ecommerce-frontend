"use client";

import { api } from "@/lib/api";
import { LoginFormData, loginUser } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TokenPayload {
  sub: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; sub: string; isAdmin: boolean } | null;
  signIn: (credentials: LoginFormData) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{
    email: string;
    sub: string;
    isAdmin: boolean;
  } | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "ecommerce.token": token } = parseCookies();
    if (token) {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const { mutateAsync: signInFn } = useMutation({
    mutationFn: loginUser,
  });

  async function signIn(credentials: LoginFormData) {
    const { accessToken, refreshToken } = await signInFn(credentials);

    setCookie(undefined, "ecommerce.token", accessToken, {
      maxAge: 60 * 60 * 24 * 1, // 1 dia
      path: "/",
    });
    setCookie(undefined, "ecommerce.refreshToken", refreshToken, {
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
    });

    const decodedPayload = jwtDecode<TokenPayload>(accessToken);

    setUser({
      sub: decodedPayload.sub,
      email: decodedPayload.email,
      isAdmin: decodedPayload.isAdmin,
    });
  }

  function signOut() {
    destroyCookie(undefined, "ecommerce.token");
    destroyCookie(undefined, "ecommerce.refreshToken");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
