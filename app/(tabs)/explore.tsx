import Ionicons from '@expo/vector-icons/Ionicons';
import { Audio } from "expo-audio";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { fetchTasks, updateTaskStatus } from "../../src/tasks.js";
import { playSound } from "../../utils/playSound.js";
import { SOUNDS } from "../../utils/sounds";
import { getBackgroundColorByType } from "../../utils/taskStyle";

export default function TabTwoScreen() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const scale = useRef(new Animated.Value(1)).current;
  const openConfirmModal = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
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
    outputRange: ["#7c2b82ff", "#5d3d78ff"],
  });

  const playClickSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/click.mp3")
    );
    await sound.playAsync();
  };

  const confirmMarkAsPriority = async () => {
    try {
      await updateTaskStatus(selectedTask.id, "Priority");

      // quitamos la tarea de la lista actual (Priority)
      setTasks((prev) =>
        prev.filter((task) => task.id !== selectedTask.id)
      );

      setModalVisible(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("ERROR updating task:", error);
    }
  };
    
  useEffect(() => {
    fetchTasks("Not started")
      .then((data) => {
        console.log("DATA FROM API:", data);
        setTasks(data);
      })
      .catch((error) => {
        console.error("FETCH ERROR:", error);
      });
  }, []);
  
    return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#3a3a3aff", marginTop: 50 }}>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View
            style={{
              padding: 12,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: 8,
              backgroundColor: getBackgroundColorByType(item.type),
            }} >
          {/* Fila superior */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }} >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#000",
                flex: 1,
                marginRight: 8,
              }}
              numberOfLines={2}
            >
              {item.name}
            </Text>
    
            {item.status !== "Done" && (
              <Pressable style={styles.button} onPress={async () => { await playSound(SOUNDS.click); openConfirmModal(item);}}
                        onPressIn={pressIn} onPressOut={pressOut }
              >
                <Animated.View
                  style={[
                    styles.button,
                    { 
                      transform: [{ scale }] ,
                      backgroundColor: bgColor,
                    }
                  ]}
                >
                  <Ionicons name="add-circle-outline" size={44} color="white" />
                </Animated.View>
              </Pressable>
            )}
          </View>
    
          {/* Detalles */}
          <Text style={{ color: "#000", marginTop: 4 }}>
            Status: {item.status}
          </Text>
          <Text style={{ color: "#000" }}>
            Priority: {item.priority}
          </Text>
    
          {item.due && (
            <Text style={{ color: "#000" }}>
              Due: {item.due}
            </Text>
          )}
          </View>
    
            )}
          />
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>

            {/* ❌ Botón cerrar */}
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={22} color="#555" />
            </Pressable>

            {/* 📝 Texto */}
            <Text style={styles.title}>
              ¿Marcar como Priority?
            </Text>

            <Text style={styles.taskName}>
              {selectedTask?.name}
            </Text>

            {/* ✅ Botón confirmar */}
            <Pressable
              onPress={async () => {
                await playSound(SOUNDS.confirm);
                confirmMarkAsPriority();
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
                <Text style={styles.confirmText}>Priority</Text>
              </Animated.View>
            </Pressable>

          </View>
        </View>
      </Modal>
    </View>
    
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#590836ff",
    padding: 20,
  },
  card: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 13,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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