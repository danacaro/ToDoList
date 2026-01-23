import { useEffect, useMemo } from "react";
import { Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export function ConfettiPiece({ color }) {
  const startX = useMemo(() => Math.random() * width, []);
  const startY = useMemo(
    () => -Math.random() * height * 0.4,
    []
  );

  const delay = useMemo(() => Math.random() * 400, []);


  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(
      Math.random() * width - width / 2,
      { duration: 1200 }
    );

    translateY.value = withTiming(
      height + Math.random() * 200,
      { duration: 1400, delay }
    );

    rotate.value = withTiming(
      Math.random() * 1080,
      { duration: 1400 }
    );

    opacity.value = withTiming(0, { duration: 1400 });
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
          left: startX,
          top: startY,
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
