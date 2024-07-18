import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/styleComponents/ThemedView";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "@/context/AuthContext";


function Login() {
  const [dni, setDni] = useState("");
  const [contrasena, setContrasena] = useState("");
  const {onLogin} = useAuth()

  const handleLogin = async () => {
    try {

      const loginResponse = await axios.post("https://jinis-api.vercel.app/login", {
        dni: dni,
        contrasena: contrasena,
      });
      if (loginResponse.data.token) {
        onLogin!(loginResponse.data.token);
      } else {
        throw new Error("UserNotFound");
      }
    } catch (error) {
      console.log(error);
      alert("El usuario no está registrado");
    }
  };

  // useEffect(() => {
  //   const getToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("token_login");
  //       if (token !== null) {
  //         const token_login = JSON.parse(token);
  //         sesion.login(token);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getToken();
  // }, []);

  return (
    <ThemedView style={styles.contenedor}>
      <Text style={styles.titulo}>Login</Text>
      <ThemedView style={styles.contenedorFormulario}>
        <View style={styles.contenedorInput}>
          <TextInput
            style={styles.input}
            placeholder="DNI"
            onChangeText={(e) => setDni(e)}
            value={dni}
          />
        </View>
        <View style={styles.contenedorInput}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={(e) => setContrasena(e)}
            value={contrasena}
          />
        </View>
        <View style={styles.contenedorBoton}>
          <Pressable style={styles.boton} onPress={handleLogin}>
            <Text style={styles.botonTexto}>Iniciar sesión</Text>
          </Pressable>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  contenedorFormulario: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 4,
    width: "100%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  contenedorInput: {
    padding: 2,
    width: "100%",
    marginBottom: 15,
  },
  contenedorBoton: {
    margin: 4,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f8f8f8",
    fontSize: 16,
  },
  boton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#339ECB",
    borderRadius: 5,
    alignItems: "center",
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;
