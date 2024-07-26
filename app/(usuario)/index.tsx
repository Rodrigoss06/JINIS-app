import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { ThemedText } from "@/components/styleComponents/ThemedText";
import { ThemedView } from "@/components/styleComponents/ThemedView";
import { useEffect, useState } from "react";
import axios from "axios";
import { Evento, EventoAsistido, Participante } from "@/interfaces";
import CerrarSesion from "@/components/CerrarSesion";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          const participanteData = await axios.get(`https://jinis-api.vercel.app/usuarios/${tokenValue.id}`);
          setUsuario(participanteData.data.data);
          const eventosAsistidosResponse = await axios.get("https://jinis-api.vercel.app/eventos-asistidos");
          const eventosAsistidosFilter = eventosAsistidosResponse.data.data.filter(
            (eventoAsistido: EventoAsistido) => eventoAsistido.ID_USUARIO === Number(tokenValue.id)
          );
          setEventosAsistidos(eventosAsistidosFilter);

          const eventosResponse = await axios.get("https://jinis-api.vercel.app/eventos");
          setEventos(eventosResponse.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <SafeAreaProvider style={{ display:"flex", justifyContent:"center",alignItems:"center"}}>
      <ScrollView>
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
          <ThemedText style={{marginBottom: 12}} type="subtitle">Eventos Asistidos</ThemedText>
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: '#f0f0f0'
  },
  sectionContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom:14,
    borderRadius:15
  },
  tableContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    width:"auto",
    maxWidth:700
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
});
