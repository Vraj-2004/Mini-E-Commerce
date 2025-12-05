import { Stack } from "expo-router";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import LoginModal from "./components/LoginModal";
export default function RootLayout() {
  return (
    <AuthProvider>
    <CartProvider>
    <LoginModal />
    <Stack screenOptions={{ headerShown: false }} />
    </CartProvider>
    </AuthProvider>
  );
}
