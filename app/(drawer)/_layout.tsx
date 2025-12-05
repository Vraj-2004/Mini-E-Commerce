import { View } from "react-native";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
    <Drawer
      screenOptions={{
        // HEADER STYLING
        headerStyle: {
          backgroundColor: "#181818",
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 20,
          fontWeight: "700",
        },
        headerTintColor: "#fff",

        // DRAWER BACKGROUND
        drawerStyle: {
          backgroundColor: "#121212",
        },
        drawerContentStyle: {
          backgroundColor: "#121212",
        },

        // TEXT INSIDE DRAWER
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
          color: "#e0e0e0",
        },

        // ACTIVE + INACTIVE COLORS
        drawerActiveTintColor: "#fff",
        drawerActiveBackgroundColor: "#2d2d2d",
        drawerInactiveTintColor: "#9a9a9a",

        // DRAWER ITEM SPACING / LOOK
        drawerItemStyle: {
          marginVertical: 8,
          borderRadius: 8,
        },
      }}
    >
      <Drawer.Screen name="productlist" options={{ title: "Product List" }} />
      <Drawer.Screen name="cart" options={{ title: "My Cart" }} />
      <Drawer.Screen name="history" options={{ title: "Order History" }} />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
    </Drawer>
    </View>
  );
}
