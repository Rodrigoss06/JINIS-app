import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../app/_layout'; // Ajusta la ruta según tu estructura

type LogoutScreenNavigationProp = StackNavigationProp<RootStackParamList, '(tabs)/login'>;

const CerrarSesion = () => {
  const navigation = useNavigation<LogoutScreenNavigationProp>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token_login');
      navigation.navigate('(tabs)/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CerrarSesion;
