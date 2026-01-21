import { updateTaskStatus } from "@/src/tasks.js";
import { getButtonColor } from "@/utils/buttons";
import { playSound } from "@/utils/playSound.js";
import { SOUNDS } from "@/utils/sounds";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef } from "react";
import {
    Animated,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function ConfirmModal({
  visible,
  taskId,
  taskName,
  status,
  onClose,
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const confirmMarkAsDone = async () => {
    try {
      await updateTaskStatus(taskId, status);
      onClose();
    } catch (error) {
      console.error("ERROR updating task:", error);
    }
  };

  //Button animation
  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const bgColor = scale.interpolate({
    inputRange: [0.95, 1],
    outputRange: getButtonColor(status),
  });

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={22} color="#555" />
          </Pressable>

          <Text style={styles.title}>¿Marcar como Done?</Text>

          <Text style={styles.taskName}>{taskName}</Text>

          <Pressable
            onPress={async () => {
              playSound(SOUNDS.confirm);
              confirmMarkAsDone();
            }}
            onPressIn={pressIn}
            onPressOut={pressOut}
            style={styles.confirmWrapper}
          >
            <Animated.View
              style={[
                styles.confirmButton,
                {
                  transform: [{ scale }],
                  backgroundColor: bgColor,
                },
              ]}
            >
              <Ionicons name="checkbox-outline" size={28} color="white" />
              <Text style={styles.confirmText}>Done</Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#590836ff",
    padding: 20,
  },

  button: {
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    width: "80%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    textAlign: "center",
  },
  taskName: {
    color: "#444",
    marginBottom: 24,
    textAlign: "center",
  },
  confirmWrapper: {
    width: "100%",
    alignItems: "center",
  },
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,

    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
});
