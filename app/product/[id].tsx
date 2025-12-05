import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
import { useCart } from "../context/CartContext";
import { Product } from "../types/product";
import { Ionicons } from "@expo/vector-icons";

export default function ProductDetailsScreen() {
  const { product } = useLocalSearchParams();
  const data = JSON.parse(product as string) as Product;
  const { addToCart } = useCart();

  // Generate stars from rating
  const stars = Math.round(data.rating.rate);
  const starArray = Array.from({ length: 5 }, (_, i) => i < stars);

  return (
    <SafeAreaView style={styles.main}>
      {/* BACK BUTTON ON TOP */}
      <TouchableOpacity style={styles.topBackBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={26} color="#fff" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* IMAGE BLOCK */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: data.image }} style={styles.img} />
        </View>

        {/* TITLE */}
        <Text style={styles.title}>{data.title}</Text>

        {/* CATEGORY */}
        <Text style={styles.category}>Category: {data.category}</Text>

        {/* PRICE */}
        <Text style={styles.price}>₹ {data.price}</Text>

        {/* RATING */}
        <View style={styles.ratingBox}>
          <View style={{ flexDirection: "row" }}>
            {starArray.map((filled, index) => (
              <Ionicons
                key={index}
                name={filled ? "star" : "star-outline"}
                size={20}
                color="#facc15"
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          <Text style={styles.countText}>{data.rating.count} reviews</Text>
        </View>

        {/* DESCRIPTION */}
        <Text style={styles.sectionHeader}>Description</Text>
        <Text style={styles.desc}>{data.description}</Text>

        {/* ADD TO CART */}
        <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(data)}>
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    padding: 15,
    paddingTop: 28,
  },

  topBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#1b1b1b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },

  imageWrapper: {
    width: "100%",
    backgroundColor: "#1b1b1b",
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginTop: 10,
    alignItems: "center",
  },

  img: {
    width: "100%",
    height: 260,
    resizeMode: "contain",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 18,
    color: "#fff",
    lineHeight: 30,
  },

  category: {
    fontSize: 15,
    color: "#bfbfbf",
    marginTop: 6,
  },

  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#4ade80",
    marginVertical: 12,
  },

  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },

  countText: {
    fontSize: 15,
    color: "#b3b3b3",
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginTop: 15,
    marginBottom: 6,
  },

  desc: {
    fontSize: 15.5,
    color: "#cfcfcf",
    lineHeight: 22,
    marginBottom: 20,
  },

  addBtn: {
    backgroundColor: "#4ade80",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },

  addBtnText: {
    color: "#081014",
    fontSize: 18,
    fontWeight: "700",
  },
});
