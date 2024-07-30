import React, { useEffect } from "react";
import { Tabs } from "expo-router"; // Eliminamos `Redirect` porque no parece ser utilizado en este fragmento
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayoutAdministrador() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="eventos/index"
        options={{
          title: "Eventos",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="eventos/[id]"
        options={{
          title: "Evento Detalle",
          href: null,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "information" : "information-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="usuarios/index"
        options={{
          title: "Usuarios",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "people" : "people-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="usuarios/[id]"
        options={{
          href: null,
          title: "Usuario Detalles",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="registrarAsistencia"
        options={{
          title: "Asistencia",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "checkmark-circle" : "checkmark-circle-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="registrarComida"
        options={{
          title: "Comida",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "restaurant" : "restaurant-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
  name="certificadoJinis"
  options={{
    title: "Certificados",
    tabBarIcon: ({ color, focused }) => (
      <TabBarIcon
        name={focused ? "ribbon" : "ribbon-outline"} // Cambia aquí el nombre del icono
        color={color}
      />
    ),
  }}
/>

      <Tabs.Screen
        name="codigoQR"
        options={{
          title: "Código QR",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "qr-code" : "qr-code-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
