import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, Pressable, View } from 'react-native';

export default function EscanerQR({ setShowCamera, setData }:{setShowCamera:any, setData:any}) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={(e) => {
          setData(e)
          setShowCamera()
        }}
        pictureSize=""
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.topOverlay} />
          <View style={styles.middleOverlay}>
            <View style={styles.sideOverlay} />
            <View style={styles.recuadro}>
            </View>
            <View style={styles.sideOverlay} />
          </View>
          <View style={styles.bottomOverlay} />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={setShowCamera}>
            <Text style={styles.text}>Cerrar</Text>
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  middleOverlay: {
    flexDirection: 'row',
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  recuadro: {
    width: 300,
    height: 300,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recuadroText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "red",
    borderRadius: 20
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  extra: {
    backgroundColor: "#0D111790",
    width: 200,
    height: 100,
  }
});
