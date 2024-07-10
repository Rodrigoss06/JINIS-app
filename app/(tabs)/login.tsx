import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import { ThemedView } from "@/components/styleComponents/ThemedView";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../_layout"; // Ajusta la ruta según tu estructura
import { StackNavigationProp } from "@react-navigation/stack";

// Define el tipo de navegación para esta pantalla
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList,"(tabs)/login">;
function Login() {
  const [dni, setDni] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      const loginResponse = (await axios.post("http://10.0.2.2:3000/login", {correo: dni,contrasena,})).data.token;
      if (loginResponse) {
        const token_login = JSON.parse(loginResponse);
        console.log(token_login);
        await AsyncStorage.setItem("token_login", loginResponse);
        if (token_login.tipoUsuario === "Usuario") {
          console.log("exito");
          navigation.navigate("(tabs)/login");
        } else if (token_login.tipoUsuario === "Colaborador") {
          console.log("exito");
          navigation.navigate("(tabs)/colaborador");
        } else if (token_login.tipoUsuario === "Administrador") {
          console.log("exito");
          navigation.navigate("(tabs)/administrador");
        }
      }
    } catch (error) {
      console.log(3);
      console.error(error);
    }
  };
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token_login");
        if (token !== null) {
            const token_login = JSON.parse(token);
            if (token_login.tipoUsuario === "Usuario") {
                console.log("exito");
                navigation.navigate("(tabs)/login");
              } else if (token_login.tipoUsuario === "Colaborador") {
                console.log("exito");
                navigation.navigate("(tabs)/colaborador");
              } else if (token_login.tipoUsuario === "Administrador") {
                console.log("exito");
                navigation.navigate("(tabs)/administrador");
              }
        }
      } catch (error) {
        console.log(2);
        console.error(error);
      }
    };
    getToken();
  }, []);
  return (
    <ThemedView style={styles.contenedor}>
      <Text style={styles.titulo}>login</Text>
      <ThemedView style={styles.contenedorFormulario}>
        <View style={styles.contenedorInput}>
          <TextInput
            style={styles.input}
            placeholder="dni"
            onChangeText={(e) => setDni(e)}
          />
        </View>
        <View style={styles.contenedorInput}>
          <TextInput
            style={styles.input}
            placeholder="contraseña"
            secureTextEntry
            onChangeText={(e) => setContrasena(e)}
          />
        </View>
        <View style={styles.contenedorBoton}>
          <TouchableOpacity style={styles.boton} onPress={handleLogin}>
            <Text>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  contenedor: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contenedorFormulario: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    columnGap: 4,
  },
  contenedorInput: {
    padding: 2,
  },
  contenedorBoton: {
    margin: 4,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "500",
  },
  input: {
    fontSize: 14,
  },
  boton: {
    padding: 2,
    backgroundColor: "red",
  },
});
export default Login;
