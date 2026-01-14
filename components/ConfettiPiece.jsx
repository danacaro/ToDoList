import { useEffect } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export function ConfettiPiece({ color }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(
      Math.random() * 300 - 150,
      { duration: 800 }
    );

    translateY.value = withTiming(
      Math.random() * 600 + 300,
      { duration: 1200 }
    );

    rotate.value = withTiming(
      Math.random() * 720,
      { duration: 1200 }
    );

    opacity.value = withTiming(0, { duration: 1200 });
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: 8,
          height: 14,
          backgroundColor: color,
          borderRadius: 2,
        },
        style,
      ]}
    />
  );
}
