import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { orderHistory } = useCart();

  const orderIndex = Number(id);
  const orderItems = orderHistory[orderIndex];

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.main}>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={26} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Order #{orderIndex + 1}</Text>
      <Text style={styles.subTitle}>Items Purchased: {orderItems.length}</Text>
      <Text style={styles.totalPrice}>Total: ₹ {totalPrice.toFixed(2)}</Text>

      {/* ITEM LIST */}
      <FlatList
        data={orderItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.itemPrice}>₹ {item.price}</Text>
            </View>
          </View>
        )}
        style={{ marginTop: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    padding: 15,
    paddingTop: 28,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#1b1b1b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  subTitle: {
    color: "#bfbfbf",
    marginTop: 5,
    fontSize: 16,
  },

  totalPrice: {
    color: "#4ade80",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },

  itemCard: {
    flexDirection: "row",
    backgroundColor: "#1b1b1b",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 12,
  },

  img: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },

  itemTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },

  itemPrice: {
    color: "#4ade80",
    fontSize: 16,
    fontWeight: "700",
  },
});
