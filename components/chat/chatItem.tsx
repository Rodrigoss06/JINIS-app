import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { ThemedView } from "../styleComponents/ThemedView";
import { Evento, Ponente } from "@/interfaces";
import axios from "axios";
import { ThemedText } from "../styleComponents/ThemedText";

function ChatItem({ evento }: { evento: Evento }) {
  const [ponente, setPonente] = useState<Ponente>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const ponenteData = await axios.get(
        `https://jinis-api.vercel.app/ponentes/${evento.ID_PONENTE}`
      );
      setPonente(ponenteData.data.data);
      setLoading(false);
    };
    getData();
  }, []);
  return (
    //agrega rutas dinamicassssssssssssssssssssssssssssssssssssssssssssssssssss
    <Pressable >
      <ThemedView
        lightColor="#FFFFFF"
        darkColor="#000000"
        style={styles.contenedor}
      >
        <ThemedText
          lightColor="#333333"
          darkColor="#FFFFFF"
          style={styles.titulo}
        >
          {evento.NOMBRE}
        </ThemedText>
        <ThemedText lightColor="#333333" darkColor="#FFFFFF">
          {loading ? "" : ponente?.NOMBRES} {loading ? "" : ponente?.APELLIDOS}
        </ThemedText>
        <ThemedText lightColor="#333333" darkColor="#FFFFFF">
          {loading ? "" : ponente?.ENTIDAD}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  contenedor: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  },
});
export default ChatItem;
