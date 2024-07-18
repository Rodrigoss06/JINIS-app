import ChatItem from '@/components/chat/chatItem'
import { ThemedText } from '@/components/styleComponents/ThemedText'
import { ThemedView } from '@/components/styleComponents/ThemedView'
import { Evento } from '@/interfaces'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

function Chat() {
    const [eventos,setEventos]= useState<Evento[]>([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const getData = async () =>{
            const eventosData = await axios.get("https://jinis-api.vercel.app/eventos")
            setEventos(eventosData.data.data)
            setLoading(false)
        }
        getData()
    },[])
  return (
    <ThemedView lightColor='#FFFFFF' darkColor='#000000' style={styles.contenedor}>
        <ThemedText lightColor='#000000' darkColor='#FFFFFF' type='subtitle' >Chats</ThemedText>
        {eventos.map((evento)=>(
            <ChatItem evento={evento} key={evento.ID_EVENTO}/>
        ))}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        gap: 10,
        marginTop: 20,
        marginHorizontal: 10,
        backgroundColor:"",
    }
})
export default Chat