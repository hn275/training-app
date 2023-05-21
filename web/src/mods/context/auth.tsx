import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { auth, firebaseAuth } from "firebase-sdk/firebase";

export interface AuthContextType {
  user: firebaseAuth.User;
}

const AuthContext = createContext<AuthContextType>({
  // hacking the type so i don't need to call `user?.id` everytime
  // since user will only be available in a protected route anyway
  user: null as unknown as firebaseAuth.User,
});

interface AuthProviderProps {
  children: ReactNode;
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<firebaseAuth.User>(
    null as unknown as firebaseAuth.User
  );

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(() => user as firebaseAuth.User);
        return;
      }
    });
  }, [firebaseAuth]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
