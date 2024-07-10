import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  FlatList,
  Button,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import { ThemedView } from "@/components/styleComponents/ThemedView";
import axios from "axios";
import { Evento } from "@/interfaces";

function RegistrarAsistencia() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento>();
  const [usuario, setUsuario] = useState("");
  const [eventosAsistidos, setEventosAsistidos] = useState();

  const handleSubmit = async () => {
    try {
      const loginResponse = (
        await axios.post("http://10.0.2.2:3000/login", {
          correo: eventos,
          usuario,
        })
      ).data.token;
    } catch (error) {
      console.log(3);
      console.error(error);
    }
  };
  useEffect(() => {
    const getData = async () => {
      const eventosData = await axios.get("http://10.0.2.2:3000/eventos");
      setEventos(eventosData.data.data);
    };
  }, []);
  return (
    <ThemedView style={styles.contenedor}>
      <Text style={styles.titulo}>Registrar Asistencia</Text>
      <ThemedView style={styles.contenedorFormulario}>
        <View style={styles.contenedorInput}>
          <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
            <Text>
              {eventoSeleccionado
                ? eventoSeleccionado.NOMBRE
                : "SeleccionarEvento"}
            </Text>
          </TouchableOpacity>
          <Modal visible={isModalVisible}>
            <View style={styles.modalContent}>
              <FlatList
                data={eventos}
                keyExtractor={(item) => String(item.ID_EVENTO)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setEventoSeleccionado(item)}
                    style={styles.item}
                  >
                    <Text style={styles.itemText}>{item.NOMBRE}</Text>
                  </TouchableOpacity>
                )}
              />
              <Button title="Cerrar" onPress={()=>setIsModalVisible(!isModalVisible)} />
            </View>
          </Modal>
        </View>
        <View style={styles.contenedorInput}>
          <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
            <Text>
              {eventoSeleccionado
                ? eventoSeleccionado.NOMBRE
                : "SeleccionarEvento"}
            </Text>
          </TouchableOpacity>
          <Modal visible={isModalVisible}>
            <View style={styles.modalContent}>
              <FlatList
                data={eventos}
                keyExtractor={(item) => String(item.ID_EVENTO)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setEventoSeleccionado(item)}
                    style={styles.item}
                  >
                    <Text style={styles.itemText}>{item.NOMBRE}</Text>
                  </TouchableOpacity>
                )}
              />
              <Button title="Cerrar" onPress={()=>setIsModalVisible(!isModalVisible)} />
            </View>
          </Modal>
        </View>
        {/* <View style={styles.contenedorInput}>
          <TextInput
            style={styles.input}
            placeholder="dni"
            onChangeText={(e) => setDni(e)}
          />
        </View> */}

        <View style={styles.contenedorBoton}>
          <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
            <Text>Registrar</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  contenedorFormulario: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  contenedorInput: {
    width: "100%",
    marginBottom: 15,
  },
  contenedorBoton: {
    marginTop: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f8f8f8",
    fontSize: 16,
  },
  boton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectorEvento: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
  },
  selectorEventoTexto: {
    fontSize: 16,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  item: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
});
export default RegistrarAsistencia;
