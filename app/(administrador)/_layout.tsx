import React, { useEffect } from "react";
import { Redirect, Tabs } from "expo-router";
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
          href:null,
          
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
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
          href:null,
          title: "Usuario detalles",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "people" : "people-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="registrarAsistencia"
        options={{
          title: 'Registro Asistencia',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'checkmark' : 'checkmark-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="registrarComida"
        options={{
          title: 'Registro Comida',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'checkmark' : 'checkmark-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="codigoQR"
        options={{
          title: "CodigoQR",
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
