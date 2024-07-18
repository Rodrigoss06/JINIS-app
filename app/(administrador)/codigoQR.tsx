import ParallaxScrollView from "@/components/styleComponents/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Image, Platform, Text, View } from 'react-native';
import React, { useEffect, useState } from "react";
import CodigoQR from "@/components/CodigoQR";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Participante } from "@/interfaces";

export default function CodigoQRPage() {
  const [usuario,setUsuario] = useState<Participante>()
  useEffect(()=>{
    const getUsuario = async()=>{
      const token = await AsyncStorage.getItem("token_login")
      if (token !== null) {
        const token_login = JSON.parse(token);

          const usuarioData = await axios.get(`https://jinis-api.vercel.app/usuarios/${token_login.id}`)
          setUsuario(usuarioData.data.data)
    }
    }
    getUsuario()
  },[])
  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
    headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}
    >
      <View style={{width:"100%", display:"flex", justifyContent:"center",alignItems:"center"}}>{usuario !==undefined? (<CodigoQR usuario={usuario}/>):(<Text>ERRRRO</Text>)}</View>
    </ParallaxScrollView>
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