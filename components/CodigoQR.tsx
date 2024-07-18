import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Image, Platform, View } from 'react-native';
import React from "react";
import QRCode from "react-qr-code";
import { Participante } from "@/interfaces";

export default function CodigoQR({usuario}:{usuario:Participante}) {
  return (
      <View style={{display:"flex", justifyContent:"center",alignItems:"center", height:"auto",marginHorizontal:0,marginVertical:"auto", maxWidth: 500, width: "100%"}}>
        <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={String(usuario.DNI)}
        viewBox={`0 0 256 256`}
      />
      </View>
  );
}
