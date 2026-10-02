import { Link, Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable } from 'react-native';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
  name="index"
  options={{
    title: 'Tab One',
    headerShown: false,
    tabBarIcon: ({ color }) => (
      <SymbolView
        name={{
          ios: 'chevron.left.forwardslash.chevron.right',
          android: 'code',
          web: 'code',
        }}
        tintColor={color}
        size={28}
      />
    ),
  }}
/>


      <Tabs.Screen
        name="destinations"
        options={{
          title: 'Destinations',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'map',
                android: 'map',
                web: 'map',
              }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}