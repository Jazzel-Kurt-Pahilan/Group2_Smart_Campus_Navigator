// PRESENTATION LAYER: sets up navigation. Each file in app/ is one screen.
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}