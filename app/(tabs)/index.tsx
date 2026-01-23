import { useEffect, useState } from "react";
import { View } from "react-native";
import Confetti from "../../components/Confetti";
import TaskList from "../../components/TaskList";
import { fetchTasks } from "../../src/tasks.js";

export default function TasksScreen() {
  const [data, setData] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);


  const handleTaskDeleted = (taskId) => {
    setData(prev => prev.filter(t => t.id !== taskId));
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1200);
  };

  useEffect(() => {
    fetchTasks({ status: "To Do"})
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
      <TaskList 
      tasks={data} 
      onTaskPress={() => {}} 
      onTaskDeleted={handleTaskDeleted}
      onCelebrate={triggerConfetti}
      />

      {showConfetti && <Confetti />}
    </View>
  );
}
