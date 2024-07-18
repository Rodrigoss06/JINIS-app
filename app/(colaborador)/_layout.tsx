import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeColaborador from "./index";
import RegistrarAsistencia from "./registrarAsistencia";
import CodigoQRPage from './codigoQR';
export default function TabLayoutColaborador() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="registrarAsistencia"
        options={{
          title: 'Registro',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'checkmark' : 'checkmark-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="codigoQR"
        options={{
          title: 'QR',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'qr-code' : 'qr-code-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
