import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera/next';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [barcodeValue, setBarcodeValue] = useState('ttt');

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function handleBarCodeScanned({ type, data }: BarcodeScanningResult) {
    setBarcodeValue(`https://api.barcodelookup.com/v3/products?barcode=` + data + `&key=u5hxlvilg9snvl1hqslkeo7iaz09ki`);
    const response = await fetch(`https://api.barcodelookup.com/v3/products?barcode=` + data + `&formatted=y&key=u5hxlvilg9snvl1hqslkeo7iaz09ki`);
    const result = await response;
    console.log(result);

    // Do something with the result
    //setBarcodeValue(temp);
  }


  return (
      <View style={styles.container}>
          <CameraView style={styles.camera} onBarcodeScanned={handleBarCodeScanned} facing={facing == 'back' ? 'back' : 'front'}>
              <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Pakeisti kamerą</Text>
                    </TouchableOpacity>
                      <TouchableOpacity style={styles.button}>
                        <Link href="/barcode_manual_input" asChild>
                          <Pressable>
                            <Text style={styles.text}>Įrašyti barkodą</Text>
                          </Pressable>
                        </Link>
                      </TouchableOpacity>
              </View>
          </CameraView>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },  
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    buttonWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
    },
    button: {
      padding: 20,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 5,
      marginHorizontal: 10,
  },
    text: {
        color: 'white',
    },
});
