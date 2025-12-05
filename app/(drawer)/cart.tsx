import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useEffect, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function CartScreen() {
  const { cartItems, removeFromCart, placeOrder } = useCart();
  const { isLoggedIn, openLogin } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) openLogin();
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  // TOTAL PRICE
  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price, 0),
    [cartItems]
  );

  return (
    <View style={styles.main}>

      {/* TOP BACK BUTTON */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      {/* CART LIST */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 120 }} 
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.img} />

            <View style={styles.infoBox}>
              {/* FIXED: Allow long titles to wrap properly */}
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.price}>₹ {item.price}</Text>
            </View>

            {/* DELETE BUTTON */}
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => removeFromCart(item.id)}
            >
              <Ionicons name="close-circle" size={28} color="#ff4d4d" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* SUMMARY BOX (NOW AT BOTTOM) */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Cart Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Items in Cart:</Text>
          <Text style={styles.summaryValue}>{cartItems.length}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Price:</Text>
          <Text style={styles.summaryValue}>₹ {totalPrice.toFixed(2)}</Text>
        </View>

        {/* PLACE ORDER BUTTON */}
        <TouchableOpacity style={styles.orderBtn} onPress={placeOrder}>
          <Text style={styles.orderText}>Place Order</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
    color: "#cfcfcf",
  },

  backBtn: {
    padding: 10,
    alignSelf: "flex-start",
  },

  /* CART ITEM CARD */
  card: {
    flexDirection: "row",
    backgroundColor: "#1b1b1b",
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    alignItems: "center",
  },

  img: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    backgroundColor: "#000",
    borderRadius: 8,
  },

  infoBox: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "600",
    lineHeight: 20,
  },

  price: {
    fontSize: 16,
    color: "#4ade80",
    marginTop: 6,
    fontWeight: "700",
  },

  deleteBtn: {
    marginLeft: 10,
  },

  /* SUMMARY CARD AT BOTTOM */
  summaryCard: {
    backgroundColor: "#1b1b1b",
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginTop: 10,
  },

  summaryTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  summaryLabel: {
    color: "#cfcfcf",
    fontSize: 16,
  },

  summaryValue: {
    color: "#4ade80",
    fontSize: 17,
    fontWeight: "700",
  },

  orderBtn: {
    backgroundColor: "#4ade80",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 18,
  },

  orderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#081014",
  },
});
