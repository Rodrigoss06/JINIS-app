import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Image,
  Platform,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Participante } from "@/interfaces";
import axios from "axios";
import Usuario from "@/components/usuario";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Participante[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const usuariosResponse = await axios.get(
          "https://jinis-api.vercel.app/usuarios"
        );
        setUsuarios(usuariosResponse.data.data);
      } catch (err) {
        console.log(err);
        setError("Error al cargar los eventos");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      {usuarios?.map((usuario) => (
        <View style={styles.userContainer} key={usuario.ID_USUARIO}>
          <Usuario usuario={usuario} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  userContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
