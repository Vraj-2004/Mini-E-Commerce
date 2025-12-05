import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HistoryScreen() {
  const { orderHistory, clearOrderHistory } = useCart();
  const { isLoggedIn, openLogin } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) openLogin();
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  if (orderHistory.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No orders yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>

      {/* TITLE */}
      <Text style={styles.pageTitle}>Order History</Text>

      <FlatList
        data={orderHistory}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item, index }) => (
  <TouchableOpacity
    style={styles.orderCard}
    onPress={() => router.push(`/orderdetails/${index}`)}
  >
    <Text style={styles.orderTitle}>Order #{index + 1}</Text>

    <View style={styles.itemsContainer}>
      {item.map((product) => (
        <View key={product.id} style={styles.itemChip}>
          <Text style={styles.itemText} numberOfLines={1}>
            {product.title}
          </Text>
        </View>
      ))}
    </View>
  </TouchableOpacity>
)}
      />

      {/* CLEAR BUTTON */}
      <TouchableOpacity style={styles.clearBtn} onPress={clearOrderHistory}>
        <Ionicons name="trash" size={20} color="#fff" />
        <Text style={styles.clearText}>Clear Order History</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    paddingHorizontal: 15,
    paddingTop: 15,
  },

  pageTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
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

  orderCard: {
    backgroundColor: "#1b1b1b",
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 15,
  },

  orderTitle: {
    color: "#4ade80",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  itemChip: {
    backgroundColor: "#262626",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
  },

  itemText: {
    color: "#cfcfcf",
    fontSize: 14,
    maxWidth: 200,
  },

  clearBtn: {
    flexDirection: "row",
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    gap: 8,
  },

  clearText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
