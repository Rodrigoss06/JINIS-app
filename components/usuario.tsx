import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from "axios";
import { Participante, TipoDocumento, TipoUsuario } from "@/interfaces";
import { useNavigation } from '@react-navigation/native'; // Asegúrate de tener react-navigation instalado y configurado
import { Link } from "expo-router";

export default function Usuario({ usuario }: { usuario: Participante }) {
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento>();
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>();
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        const tipoDocumentoResponse = await axios.get(`https://jinis-api.vercel.app/tipo-documento/${usuario.ID_TIPO_DOCUMENTO}`);
        setTipoDocumento(tipoDocumentoResponse.data.data);

        const tipoUsuarioResponse = await axios.get(`https://jinis-api.vercel.app/tipos-usuarios/${usuario.ID_TIPO_USUARIO}`);
        setTipoUsuario(tipoUsuarioResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [usuario.ID_TIPO_DOCUMENTO, usuario.ID_TIPO_USUARIO]);

  return (
    <View style={styles.container}>
      {tipoDocumento && tipoUsuario ? (
        <View style={styles.userCard}>
          <Text style={styles.userName}>{usuario.NOMBRES} {usuario.APELLIDO_PATERNO} {usuario.APELLIDO_MATERNO}</Text>
          <Text style={styles.userDetail}>DNI: {usuario.DNI}</Text>
          <Text style={styles.userDetail}>Tipo de Usuario: {tipoUsuario.DESCRIPCION}</Text>
          <Link href={`/usuarios/${usuario.ID_USUARIO}`} style={styles.linkButton}>
          <Text style={styles.linkText}>Ver detalles</Text>
          </Link>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  linkButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#6200ea",
    borderRadius: 5,
  },
  linkText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
