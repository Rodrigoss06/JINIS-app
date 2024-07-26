import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from "react";
import { Evento } from "@/interfaces";
import axios from "axios";
import EventoPage from "@/components/evento";
import { useLocalSearchParams } from "expo-router";

export default function EventoItem() {
  const { id } = useLocalSearchParams();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const eventoResponse = await axios.get(`https://jinis-api.vercel.app/eventos/${id}`);
        setEvento(eventoResponse.data.data);
      } catch (err) {
        setError("Error al cargar el evento");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

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
    <ScrollView style={styles.container}>
      {evento ? (
        <EventoPage evento={evento} />
      ) : (
        <Text style={styles.errorText}>No se encontró el evento</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
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
