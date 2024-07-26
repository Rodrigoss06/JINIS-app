import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import QRCode from "react-qr-code";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import {
  Evento,
  EventoAsistido,
  Participante,
  TipoDocumento,
  TipoUsuario,
} from "@/interfaces";

export default function EventoItem() {
  const { id } = useLocalSearchParams();
  const [usuario, setUsuario] = useState<Participante | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento>();
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>();
  const [eventosAsistidos, setEventosAsistidos] = useState<EventoAsistido[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [maxEventos, setMaxEventos] = useState(2);

  useEffect(() => {
    const getData = async () => {
      try {
        const usuarioResponse = await axios.get(
          `https://jinis-api.vercel.app/usuarios/${id}`
        );
        setUsuario(usuarioResponse.data.data);
        const tipoDocumentoResponse = await axios.get(
          `https://jinis-api.vercel.app/tipo-documento/${usuarioResponse.data.data.ID_TIPO_DOCUMENTO}`
        );
        setTipoDocumento(tipoDocumentoResponse.data.data);

        const tipoUsuarioResponse = await axios.get(
          `https://jinis-api.vercel.app/tipos-usuarios/${usuarioResponse.data.data.ID_TIPO_USUARIO}`
        );
        setTipoUsuario(tipoUsuarioResponse.data.data);

        const eventosAsistidosResponse = await axios.get(
          "https://jinis-api.vercel.app/eventos-asistidos"
        );
        const eventosAsistidosFilter =
          eventosAsistidosResponse.data.data.filter(
            (eventoAsistido: EventoAsistido) =>
              eventoAsistido.ID_USUARIO === Number(id)
          );
        setEventosAsistidos(eventosAsistidosFilter);

        const eventosResponse = await axios.get(
          "https://jinis-api.vercel.app/eventos"
        );
        setEventos(eventosResponse.data.data);
      } catch (err) {
        setError("Error al cargar el evento");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  const getEventoNombre = (idEvento: number) => {
    const evento = eventos.find((e) => e.ID_EVENTO === idEvento);
    return evento ? evento.NOMBRE : "Evento no encontrado";
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {usuario ? (
        <View style={styles.card}>
          {tipoDocumento && tipoUsuario ? (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Información del Usuario</Text>
                <View style={styles.userInfo}>
                  <Text style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Nombre: </Text>
                    {usuario.NOMBRES} {usuario.APELLIDO_PATERNO} {usuario.APELLIDO_MATERNO}
                  </Text>
                  <Text style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>DNI: </Text>
                    {usuario.DNI}
                  </Text>
                  <Text style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Correo Electrónico: </Text>
                    {usuario.CORREO_ELECTRONICO}
                  </Text>
                  <Text style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Teléfono: </Text>
                    {usuario.TELEFONO}
                  </Text>
                  <Text style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Dirección: </Text>
                    {usuario.DIRECCION}
                  </Text>
                  <Text style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Género: </Text>
                    {usuario.GENERO}
                  </Text>
                  <Text style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Fecha de Nacimiento: </Text>
                    {new Date(usuario.FECHA_NACIMIENTO).toLocaleDateString()}
                  </Text>
                  <Text style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Tipo de Documento: </Text>
                    {tipoDocumento.DESCRIPCION}
                  </Text>
                  <Text style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Tipo de Usuario: </Text>
                    {tipoUsuario.DESCRIPCION}
                  </Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Eventos Asistidos</Text>
                {eventosAsistidos.slice(0, maxEventos).map((eventoAsistido) => (
                  <View
                    key={eventoAsistido.ID_EVENTO_ASISTIDO}
                    style={styles.eventItem}
                  >
                    <Text style={styles.eventItemText}>
                      {getEventoNombre(eventoAsistido.ID_EVENTO)}
                    </Text>
                    <Text style={styles.eventItemDate}>
                      Fecha de Asistencia:{" "}
                      {new Date(eventoAsistido.FECHA_ASISTENCIA).toLocaleDateString()}
                    </Text>
                  </View>
                ))}
                {eventosAsistidos.length > maxEventos && (
                  <Pressable
                    style={styles.showMoreButton}
                    onPress={() => setMaxEventos(maxEventos + 4)}
                  >
                    <Text style={styles.showMoreButtonText}>Mostrar Más</Text>
                  </Pressable>
                )}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Código QR del Usuario</Text>
                <View style={styles.qrCodeContainer}>
                  <QRCode value={String(usuario.ID_USUARIO)} size={150} />
                </View>
              </View>
            </>
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
      ) : (
        <Text style={styles.errorText}>No se encontró el evento</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    padding: 16,
    borderRadius: 8,

    marginBottom: 16,
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
  userInfo: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  userDetail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  userDetailLabel: {
    fontWeight: "bold",
    color: "#333",
  },
  eventItem: {
    padding: 10,
    backgroundColor: "#fff",
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
