import ParallaxScrollView from "@/components/styleComponents/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from "react";
import CodigoQR from "@/components/CodigoQR";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Participante } from "@/interfaces";

export default function CodigoQRPage() {
  const [usuario, setUsuario] = useState<Participante>();

  useEffect(() => {
    const getUsuario = async () => {
      const token = await AsyncStorage.getItem("token_login");
      if (token !== null) {
        const token_login = JSON.parse(token);
        const usuarioData = await axios.get(`https://jinis-api.vercel.app/usuarios/${token_login.id}`);
        setUsuario(usuarioData.data.data);
      }
    };
    getUsuario();
  }, []);

  return (

      <View style={styles.contentContainer}>
        {usuario !== undefined ? (
          <CodigoQR usuario={usuario} />
        ) : (
          <Text style={styles.errorText}>...</Text>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  contentContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    marginTop: 20,
  },
  qrContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  qrText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
