import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { User, firebaseAuth, onAuthStateChanged } from "firebase-sdk/firebase";

export interface AuthContextType {
  user: User;
}

const AuthContext = createContext<AuthContextType>({
  // hacking the type so i don't need to call `user?.id` everytime
  // since user will only be available in a protected route anyway
  user: null as unknown as User,
});

interface AuthProviderProps {
  children: ReactNode;
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null as unknown as User);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(() => user as User);
        return;
      }
    });
  }, [firebaseAuth]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
