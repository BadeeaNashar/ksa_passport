import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { findUserByNationalId, type SampleUser } from "@/data/users";

interface AuthContextValue {
  user: SampleUser | null;
  isAuthenticated: boolean;
  login: (nationalId: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "jawaz-auth-nid";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SampleUser | null>(() => {
    const savedId = localStorage.getItem(STORAGE_KEY);
    return savedId ? (findUserByNationalId(savedId) ?? null) : null;
  });

  const login = useCallback((nationalId: string) => {
    const found = findUserByNationalId(nationalId);
    if (!found) return false;
    setUser(found);
    localStorage.setItem(STORAGE_KEY, found.nationalId);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, logout }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
