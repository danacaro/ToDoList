import { playSound } from "@/utils/playSound.js";
import { SOUNDS } from "@/utils/sounds";
import { getBackgroundColorByType, getIconByType } from "@/utils/taskStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AddTaskScreen() {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [area, setArea] = useState("Work");
  const [status, setStatus] = useState("Not started");
  const [openPicker, setOpenPicker] = useState<OpenPicker>(null);
  const [due, setDue] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const iconScale = useRef(new Animated.Value(0)).current;

  type OpenPicker = "priority" | "area" | "status" | null;

  useFocusEffect(
    useCallback(() => {
      resetForm();
    }, []),
  );

  useEffect(() => {
    if (!area) return;

    iconScale.setValue(0);

    Animated.spring(iconScale, {
      toValue: 1,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [area]);

  const resetForm = () => {
    setName("");
    setDue(null);
    setPriority("Low");
    setArea("Null");
    setStatus("Not started");
    setOpenPicker(null);
    setShowDatePicker(false);
  };

  const SectionHeader = ({ label, value, onPress }) => (
    <Pressable onPress={onPress} style={styles.sectionHeader}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <Text style={styles.sectionValue}>{value}</Text>
    </Pressable>
  );

  const handleAddTask = () => {
    const newTask = {
      name,
      area,
      due,
      priority,
      //type,
      status,
    };

    console.log("NEW TASK:", newTask);
    // aquí luego llamas a tu backend
  };

  return (
    <View style={styles.screen}>
      <Animated.View
        style={{
          transform: [{ scale: iconScale }],
          opacity: iconScale,
        }}
      >
        {getIconByType(area) ? (
          <Ionicons name={getIconByType(area)} size={82} color="#fff" />
        ) : (
          <Text style={styles.title}>New task!</Text>
        )}
      </Animated.View>

      <View
        style={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 16,
          padding: 20,

          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.25,
          shadowRadius: 6,
          elevation: 8,
          backgroundColor: getBackgroundColorByType(area),
        }}
      >
        {/* NAME */}
        <TextInput
          style={styles.NameInput}
          placeholder="Name..."
          value={name}
          onChangeText={setName}
        />

        {/* TYPE */}
        <SectionHeader
          label="Area"
          value={area}
          onPress={() => setOpenPicker(openPicker === "area" ? null : "area")}
        />

        {openPicker === "area" && (
          <Picker
            selectedValue={area}
            onValueChange={async (value) => {
              setArea(value);
              await playSound(SOUNDS.icon);
              setOpenPicker(null);
            }}
          >
            <Picker.Item label="Professional" value="Professional" />
            <Picker.Item label="Responsabilities" value="Responsabilities" />
            <Picker.Item label="Health & Beauty" value="Health & Beauty" />
            <Picker.Item label="Personal" value="Personal" />
            <Picker.Item label="Finance" value="Finance" />
            <Picker.Item label="Traveling" value="Traveling" />
            <Picker.Item label="Social" value="Social" />
            <Picker.Item label="Home" value="Home" />
          </Picker>
        )}

        {/* DUE */}
        <Pressable
          style={styles.sectionHeader}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.sectionLabel}>Due</Text>
          <Text style={styles.sectionValue}>
            {due ? due.toLocaleDateString() : "Select date"}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={due ?? new Date()}
            mode="date"
            display="spinner" // 👈 wheel en iOS
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);

              if (event.type === "set" && selectedDate) {
                setDue(selectedDate);
              }
            }}
          />
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        ></View>

        {/* PRIORITY */}
        <SectionHeader
          label="Priority"
          value={priority}
          onPress={() =>
            setOpenPicker(openPicker === "priority" ? null : "priority")
          }
        />

        {openPicker === "priority" && (
          <Picker
            selectedValue={priority}
            onValueChange={(value) => {
              setPriority(value);
              setOpenPicker(null);
            }}
          >
            <Picker.Item label="High" value="High" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Low" value="Low" />
          </Picker>
        )}

        {/* STATUS */}
        <SectionHeader
          label="Status"
          value={status}
          onPress={() =>
            setOpenPicker(openPicker === "status" ? null : "status")
          }
        />

        {openPicker === "status" && (
          <Picker
            selectedValue={status}
            onValueChange={(value) => {
              setStatus(value);
              setOpenPicker(null);
            }}
          >
            <Picker.Item label="Done" value="Done" />
            <Picker.Item label="Priority" value="Priority" />
            <Picker.Item label="Not started" value="Not started" />
          </Picker>
        )}

        {/* BUTTON */}
        <Pressable style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#3a3a3aff",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 16,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  NameInput: {
    fontWeight: "bold",
    borderRadius: 8,
    fontSize: 30,
    marginBottom: 14,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#235523ff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  sectionLabel: {
    fontWeight: "600",
    fontSize: 16,
  },
  sectionValue: {
    color: "#666",
  },
});
