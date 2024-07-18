import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Image, Platform, View } from 'react-native';
import React, { useEffect, useState } from "react";
import { Participante } from "@/interfaces";
import axios from "axios";
import Usuario from "@/components/usuario";

export default function Usuarios() {
  const [usuarios,setUsuarios] = useState<Participante[]>()
  useEffect(()=>{
    const getData = async()=>{
 
      const usuariosResponse = await axios.get("https://jinis-api.vercel.app/usuarios")
      setUsuarios(usuariosResponse.data.data)
    }
    getData()
  },[])
  return (
    <View>
      {usuarios?.map((usuario)=>(
        <Usuario usuario={usuario} key={usuario.ID_USUARIO}/>
      ))}
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