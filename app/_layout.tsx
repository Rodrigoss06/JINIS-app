import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './(tabs)/login';
import TabLayoutAdministrador from "./(tabs)/administrador/_layout";
import TabLayoutColaborador from "./(tabs)/colaborador/_layout";
import TabLayoutUsuario from "./(tabs)/usuario/_layout";

export type RootStackParamList = {
  "(tabs)/login": undefined;
  "(tabs)/usuario": undefined;
  "(tabs)/administrador": undefined;
  "(tabs)/colaborador": undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    
      <Stack.Navigator initialRouteName="(tabs)/login">
        <Stack.Screen name="(tabs)/login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="(tabs)/usuario" component={TabLayoutUsuario} options={{ headerShown: false }}/>
        <Stack.Screen name="(tabs)/administrador" component={TabLayoutAdministrador} options={{ headerShown: false }}/>
        <Stack.Screen name="(tabs)/colaborador" component={TabLayoutColaborador} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}

export default AppNavigator;
