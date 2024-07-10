import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QrScanner = ({ onScan }:{onScan:any}) => {
  const handleScan = (e:any) => {
    console.log('Valor escaneado:', e.data);
    onScan(e.data);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={handleScan}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={<Text style={styles.centerText}>Escanea el código QR</Text>}
        bottomContent={<Button title="Cerrar" onPress={() => onScan(null)} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
});

export default QrScanner;
