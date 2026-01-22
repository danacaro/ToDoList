import { getButtonColor, getButtonType } from "@/utils/buttons";
import { playSound } from "@/utils/playSound.js";
import { SOUNDS } from "@/utils/sounds";
import { getBackgroundColorByType } from "@/utils/taskStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function TaskItem({ 
  task, 
  onOpenConfirm, 
  isRemoving, 
  onRemoveAnimationEnd, 
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  console.log("TASSSK:", task);

  //Delete animation

  useEffect(() => {
    if (!isRemoving) return;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onRemoveAnimationEnd();
    });
  }, [isRemoving]);

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
    outputRange: getButtonColor(task.status),
  });

  console.log(getButtonColor(task.status), task.status);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ scale }],
      }}
    >
      <View
        style={{
          padding: 16,
          marginBottom: 12,
          borderRadius: 8,
          backgroundColor: getBackgroundColorByType(task.area),
          shadowColor: "#000000ff",
          shadowOffset: { width: 0, height: 9 },
          shadowOpacity: 0.25,
          shadowRadius: 2,
        }}
      >
        {/* FILA */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
            {task.name}
            </Text>
          </View>

          <Pressable
            style={styles.button}
            onPress={async () => {
              await playSound(SOUNDS.click);
              onOpenConfirm();
            }}
            onPressIn={pressIn}
            onPressOut={pressOut}
          >
            <Animated.View
              style={[
                styles.button,
                {
                  transform: [{ scale }],
                  backgroundColor: bgColor,
                },
              ]}
            >
              <Ionicons
                name={getButtonType(task.status)}
                size={44}
                color="white"
                style={styles.icon}
              />
            </Animated.View>
          </Pressable>
        </View>
        <Text style={{ color: "#000" }}>Status: {task.status}</Text>
        <Text style={{ color: "#000" }}>Priority: {task.priority}</Text>
      </View>
    </Animated.View>
    
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
