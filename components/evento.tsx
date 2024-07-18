import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import axios from "axios";
import { Evento, Horario, Ponente, Ubicacion } from "@/interfaces";
import QRCode from "react-qr-code";

export default function EventoPage({ evento }: { evento: Evento }) {
  const [horario, setHorario] = useState<Horario>();
  const [ponente, setPonente] = useState<Ponente>();
  const [ubicacion, setUbicacion] = useState<Ubicacion>();

  useEffect(() => {
    const getData = async () => {
      try {
        const horarioResponse = await axios.get(`https://jinis-api.vercel.app/horarios/${evento.ID_HORARIO}`);
        setHorario(horarioResponse.data.data);

        const ponenteResponse = await axios.get(`https://jinis-api.vercel.app/ponentes/${evento.ID_PONENTE}`);
        setPonente(ponenteResponse.data.data);

        const ubicacionResponse = await axios.get(`https://jinis-api.vercel.app/ubicaciones/${evento.ID_UBICACION}`);
        setUbicacion(ubicacionResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [evento.ID_HORARIO, evento.ID_PONENTE, evento.ID_UBICACION]);

  return (

      <View style={styles.container}>
        {horario && ponente && ubicacion ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ponente</Text>
              <Text>{ponente.NOMBRES} {ponente.APELLIDOS}</Text>
              <Text>{ponente.ENTIDAD}</Text>
              <Text>{ponente.EMAIL}</Text>
              <Text>{ponente.TELEFONO}</Text>
              <Text>{ponente.BIOGRAFIA}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Horario</Text>
              <Text>{new Date(horario.FECHA).toLocaleDateString()} - {horario.HORA_INICIO} a {horario.HORA_FIN}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ubicación</Text>
              <Text>{ubicacion.DESCRIPCION}</Text>
              <Text>{ubicacion.DIRECCION}</Text>
              <Text>Capacidad: {ubicacion.CAPACIDAD}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Descripción del Evento</Text>
              <Text>{evento.DESCRIPCION}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Código QR del Evento</Text>
              <QRCode value={String(evento.ID_EVENTO)} size={100} />
            </View>
          </>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6200ea",
  },
  eventName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
