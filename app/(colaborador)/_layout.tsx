import React from 'react';
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Importaciones de tus componentes
import HomeColaborador from './index';
import RegistrarAsistencia from './registrarAsistencia';
import CodigoQRPage from './codigoQR';

export default function TabLayoutColaborador() {
  // Obtener el esquema de color actual (claro u oscuro)
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      {/* Pantalla de inicio */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />

      {/* Registro de Asistencia */}
      <Tabs.Screen
        name="registrarAsistencia"
        options={{
          title: 'Registro Asistencia',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
            name={focused ? "checkmark-circle" : "checkmark-circle-outline"} // Cambiado de "checkmark" a "clipboard-check"
              color={color}
            />
          ),
        }}
      />

      {/* Registro de Comida */}
      <Tabs.Screen
        name="registrarComida"
        options={{
          title: 'Registro Comida',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'fast-food' : 'fast-food-outline'} // Cambiado de "checkmark" a "fast-food"
              color={color}
            />
          ),
        }}
      />

      {/* Página de Código QR */}
      <Tabs.Screen
        name="codigoQR"
        options={{
          title: 'Código QR',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'qr-code' : 'qr-code-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
