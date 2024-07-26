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
            <View style={styles.sectionContent}>
              <Text style={styles.detail}>{ponente.NOMBRES} {ponente.APELLIDOS}</Text>
              <Text style={styles.detail}>{ponente.ENTIDAD}</Text>
              <Text style={styles.detail}>{ponente.EMAIL}</Text>
              <Text style={styles.detail}>{ponente.TELEFONO}</Text>
              <Text style={styles.detail}>{ponente.BIOGRAFIA}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Horario</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.detail}>{new Date(horario.FECHA).toLocaleDateString()} - {horario.HORA_INICIO} a {horario.HORA_FIN}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ubicación</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.detail}>{ubicacion.DESCRIPCION}</Text>
              <Text style={styles.detail}>{ubicacion.DIRECCION}</Text>
              <Text style={styles.detail}>Capacidad: {ubicacion.CAPACIDAD}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción del Evento</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.detail}>{evento.DESCRIPCION}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Código QR del Evento</Text>
            <View style={styles.qrCodeContainer}>
              <QRCode value={String(evento.ID_EVENTO)} size={150} />
            </View>
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  section: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#e1dee6",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  sectionContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  detail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  qrCodeContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
