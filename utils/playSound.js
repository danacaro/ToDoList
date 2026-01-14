import { Audio } from "expo-av";

let isPlaying = false; // evita spam de sonidos

export const playSound = async (soundFile, onFinish) => {
  if (isPlaying) return;
  isPlaying = true;

  const { sound } = await Audio.Sound.createAsync(soundFile);

  try {
    await sound.playAsync();
  } catch (error) {
    console.warn("Error playing sound:", error);
    isPlaying = false;
  }

  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.didJustFinish) {
      sound.unloadAsync(); // 🔥 libera memoria
      isPlaying = false;

      if (onFinish) {
        onFinish(); // callback opcional
      }
    }
  });
};
