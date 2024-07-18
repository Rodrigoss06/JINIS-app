import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Modal,
  FlatList,
  Button,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import { ThemedView } from "@/components/styleComponents/ThemedView";
import axios from "axios";
import { Evento, Participante } from "@/interfaces";
import EscanerQR from "@/components/EscanerQr";
import { Ionicons } from "@expo/vector-icons";

function RegistrarAsistencia() {
  const [showCamera,setShowCamera]= useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento>();
  const [usuario, setUsuario] = useState<Participante>();
  const [eventosAsistidos, setEventosAsistidos] = useState();
  const [DNI, setDNI] = useState("");

  const handleSubmit = async () => {
    try {
      const usuarioResponse = await axios.get(
        `https://jinis-api.vercel.app/usuarios/dni/${DNI}`
      );
      if (usuarioResponse) {
        const asistenciaResponse = await axios.post(
          "https://jinis-api.vercel.app/asistencia",
          {
            usuarioId: usuarioResponse.data.data.ID_USUARIO,
            eventoId: eventoSeleccionado?.ID_EVENTO,
          }
        );
        if (asistenciaResponse) {
          alert("asistencia marcada");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const eventosData = await axios.get("https://jinis-api.vercel.app/eventos");
      setEventos(eventosData.data.data);
    };
    getData();
  }, []);
  useEffect(() => {
    if (DNI) {
      const fetchUsuario = async () => {
        try {
          const Usuarioresponse = await axios.get(`https://jinis-api.vercel.app/usuarios/dni/${DNI}`);
          setUsuario(Usuarioresponse.data.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUsuario();
    }
  }, [DNI]);


  return (
    <ThemedView style={styles.container}>
    <Text style={styles.title}>Registrar Asistencia</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="DNI"
        value={DNI}
        onChangeText={setDNI}
      />
      <Pressable onPress={() => setShowCamera(true)} style={styles.icon}>
        <Ionicons name="qr-code" size={24} />
      </Pressable>
    </View>
    <Pressable onPress={() => setIsModalVisible(true)} style={styles.eventSelector}>
      <Text>{eventoSeleccionado ? eventoSeleccionado.NOMBRE : "Seleccionar Evento"}</Text>
    </Pressable>
    <Pressable onPress={handleSubmit} style={styles.button}>
      <Text style={styles.buttonText}>Registrar</Text>
    </Pressable>
    <Modal visible={isModalVisible} transparent>
      <View style={styles.modalContent}>
        <FlatList
          data={eventos}
          keyExtractor={(item) => String(item.ID_EVENTO)}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setEventoSeleccionado(item);
                setIsModalVisible(false);
              }}
              style={styles.item}
            >
              <Text>{item.NOMBRE}</Text>
            </Pressable>
          )}
        />
        <Button title="Cerrar" onPress={() => setIsModalVisible(false)} />
      </View>
    </Modal>
    <Modal visible={showCamera} transparent>
      <EscanerQR setShowCamera={()=>setShowCamera(!showCamera)} setData={setDNI} />
    </Modal>
      {usuario && (
        <View style={styles.userInfo}>
          <Text style={styles.userInfoTitle}>Información del Usuario</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Nombre:</Text>
              <Text style={styles.tableCell}>{usuario.NOMBRES}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Apellido Paterno:</Text>
              <Text style={styles.tableCell}>{usuario.APELLIDO_PATERNO}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Apellido Materno:</Text>
              <Text style={styles.tableCell}>{usuario.APELLIDO_MATERNO}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>DNI:</Text>
              <Text style={styles.tableCell}>{usuario.DNI}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Correo Electrónico:</Text>
              <Text style={styles.tableCell}>{usuario.CORREO_ELECTRONICO}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Teléfono:</Text>
              <Text style={styles.tableCell}>{usuario.TELEFONO}</Text>
            </View>
          </View>
        </View>
      )}
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  icon: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  eventSelector: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  userInfo: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default RegistrarAsistencia;
