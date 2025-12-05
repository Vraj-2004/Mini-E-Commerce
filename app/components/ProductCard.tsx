import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

export default function ProductCard({ item, onPress }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.img} contentFit="contain" />

      <Text numberOfLines={2} style={styles.title}>
        {item.title}
      </Text>

      <Text style={styles.price}>₹ {item.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#1a1a1a",
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },

  img: {
    width: "100%",
    height: 150,
    backgroundColor: "#222",
    borderRadius: 10,
  },

  title: {
    marginTop: 10,
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    height: 36, 
  },

  price: {
    marginTop: 6,
    fontSize: 16,
    color: "#4ade80",
    fontWeight: "700",
  },
});