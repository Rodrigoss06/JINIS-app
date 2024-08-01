import { StyleSheet, Text, View, FlatList, Pressable, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Evento, EventoAsistido, Participante } from "@/interfaces";
import axios from "axios";

const { width } = Dimensions.get("window");

export default function CertificadoJinis() {
  const [usuarios, setUsuarios] = useState<Participante[]>([]);
  const [eventosAsistidos, setEventosAsistidos] = useState<EventoAsistido[]>([]);
  const [isDisabled, setIsDisabled] = useState(new Date('2024-10-30') > new Date());
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    const getData = async () => {
      const usuariosResponse = await axios.get(
        "https://jinis-api.vercel.app/usuarios"
      );
      setUsuarios(usuariosResponse.data.data);
      const eventosAsistidosResponse = await axios.get(
        "https://jinis-api.vercel.app/eventos-asistidos"
      );
      setEventosAsistidos(eventosAsistidosResponse.data.data);
      const eventosResponse = await axios.get(
        "https://jinis-api.vercel.app/eventos"
      );
      setEventos(eventosResponse.data.data);
    };
    getData();
  }, []);

  // Función para calcular el porcentaje de asistencia
  const calculateAttendancePercentage = (usuario: Participante) => {
    return (
      ((eventosAsistidos?.filter(evento => evento.ID_USUARIO === usuario.ID_USUARIO).length / eventos?.length) * 100).toFixed(2)
    );
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.generalData}>
        <Text style={styles.title}>Configuraciones de envíos de Jinis</Text>
        <View style={styles.stats}>
          <Text style={styles.statText}>Total de estudiantes: {usuarios?.length}</Text>
          <Text style={styles.statText}>Total de eventos: {eventos.length}</Text>
          <Text style={styles.statText}>
            Usuarios con el 80% de asistencia: {usuarios.filter((usuario) => (
              (eventosAsistidos?.filter(evento => evento.ID_USUARIO === usuario.ID_USUARIO).length / eventos?.length) * 100 >= 80
            )).length}
          </Text>
        </View>
        <Pressable style={[styles.button, isDisabled ? styles.disabledButton : styles.enabledButton]} disabled={isDisabled}>
          <Text style={styles.buttonText}>Enviar certificados</Text>
        </Pressable>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Nombre</Text>
          <Text style={styles.headerText}>Apellido</Text>
          <Text style={styles.headerText}>DNI</Text>
          <Text style={styles.headerText}>Correo</Text>
          <Text style={styles.headerText}>% Asistencia</Text>
        </View>
        <FlatList
          data={usuarios}
          keyExtractor={(item) => String(item.ID_USUARIO)}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.NOMBRES}</Text>
              <Text style={styles.tableCell}>{item.APELLIDO_PATERNO}</Text>
              <Text style={styles.tableCell}>{item.DNI}</Text>
              <Text style={styles.tableCell}>{item.CORREO_ELECTRONICO}</Text>
              <Text style={styles.tableCell}>
                {calculateAttendancePercentage(item)}%
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: width > 600 ? "row" : "column", // Cambia la dirección de flex en función del ancho de la pantalla
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  generalData: {
    width: width > 600 ? "40%" : "100%", // Ajusta el ancho en función del tamaño de la pantalla
    paddingRight: width > 600 ? 20 : 0,
    marginBottom: width > 600 ? 0 : 20, // Añade margen inferior para dispositivos móviles
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  stats: {
    marginBottom: 20,
  },
  statText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  enabledButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tableContainer: {
    width: width > 600 ? "60%" : "100%", // Ajusta el ancho en función del tamaño de la pantalla
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#007bff",
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007bff",
    fontSize: width > 600 ? 14 : 12, // Ajusta el tamaño de la fuente en función del tamaño de la pantalla
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    color: "#333",
    fontSize: width > 600 ? 14 : 12, // Ajusta el tamaño de la fuente en función del tamaño de la pantalla
  },
});
