import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import {Barcode_Food} from '@/src/object_classes/food_object_barcode'
import { inputCaloriesMacro } from '@/src/util/goal_calculations';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Tracking() {
  const [localValuesT, setLocalValuesT] = useState([]);
  const [sumCalories, setSumCalories] = useState(0);
  const [sumCarbs, setSumCarbs] = useState(0);
  const [sumFat, setSumFat] = useState(0);
  const [sumProtein, setSumProtein] = useState(0);

  const [userCalories, setUserCalories] = useState(0);
  const [userCarbs, setUserCarbs] = useState(0);
  const [userFat, setUserFat] = useState(0);
  const [userProtein, setUserProtein] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all keys from AsyncStorage
        const allKeysT = await AsyncStorage.getAllKeys();
        // Filter keys to only include those belonging to your app
        const appKeysT = allKeysT.filter(key => key.startsWith("@Norm:"));
        // Fetch values corresponding to the filtered keys
        const valuesT = await AsyncStorage.multiGet(appKeysT);

        // Update state with the retrieved values
        setLocalValuesT(valuesT);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


    return (
      //---Calories---
      <View style={styles.container}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Tracking Tab</Text>
          <Text>Viso kalorijų per dieną: {sumCalories} Rekomenduojama: {userCalories}</Text>
          <Text>Viso angliavandenių per dieną: {sumCarbs} Rekomenduojama: {userCarbs}</Text>
          <Text>Viso riebalų per dieną: {sumFat} Rekomenduojama: {userFat}</Text>
          <Text>Viso baltymų per dieną: {sumProtein} Rekomenduojama: {userProtein}</Text>
        </View>
      </View>
    );
};

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
  label: {
    marginRight: 10,
    paddingLeft: 10,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  input: {
    padding: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});