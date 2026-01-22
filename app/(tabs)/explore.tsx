import { useEffect, useState } from "react";
import { View } from "react-native";
import TaskList from "../../components/TaskList";
import { fetchTasks } from "../../src/tasks.js";

export default function TasksScreen2() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTasks({ status: "Blocked"})
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
        backgroundColor: "#3a3a3aff",
      }}
    >
      <TaskList tasks={data} onTaskPress={() => {}} />
    </View>
  );
}
