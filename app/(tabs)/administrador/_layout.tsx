import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeAdministrador from "./index";
import Eventos from "./eventos";
import Usuarios from "./usuarios";

const Tab = createBottomTabNavigator()
export default function TabLayoutAdministrador() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tab.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
        component={HomeAdministrador}
      />
      <Tab.Screen
        name="eventos"
        options={{
          title: 'Eventos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
        component={Eventos}
      />
      <Tab.Screen
      name="usuarios"
      options={{
        title: 'Usuarios',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
        ),
      }}
      component={Usuarios}
    />

    </Tab.Navigator>
  );
}
