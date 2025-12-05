import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { productService } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";
import { router } from "expo-router";

export default function ProductListScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // NEW typed states
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchProducts = async () => {
      const data: Product[] = await productService();

      const uniqueCategories = [
        "All",
        ...Array.from(new Set(data.map((p) => p.category))),
      ];

      setCategories(uniqueCategories);
      setOriginalProducts(data);
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filterCategory = useCallback(
    (cat: string) => {
      setSelectedCategory(cat);

      if (cat === "All") {
        setProducts(originalProducts);
      } else {
        setProducts(originalProducts.filter((p) => p.category === cat));
      }
    },
    [originalProducts]
  );

  if (loading)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Products</Text>

      {/* Category Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryListContainer}
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => filterCategory(cat)}
              style={[styles.categoryBtn, isActive && styles.categoryBtnActive]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  isActive && styles.categoryTextActive,
                ]}
                numberOfLines={1}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Product Grid */}
      <FlatList
        data={products}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { id: String(item.id), product: JSON.stringify(item) },
              })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    padding: 12,
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 0.5,
  },

  /* ------- CATEGORY STYLING FIXED ------- */
  categoryListContainer: {
    paddingRight: 12,
    marginBottom: 10,
  },

  categoryBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#1b1b1b",
    borderRadius: 18,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    minWidth: 70,
    alignItems: "center",
    justifyContent: "center",
    height: 38,
  },

  categoryBtnActive: {
    backgroundColor: "#4ade80",
    borderColor: "#4ade80",
  },

  categoryText: {
    color: "#bfbfbf",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

  categoryTextActive: {
    color: "#0f0f0f",
    fontWeight: "800",
  },
});
