import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabLayout from './_layout';
import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/styleComponents/ParallaxScrollView";
import { ThemedText } from "@/components/styleComponents/ThemedText";
import { ThemedView } from "@/components/styleComponents/ThemedView";
import { useEffect, useState } from "react";
import axios from "axios";
import { Participante } from "@/interfaces";
import CerrarSesion from "@/components/CerrarSesion";

export default function App() {
  const [participante, setParticipante] = useState<Participante>();
  useEffect(() => {
    const getData = async () => {
      try {
        const participanteData = await axios.get(
          "http://10.0.2.2:3000/usuarios/1"
        );
        setParticipante(participanteData.data.data);
      } catch (error) {
        console.log(1)
        console.error(error);
      }
    };
    getData();
  }, []);
  return (
    <SafeAreaProvider>
      <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          {participante?.NOMBRES +
            " " +
            participante?.APELLIDO_PATERNO +
            " " +
            participante?.APELLIDO_MATERNO}
        </ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      <CerrarSesion/>
    </ParallaxScrollView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
