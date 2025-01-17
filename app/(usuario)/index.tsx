import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, ScrollView, Pressable, Dimensions } from "react-native";
import { ThemedText } from "@/components/styleComponents/ThemedText";
import { ThemedView } from "@/components/styleComponents/ThemedView";
import { useEffect, useState } from "react";
import axios from "axios";
import { Evento, EventoAsistido, Participante } from "@/interfaces";
import CerrarSesion from "@/components/CerrarSesion";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

export default function App() {
  const [usuario, setUsuario] = useState<Participante>();
  const [eventosAsistidos, setEventosAsistidos] = useState<EventoAsistido[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [maxEventos, setMaxEventos] = useState(2);

  const getEventoNombre = (idEvento: number) => {
    const evento = eventos.find((e) => e.ID_EVENTO === idEvento);
    return evento ? evento.NOMBRE : "Evento no encontrado";
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem("token_login");
        if (token !== null) {
          const tokenValue = JSON.parse(token);
          console.log(tokenValue)
          const participanteData = await axios.get(`https://jinis-api.vercel.app/usuarios/${tokenValue.id}`);
          setUsuario(participanteData.data.data);
          const eventosAsistidosResponse = await axios.get("https://jinis-api.vercel.app/eventos-asistidos");
          console.log(eventosAsistidosResponse)
          const eventosAsistidosFilter = eventosAsistidosResponse.data.data.filter(
            (eventoAsistido: EventoAsistido) => eventoAsistido.ID_USUARIO === Number(tokenValue.id)
          );
          console.log(eventosAsistidosFilter)
          setEventosAsistidos(eventosAsistidosFilter);
          console.log(222222222)
          const eventosResponse = await axios.get("https://jinis-api.vercel.app/eventos");
          console.log(eventosResponse)
          setEventos(eventosResponse.data.data);
        }
      } catch (error) {
        console.log(11111111111111)
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">
            {usuario ? `${usuario.NOMBRES} ${usuario.APELLIDO_PATERNO} ${usuario.APELLIDO_MATERNO}` : 'Cargando...'}
          </ThemedText>

        </ThemedView>

        {/* Sección de Perfil */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle">Información de Perfil</ThemedText>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>DNI:</Text>
              <Text style={styles.tableCell}>{usuario?.DNI}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Email:</Text>
              <Text style={styles.tableCell}>{usuario?.CORREO_ELECTRONICO}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Teléfono:</Text>
              <Text style={styles.tableCell}>{usuario?.TELEFONO}</Text>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText style={styles.subtitle} type="subtitle">Eventos Asistidos</ThemedText>
          <View style={styles.section}>
            {eventosAsistidos.slice(0, maxEventos).map((eventoAsistido) => (
              <View key={eventoAsistido.ID_EVENTO_ASISTIDO} style={styles.eventItem}>
                <Text style={styles.eventItemText}>
                  {getEventoNombre(eventoAsistido.ID_EVENTO)}
                </Text>
                <Text style={styles.eventItemDate}>
                  Fecha de Asistencia: {new Date(eventoAsistido.FECHA_ASISTENCIA).toLocaleDateString()}
                </Text>
              </View>
            ))}
            {eventosAsistidos.length > maxEventos && (
              <Pressable style={styles.showMoreButton} onPress={() => setMaxEventos(maxEventos + 4)}>
                <Text style={styles.showMoreButtonText}>Mostrar Más</Text>
              </Pressable>
            )}
          </View>
        </ThemedView>
        <CerrarSesion />
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: '5%', 
    paddingVertical: 20,
    maxWidth: '100%',
    minWidth:500 
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 14,
    borderRadius: 15,
    maxWidth: '100%', 
  },
  sectionContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 14,
    borderRadius: 15,
    maxWidth: '100%', 
  },
  tableContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    width: "100%",
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  tableCellLabel: {
    flex: 1,
    fontWeight: 'bold',
    color: '#333',
  },
  tableCell: {
    flex: 2,
    color: '#666'
  },
  section: {
    marginBottom: 16,
  },
  eventItem: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '100%', 
  },
  eventItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  eventItemDate: {
    fontSize: 14,
    color: "#666",
  },
  showMoreButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  showMoreButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 12,
  },
});
