import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Modal,
  FlatList,
  Button,
  Dimensions
} from "react-native";
import { ThemedView } from "@/components/styleComponents/ThemedView";
import axios from "axios";
import { Evento, Horario, Participante } from "@/interfaces";
import EscanerQR from "@/components/EscanerQr";
import { Ionicons } from "@expo/vector-icons";

// Obtener las dimensiones de la pantalla
const { width } = Dimensions.get("window");

function RegistrarAsistencia() {
  const [showCamera, setShowCamera] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventosFiltrados, setEventosFiltrados] = useState<Evento[]>([]);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento>();
  const [usuario, setUsuario] = useState<Participante>();
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
          alert("Asistencia marcada");
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
      const horariosResponse = await axios.get("https://jinis-api.vercel.app/horarios");
      setHorarios(horariosResponse.data.data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (DNI) {
      const fetchUsuario = async () => {
        try {
          const usuarioResponse = await axios.get(`https://jinis-api.vercel.app/usuarios/dni/${DNI}`);
          setUsuario(usuarioResponse.data.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUsuario();
    }
  }, [DNI]);

  useEffect(() => {
    // Obtener hora y fecha actual
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);
  
    // Filtrar eventos que tienen un horario válido y que la hora actual esté entre la hora de inicio y fin, y la fecha coincida
    const eventosConHorario = eventos.filter(evento => 
      horarios.some(horario => {
        const horarioFecha = new Date(horario.FECHA).toISOString().split('T')[0];
        const horarioInicio = horario.HORA_INICIO.substring(0, 5);
        const horarioFin = horario.HORA_FIN.substring(0, 5);
  
        return horario.ID_HORARIO === evento.ID_HORARIO &&
               horarioFecha === currentDate &&
               currentTime >= horarioInicio &&
               currentTime <= horarioFin;
      })
    );
    setEventosFiltrados(eventosConHorario);
  }, [eventos, horarios]);

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Registrar Asistencia</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="DNI"
          value={DNI}
          onChangeText={(e) => setDNI(e)}
        />
        <Pressable onPress={() => setShowCamera(true)} style={styles.icon}>
          <Ionicons name="qr-code" size={24} color="#007bff" />
        </Pressable>
      </View>
      <Pressable onPress={() => setIsModalVisible(true)} style={styles.eventSelector}>
        <Text style={styles.eventText}>
          {eventoSeleccionado ? eventoSeleccionado.NOMBRE : "Seleccionar Evento"}
        </Text>
      </Pressable>
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Registrar</Text>
      </Pressable>
      <Modal visible={isModalVisible} transparent>
        <View style={styles.modalContent}>
          <FlatList
            data={eventosFiltrados}
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
        <EscanerQR setShowCamera={() => setShowCamera(!showCamera)} setData={setDNI} />
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
    justifyContent: "flex-start",
    alignItems: "center",
    padding: width * 0.05, // Responsive padding
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    width: "100%",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    width: width * 0.9, // Responsive width
    maxWidth: 600,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
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
    backgroundColor: "#e9ecef",
    alignItems: "center",
    width: width * 0.9, // Responsive width
    maxWidth: 600,
  },
  eventText: {
    color: "#333",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: width * 0.9, // Responsive width
    maxWidth: 600,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    width: width * 0.9, // Responsive width
    maxWidth: 600,
    marginVertical: 5,
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
    width: width * 0.9, // Responsive width
    maxWidth: 600,
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
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
