import { useEffect, useState } from "react";
import { View } from "react-native";
import TaskList from "../../components/TaskList";
import { fetchTasks } from "../../src/tasks.js";

export default function TasksScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTasks({ status: "Priority", type: "Work" })
      .then((data) => {
        console.log("DATA FROM API:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("FETCH ERROR:", error);
      });
  }, []);

  console.log("TasksScreen render");

  return (
    <View
      style={{
        backgroundColor: "#503b50ff",
        flex: 1,
      }}
    >
      <TaskList tasks={data} onTaskPress={() => {}} />
    </View>
  );
}
