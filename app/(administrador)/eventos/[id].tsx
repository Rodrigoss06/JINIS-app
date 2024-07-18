import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Image, Platform, View, Text, ActivityIndicator } from 'react-native';
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
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      {evento ? (
        <EventoPage evento={evento} />
      ) : (
        <Text>No se encontró el evento</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
