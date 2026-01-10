import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { getBackgroundColorByType } from "../utils/taskStyle";

import { fetchTasks } from "../../backend/api/tasks.js";

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const markAsDone = async () => {}; //implementar
  useEffect(() => {
    fetchTasks("Priority")
      .then((data) => {
        console.log("DATA FROM API:", data);
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("FETCH ERROR:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" />
        <Text style={{ color: "#000" }}>Cargando tareas...</Text>
      </View>
    );
  }

  if (tasks.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ color: "#000", fontSize: 18 }}>
          No hay tareas para mostrar 👀
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#590836ff", marginTop: 50 }}>
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
          backgroundColor: getBackgroundColorByType(item.Type),
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
          <Pressable
            onPress={() => markAsDone(item.id)}
            style={{
              paddingVertical: 20,
              paddingHorizontal: 20,
              backgroundColor: "#1b391bff",
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Done
            </Text>
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
    </View>
  );
}
