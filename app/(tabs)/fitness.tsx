import { useState, useEffect } from 'react';
import { StyleSheet, PermissionsAndroid, Alert, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Pedometer } from 'expo-sensors';

export default function TabTwoScreen() {

    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [stepCount, setStepCount] = useState(0);
    const [height, setHeight] = useState(0);

    const subscribe = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));
  
      if (isPedometerAvailable) {
        return Pedometer.watchStepCount(result => {
          setStepCount(result.steps);
        });
      }
    };

    useEffect(() => {
        // Function to fetch today's step count and start watching for changes
        const fetchAndWatchSteps = async () => {
          // Check if the permission is granted
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
          );
          
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const subscription = subscribe();
            return () => subscription;
            
          } else {
            // Permission denied
            console.log('Permission denied for activity recognition');
          }
        };

        fetchAndWatchSteps(); // Fetch steps and start watching
      }, []);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>'Fitness' tab</Text>
        <Text>Įveskite savo ūgį (cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="Įveskite savo ūgį"
          keyboardType="numeric"
          onChangeText={(text) => setHeight(parseFloat(text))}
        />
        <Text>Žingsnių skaičius iki šiol: {stepCount}</Text>
        <Text>Nueitas atstumas (cm): {stepCount * height * 0.415}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
    input: {
        padding: 10,
    },
});