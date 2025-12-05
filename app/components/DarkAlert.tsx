import {Modal,View,Text,TouchableOpacity,StyleSheet,GestureResponderEvent,} from "react-native";
type Btn = {
  text: string;
  onPress: (e: GestureResponderEvent) => void;
  style?: object;
};
export default function DarkAlert({
  visible,
  title,
  message,
  onClose,
  buttons = [],
}: {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  buttons?: Btn[];
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          {buttons.map((btn, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.button, btn.style]}
              onPress={btn.onPress}
            >
            <Text style={styles.buttonText}>{btn.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "80%",
    backgroundColor: "#1b1b1b",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4ade80",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#081014",
    fontWeight: "700",
    fontSize: 16,
  },
  closeBtn: {
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontSize: 15,
  },
});