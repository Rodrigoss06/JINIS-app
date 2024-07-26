import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Image, Platform, View, Text, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from "react";
import { Evento } from "@/interfaces";
import axios from "axios";

import { Link } from "expo-router";



export default function Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const eventosResponse = await axios.get("https://jinis-api.vercel.app/eventos");
        setEventos(eventosResponse.data.data);
      } catch (err) {
        console.log(err)
        setError("Error al cargar los eventos");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {eventos.map((evento) => (
        <View key={`eventos/${evento.ID_EVENTO}`} style={styles.eventItem}>
            <Text style={styles.eventTitle}>{evento.NOMBRE}</Text>
            <Text style={styles.eventDescription}>{evento.DESCRIPCION}</Text>
      <Link
        href={`/eventos/${evento.ID_EVENTO}`} >
        ver detalles
      </Link>
          
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  eventItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
  },
});
