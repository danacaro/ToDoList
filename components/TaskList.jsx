import { useState } from "react";
import { FlatList, View } from "react-native";
import ConfirmModal from "./ConfirmModal";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onTaskPress, onTaskDeleted, }) {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTaskStatus, setSelectedTaskStatus] = useState(null);
  const [selectedTaskName, setSelectedTaskName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [removingTaskId, setRemovingTaskId] = useState(null);

  const openConfirmModal = (taskId, taskStatus, taskName) => {
    setSelectedTaskId(taskId);
    setSelectedTaskStatus(taskStatus);
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
            onOpenConfirm={() => openConfirmModal(item.id, item.status, item.name)}
            isRemoving={item.id === removingTaskId}
            onRemoveAnimationEnd={() => {
              onTaskDeleted(item.id);
              setRemovingTaskId(null);
              onCelebrate();
            }}
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
        status= {selectedTaskStatus}
        onClose={() => setModalVisible(false)}
        onConfirmed={() => {
          setRemovingTaskId(selectedTaskId);
          setModalVisible(false);
        }}
      />
    </View>
  );
}
