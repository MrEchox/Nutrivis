import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera/next';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../../firebaseConfig.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabTwoScreen() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [foundBarcode, setFoundBarcode] = useState('');
    const [barcode, setBarcode] = useState(0);
    const [alertVisible, setAlertVisible] = useState(false);

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleAlertDismissYes = () => {
        setAlertVisible(false);
        router.replace('../add_food?barcode=' + barcode.toString());
    }

    async function handleBarCodeScanned({ type, data }: BarcodeScanningResult) {
        if (alertVisible) {
            return;
        }
        setAlertVisible(true);

        try {
            setBarcode(parseInt(data));
        }
        catch (error) {
            console.error('Error fetching data:', error);
            return;
        }
        
        const collectionRef = collection(db, "barcode_food_verified");

        const q = query(collectionRef, where("barcode", "==", barcode));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
            //navigation.navigate('./Food', { barcode: barcode });
        } 
        else {
            // Fetch all keys from AsyncStorage
            const allKeys = await AsyncStorage.getAllKeys();
            // Filter keys to only include those belonging to your app
            const appKeys = allKeys.filter(key => key.startsWith("@BARCODE_FOOD:"));
            // Fetch values corresponding to the filtered keys
            const values = await AsyncStorage.multiGet(appKeys);

            // Check for the barcode in the local storage
            for (let i = 0; i < values.length; i++) {
                if (values[i][1] != null) {
                    var item = JSON.parse(values[i][1]);
                    if (item.barcode == barcode) {
                        setFoundBarcode("Rastas barkodas lokaliai");
                        return;
                    }
                }
            }
            Alert.alert(
                "Barkodas nerastas",
                "Tokio barkodo neradome. Ar norėtumėte jį įvesti?",
                [
                    {
                        text: "Taip",
                        onPress: () => handleAlertDismissYes(),
                    },
                    {
                        text: "Ne",
                        onPress: () => setAlertVisible(false),
                        style: "cancel"
                    }
                ]
            );
        };
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
