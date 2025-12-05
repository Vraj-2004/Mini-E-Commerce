import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import AvatarImage from "../../assets/images/avatar.jpg";
import { Image } from "expo-image";

export default function Profile() {
  const { logout, isLoggedIn, openLogin, profile } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) openLogin();
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <View style={styles.main}>
      <View style={styles.avatarWrapper}>
        <Image
          source={AvatarImage}
          style={styles.avatar}
        />
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.profileTitle}>Profile Details</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{profile?.username || "-"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{profile?.age || "-"}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  avatarWrapper: {
    alignItems: "center",
    marginBottom: 25,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#4ade80",
  },

  infoCard: {
    backgroundColor: "#1b1b1b",
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 20,
  },

  profileTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  label: {
    color: "#cfcfcf",
    fontSize: 16,
  },

  value: {
    color: "#4ade80",
    fontSize: 16,
    fontWeight: "700",
  },

  logoutBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});