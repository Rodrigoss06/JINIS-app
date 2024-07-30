import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Participante, TipoDocumento, TipoUsuario } from "@/interfaces";
import axios from "axios";
import Usuario from "@/components/usuario";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Participante[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tiposDocumento, setTiposDocumento] = useState<Map<number, string>>(
    new Map()
  );
  const [tiposUsuario, setTiposUsuario] = useState<Map<number, string>>(
    new Map()
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const [usuariosResponse, tiposDocumentoResponse, tiposUsuarioResponse] =
          await Promise.all([
            axios.get("https://jinis-api.vercel.app/usuarios"),
            axios.get("https://jinis-api.vercel.app/tipo-documento"),
            axios.get("https://jinis-api.vercel.app/tipos-usuarios"),
          ]);

        setUsuarios(usuariosResponse.data.data);

        // Crear un mapa de tipos de documento
        const docMap = new Map<number, string>();
        tiposDocumentoResponse.data.data.forEach((tipo: TipoDocumento) => {
          docMap.set(tipo.ID_TIPO_DOCUMENTO, tipo.DESCRIPCION);
        });
        setTiposDocumento(docMap);

        // Crear un mapa de tipos de usuario
        const userMap = new Map<number, string>();
        tiposUsuarioResponse.data.data.forEach((tipo: TipoUsuario) => {
          userMap.set(tipo.ID_TIPO_USUARIO, tipo.DESCRIPCION);
        });
        setTiposUsuario(userMap);
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
      {usuarios.map((usuario) => (
        <Usuario
          key={usuario.ID_USUARIO}
          usuario={usuario}
          tipoDocumento={tiposDocumento.get(usuario.ID_TIPO_DOCUMENTO)}
          tipoUsuario={tiposUsuario.get(usuario.ID_TIPO_USUARIO)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8, // Reduce el espacio lateral
    paddingVertical: 12, // Reduce el espacio superior e inferior
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
    marginBottom: 10, // Reduce el espacio debajo del título
    textAlign: "center",
    color: "#333",
  },
});
