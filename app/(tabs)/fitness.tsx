import { useState, useEffect } from 'react';
import { StyleSheet, PermissionsAndroid, Alert, TextInput, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Pedometer } from 'expo-sensors';
import { commonStyles } from '@/components/commonStyles';

export default function TabTwoScreen() {

  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [stepCount, setStepCount] = useState(0);
  const height = 180;

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

  const colorScheme = useColorScheme();
  const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
  const themeContainer = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
  const themeTextStyle = colorScheme === 'light' ? [commonStyles.lightThemeText, { fontFamily: 'Helvetica', fontWeight: 'bold' }] : [commonStyles.darkThemeText, { fontFamily: 'Helvetica', fontWeight: 'bold' }];
  const themeSvg = colorScheme === 'light' ? '#ffffff' : '#003049';

  return (
    <View style={[styles.container, themeBackground, { paddingTop: 20 }]}>
      <View style={[commonStyles.mainStatsContainer, themeContainer]}>
        <Text style={[styles.title, themeTextStyle]}>Žingsnių sekimas</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={themeTextStyle}>Nueita žingsnių</Text>
            <Text style={[themeTextStyle, styles.title]}>{stepCount}</Text>
          </View>
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={themeTextStyle}>Nueitas atstumas</Text>
            <Text style={[themeTextStyle, styles.title]}>{(stepCount * height * 0.415).toFixed(1)} cm</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  label: {
    marginRight: 10,
    paddingLeft: 10,
  },
});