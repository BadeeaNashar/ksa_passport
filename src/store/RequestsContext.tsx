import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { seedRequests, type PassportRequest } from "@/data/requests";

interface RequestsContextValue {
  requests: PassportRequest[];
  addRequest: (req: PassportRequest) => void;
  getByOwner: (nationalId: string) => PassportRequest[];
  getById: (id: string) => PassportRequest | undefined;
}

const RequestsContext = createContext<RequestsContextValue | undefined>(undefined);

const STORAGE_KEY = "jawaz-requests";

export function RequestsProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<PassportRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as PassportRequest[];
    } catch {
      /* ignore malformed storage */
    }
    return seedRequests;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }, [requests]);

  const addRequest = useCallback((req: PassportRequest) => {
    setRequests((prev) => [req, ...prev]);
  }, []);

  const getByOwner = useCallback(
    (nationalId: string) =>
      requests
        .filter((r) => r.owner === nationalId)
        .sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1)),
    [requests],
  );

  const getById = useCallback(
    (id: string) => requests.find((r) => r.id.toLowerCase() === id.trim().toLowerCase()),
    [requests],
  );

  const value = useMemo(
    () => ({ requests, addRequest, getByOwner, getById }),
    [requests, addRequest, getByOwner, getById],
  );

  return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRequests() {
  const ctx = useContext(RequestsContext);
  if (!ctx) throw new Error("useRequests must be used within a RequestsProvider");
  return ctx;
}
