import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginModal() {
  const { loginModalVisible, closeLogin, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (loginModalVisible) {
      setEmail("");
      setPassword("");
      setUsername("");
      setAge("");
    }
  }, [loginModalVisible]);

  return (
    <Modal visible={loginModalVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>

          <Text style={styles.title}>Login Required</Text>

          {/* Inputs */}
          <TextInput
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TextInput
            placeholder="Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />

          <TextInput
            placeholder="Age"
            placeholderTextColor="#888"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            style={styles.input}
          />

          {/* ACTION BUTTONS */}
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => login(email, password, username, age)}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={closeLogin}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "85%",
    backgroundColor: "#1b1b1b",
    padding: 22,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },

  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#0f0f0f",
    borderWidth: 1,
    borderColor: "#333",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    color: "#fff",
  },

  loginBtn: {
    backgroundColor: "#4ade80",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },

  loginText: {
    color: "#081014",
    fontWeight: "700",
    fontSize: 17,
  },

  cancelBtn: {
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
  },

  cancelText: {
    color: "#fff",
    fontSize: 16,
  },
});
