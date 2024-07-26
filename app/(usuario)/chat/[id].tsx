import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { io } from "socket.io-client";
import { Mensaje, Participante } from "@/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChatRoom() {
  const { id } = useLocalSearchParams();
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const socket = io("https://jinis-api.vercel.app", {
    transports: ['websocket', 'polling'], // Asegúrate de que los transportes sean compatibles
    reconnectionAttempts: 5, // Intenta reconectar 5 veces
    reconnectionDelay: 1000, // Espera 1 segundo entre intentos
    withCredentials: true, // Si usas credenciales como cookies
  });

  const [usuario, setUsuario] = useState<Participante>();
  const [usuarioNames, setUsuarioNames] = useState<{ [key: number]: string }>({});
  socket.on("connect", () => {
    console.log("Connected to Socket.IO server");
  });
  
  socket.on("connect_error", (error) => {
    console.error("Connection Error:", error.message);
  });
  
  socket.on("disconnect", (reason) => {
    console.warn("Disconnected:", reason);
  });
  
  socket.on("error", (error) => {
    console.error("Socket.IO Error:", error);
  });
  useEffect(() => {
    const getUsuario = async () => {
      try {
        const token = await AsyncStorage.getItem("token_login");
        if (token !== null) {
          const token_login = JSON.parse(token);
          const usuarioData = await axios.get(`https://jinis-api.vercel.app/usuarios/${token_login.id}`);
          setUsuario(usuarioData.data.data);
        }
      } catch (err) {
        console.error("Error al cargar el usuario", err);
        setError("Error al cargar el usuario");
      }
    };
    getUsuario();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const mensajesResponse = await axios.get(`https://jinis-api.vercel.app/chat/mensajes/${id}`);
        const mensajesData: Mensaje[] = mensajesResponse.data.data;

        // Obtener IDs únicos de usuarios
        const usuarioIds = [...new Set(mensajesData.map((msg: Mensaje) => msg.ID_USUARIO))];
        const usuarioNamesMap: { [key: number]: string } = {};

        for (const usuarioId of usuarioIds) {
          if (!usuarioNames[usuarioId]) {
            // Solo obtener si no está ya en el estado
            usuarioNamesMap[usuarioId] = await getUsuarioName(usuarioId);
          }
        }

        setUsuarioNames((prevNames) => ({ ...prevNames, ...usuarioNamesMap }));

        setMensajes(mensajesData);
      } catch (err) {
        console.error("Error al cargar los mensajes", err);
        setError("Error al cargar los mensajes");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  // useEffect(() => {
  //   // Unirse a la sala
  //   socket.emit("joinRoom", id);

  //   // Escuchar mensajes entrantes
  //   socket.on("message", async (messageServer: Mensaje) => {
  //     if (!usuarioNames[messageServer.ID_USUARIO]) {
  //       const nombre = await getUsuarioName(messageServer.ID_USUARIO);
  //       setUsuarioNames((prev) => ({ ...prev, [messageServer.ID_USUARIO]: nombre }));
  //     }
  //     setMensajes((state) => [...state, messageServer]);
  //   });
  //   return () => {
  //     socket.emit("leaveRoom", id);
  //     socket.off();
  //   };
  // }, [id, usuarioNames]);

  const handleSubmitMensaje = () => {
    if (mensaje.trim()) {
      const nuevoMensaje = {
        roomId: id,
        message: mensaje,
        usuarioId: usuario?.ID_USUARIO,
      };
      socket.emit("message", nuevoMensaje);
      setMensaje("");
    }
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

  async function getUsuarioName(usuarioId: number) {
    try {
      const usuario = await axios.get(`https://jinis-api.vercel.app/usuarios/${usuarioId}`);
      return usuario.data.data.NOMBRES;
    } catch (error) {
      console.error(`Error fetching user ${usuarioId}:`, error);
      return "Usuario Desconocido";
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mensajesContainer}>
        {mensajes.map((msg, index) => (
          <View key={index} style={styles.mensaje}>
            <Text style={styles.userName}>
              {usuarioNames[msg.ID_USUARIO] || "Cargando..."}
            </Text>
            <Text>{msg.CONTENIDO}</Text>
          </View>
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={mensaje}
          onChangeText={setMensaje}
          placeholder="Escribe tu mensaje..."
          multiline={true}
        />
        <Pressable style={styles.sendButton} onPress={handleSubmitMensaje}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  mensajesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
  },
  mensaje: {
    padding: 12,
    backgroundColor: "#e1dee6",
    borderRadius: 8,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#fff",
    height: 40,
  },
  sendButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
  userName: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
});
