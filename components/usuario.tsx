import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Participante } from "@/interfaces";
import { Link } from "expo-router";

interface UsuarioProps {
  usuario: Participante;
  tipoDocumento?: string;
  tipoUsuario?: string;
}

export default function Usuario({ usuario, tipoDocumento, tipoUsuario }: UsuarioProps) {
  return (
    <View style={styles.userCard}>
      <Text style={styles.userName}>
        {usuario.NOMBRES} {usuario.APELLIDO_PATERNO} {usuario.APELLIDO_MATERNO}
      </Text>
      <Text style={styles.userDetail}>DNI: {usuario.DNI}</Text>
      <Text style={styles.userDetail}>Tipo de Documento: {tipoDocumento}</Text>
      <Text style={styles.userDetail}>Tipo de Usuario: {tipoUsuario}</Text>
      <Link href={`/usuarios/${usuario.ID_USUARIO}`} style={styles.linkButton}>
        <Text style={styles.linkText}>Ver detalles</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  userCard: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginVertical: 12, // Reduce el margen vertical entre tarjetas
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userDetail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  linkButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#6200ea",
    borderRadius: 5,
  },
  linkText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
