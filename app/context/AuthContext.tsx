import {createContext,useState,useEffect,ReactNode,useContext,} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
type AuthContextType = {
  isLoggedIn: boolean;
  loginModalVisible: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  login: (email: string,password: string,username?: string,age?: string) => Promise<void>;
  logout: () => Promise<void>;
  profile: { username: string; age: string } | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [profile, setProfile] = useState<{ username: string; age: string } | null>(null);

  const TOKEN_KEY = "user_token";
  const PROFILE_KEY = "user_profile";


  useEffect(() => {
    const init = async () => {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      const savedProfile = await AsyncStorage.getItem(PROFILE_KEY);
      if (token) setIsLoggedIn(true);
      if (savedProfile) setProfile(JSON.parse(savedProfile));
    };
    init();
  }, []);

  const openLogin = () => {
    setLoginModalVisible(true);
  };

  const closeLogin = () => {
    setLoginModalVisible(false);
    router.replace("/");
  };
  const login = async (
    email: string,
    password: string,
    username?: string,
    age?: string
  ) => {
    const validUsers = [
      { email: "test@zignuts.com", password: "123456" },
      { email: "practical@zignuts.com", password: "123456" },
    ];

    const isValid = validUsers.some(
      (u) => u.email === email && u.password === password
    );

    if (!isValid) {
      alert("Invalid credentials");
      return;
    }
    await AsyncStorage.setItem(TOKEN_KEY, "LOGGED_IN");
    setIsLoggedIn(true);
    if (username && age) {
      const userProfile = { username, age };
      setProfile(userProfile);
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(userProfile));
    }
    closeLogin();
  };
  const logout = async () => {
    await AsyncStorage.multiRemove([TOKEN_KEY, PROFILE_KEY]);
    setIsLoggedIn(false);
    setProfile(null);
  }
  return (
    <AuthContext.Provider value={{isLoggedIn,loginModalVisible,openLogin,closeLogin,login,logout,profile,}}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
