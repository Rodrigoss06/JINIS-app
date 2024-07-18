import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, View } from "react-native";
import ParallaxScrollView from "@/components/styleComponents/ParallaxScrollView";
import { ThemedText } from "@/components/styleComponents/ThemedText";
import { ThemedView } from "@/components/styleComponents/ThemedView";
import { useEffect, useState } from "react";
import axios from "axios";
import { Participante } from "@/interfaces";
import CerrarSesion from "@/components/CerrarSesion";
import { Link } from 'expo-router';

export default function App() {
  const [usuario, setUsuario] = useState<Participante>();

  useEffect(() => {
    const getData = async () => {
      try {
        const participanteData = await axios.get("https://jinis-api.vercel.app/usuarios/1");
        setUsuario(participanteData.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <SafeAreaProvider>

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">
            {usuario ? `${usuario.NOMBRES} ${usuario.APELLIDO_PATERNO} ${usuario.APELLIDO_MATERNO}` : 'Cargando...'}
          </ThemedText>
          <ThemedText type='title'>
            Administrador
          </ThemedText>
        </ThemedView>

        {/* Sección de Perfil */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle">Información de Perfil</ThemedText>
          <Text>DNI: {usuario?.DNI}</Text>
          <Text>Email: {usuario?.CORREO_ELECTRONICO}</Text>
          <Text>Teléfono: {usuario?.TELEFONO}</Text>
          {/* Más campos aquí */}
        </ThemedView>

        {/* Sección para añadir más datos */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle"></ThemedText>
          {/* Datos de la Sección 2 aquí */}
        </ThemedView>

        {/* Otras Secciones */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle">Sección 3: [Título]</ThemedText>
          {/* Datos de la Sección 3 aquí */}
        </ThemedView>

        <CerrarSesion />

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: '#f0f0f0'
  },
  sectionContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  reactLogo: {
    height: 178,
    width: 290,
    resizeMode: 'cover'
  },
});
