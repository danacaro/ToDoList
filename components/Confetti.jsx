import { View } from "react-native";
import { ConfettiPiece } from "./ConfettiPiece";

const COLORS = ["#00c853", "#ffab00", "#ff5252", "#448aff"];


export default function Confetti() {
  console.log("🎉 Confetti mounted");

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
      }}
    >
      {Array.from({ length: 200 }).map((_, i) => (
        <ConfettiPiece
          key={i}
          color={COLORS[i % COLORS.length]}
        />
      ))}
    </View>
  );
}
