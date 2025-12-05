import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {createContext,ReactNode,useContext,useEffect,useState,} from "react";
import { Product } from "../types/product";
import { useAuth } from "./AuthContext";
import DarkAlert from "../components/DarkAlert";

export type CartContextType = {
  cartItems: Product[];
  orderHistory: Product[][];
  addToCart: (item: Product) => void;
  removeFromCart: (id: number) => void;
  placeOrder: () => void;
  clearOrderHistory: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [orderHistory, setOrderHistory] = useState<Product[][]>([]);
  const { isLoggedIn, openLogin } = useAuth();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    buttons: [] as { text: string; onPress: () => void }[],
  });

  const showAlert = (data: {
    title: string;
    message: string;
    buttons: { text: string; onPress: () => void }[];
  }) => {
    setAlertData(data);
    setAlertVisible(true);
  };

  const CART_KEY = "cart_items";
  const ORDER_KEY = "order_history";

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    const cartData = await AsyncStorage.getItem(CART_KEY);
    const orderData = await AsyncStorage.getItem(ORDER_KEY);
    if (cartData) setCartItems(JSON.parse(cartData));
    if (orderData) setOrderHistory(JSON.parse(orderData));
  };

  const saveCart = async (items: Product[]) => {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
    setCartItems(items);
  };

  const saveOrders = async (orders: Product[][]) => {
    await AsyncStorage.setItem(ORDER_KEY, JSON.stringify(orders));
    setOrderHistory(orders);
  };

  const addToCart = (product: Product) => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    const exists = cartItems.some((item) => item.id === product.id);
    if (exists) {
      showAlert({
        title: "Already Added",
        message: "This item is already in your cart.",
        buttons: [{ text: "OK", onPress: () => {setAlertVisible(false); router.replace("/cart")} }],
      });
      return;
    }
    const updated = [...cartItems, product];
    saveCart(updated);
    showAlert({
      title: "Added to Cart",
      message: `${product.title} has been added.`,
      buttons: [
        { text: "Continue Shopping", onPress: () => {setAlertVisible(false); router.replace("/productlist")} },
        { text: "View Cart", onPress: () => {setAlertVisible(false); router.replace("/cart")} },
      ],
    });
  };

  const removeFromCart = async (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    await saveCart(updated);
    await loadAllData();
  };

  const placeOrder = () => {
    if (cartItems.length === 0) return;
    const updatedOrders = [...orderHistory, cartItems];
    saveOrders(updatedOrders);
    saveCart([]);
    router.replace("/history");
  };

  const clearOrderHistory = async () => {
    await saveOrders([]);
  };

  return (
    <>
      <CartContext.Provider
        value={{
          cartItems,
          orderHistory,
          addToCart,
          removeFromCart,
          placeOrder,
          clearOrderHistory,
        }}
      >
        {children}
      </CartContext.Provider>
      <DarkAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        buttons={alertData.buttons}
        onClose={() => setAlertVisible(false)}
      />
    </>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
