import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Participante } from "@/interfaces";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import EscanerQR from "@/components/EscanerQr";

export default function RegistrarComida() {
  const [showCamera, setShowCamera] = useState(false);
  const [dni, setDni] = useState("");
  const [usuario, setUsuario] = useState<Participante>();
  const [error, setError] = useState("");

  const verificarUsuario = async () => {
    try {
      const usuarioResponse = await axios.get(
        `https://jinis-api.vercel.app/usuarios/dni/${dni}`
      );
      console.log(usuarioResponse.data);
      setUsuario(usuarioResponse.data.data);
    } catch (error) {
      console.log(error);
      setError("El usuario no existe");
    }
  };

  useEffect(() => {
    verificarUsuario();
  }, [dni]);

  const handleSubmit = async () => {
    try {
      console.log(usuario);
      const response = await axios.post(
        "https://jinis-api.vercel.app/comidas/registro",
        { usuarioId: usuario?.ID_USUARIO }
      );
      console.log(response);
      if (response.status === 201) {
        alert("¡Éxito!");
      }
    } catch (error) {
      console.log(error);
      setError("Registro fallido");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Comidas</Text>
      {error !== "" && <Text style={styles.errorText}>{error}</Text>}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="DNI"
          value={dni}
          onChangeText={(e) => {
            setDni(e);
          }}
        />
        <Pressable style={styles.qrButton} onPress={() => setShowCamera(true)}>
          <Ionicons name="qr-code" size={24} color="white" />
        </Pressable>
      </View>
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Registrar</Text>
      </Pressable>
      <Modal visible={showCamera} transparent>
        <EscanerQR
          setShowCamera={() => setShowCamera(!showCamera)}
          setData={setDni}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems:"center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  qrButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
});
