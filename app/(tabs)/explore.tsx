import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  View
} from 'react-native';
import { getBackgroundColorByType } from "../utils/taskStyle";

import { fetchTasks } from "../../backend/api/tasks.js";


export default function TabTwoScreen() {
  const [tasks, setTasks] = useState([]);
    const markAsDone = async () => {}; //implementar
    
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
                  backgroundColor: "#925f36ff",
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Add
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

