import { useState } from "react";
import { FlatList, View } from "react-native";
import ConfirmModal from "./ConfirmModal";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onTaskPress }) {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTaskName, setSelectedTaskName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openConfirmModal = (taskId, taskName) => {
    setSelectedTaskId(taskId);
    setSelectedTaskName(taskName);
    setModalVisible(true);
  };

  return (
    <View>
      <FlatList
        style={{ marginTop: 60 }}
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={onTaskPress}
            onOpenConfirm={() => openConfirmModal(item.id, item.name)}
          />
        )}
        contentContainerStyle={{
          padding: 16,
        }}
      />

      <ConfirmModal
        visible={modalVisible}
        taskId={selectedTaskId}
        taskName={selectedTaskName}
        status="Done"
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
