import ParallaxScrollView from "@/components/styleComponents/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Image, Platform } from 'react-native';
import React from "react";
import QRCode from "react-qr-code";

export default function Eventos() {
  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
    headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}
    >
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={"12"}
        viewBox={`0 0 256 256`}
      />
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
    headerImage: {
      color: '#808080',
      bottom: -90,
      left: -35,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8,
    },
  });