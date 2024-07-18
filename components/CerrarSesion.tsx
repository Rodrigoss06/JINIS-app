import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';


const CerrarSesion = () => {
  const router = useRouter()
  const {onLogout} =useAuth()
  const handleLogout = async () => {
    try {
      onLogout!()
      // router.navigate('login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </Pressable>
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
