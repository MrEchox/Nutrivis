import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import {Barcode_Food} from '@/src/object_classes/food_object_barcode'
import { inputCaloriesMacro } from '@/src/util/goal_calculations';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Food_Eaten_Prefix = '@Food_Eaten:';
const Goal_Prefix = '@Goal:';

export default function Tracking() {
  const [localValuesGoal, setLocalValuesGoal] = useState([]);
  const [localValuesEaten, setLocalValuesEaten] = useState([]);

  const [sumCalories, setSumCalories] = useState(0);
  const [sumCarbs, setSumCarbs] = useState(0);
  const [sumFat, setSumFat] = useState(0);
  const [sumProtein, setSumProtein] = useState(0);

  const [goalCalories, setGoalCalories] = useState(0);
  const [goalCarbs, setGoalCarbs] = useState(0);
  const [goalFat, setGoalFat] = useState(0);
  const [goalProtein, setGoalProtein] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var date = new Date();
        const currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(); // dd/mm/yyyy

        // Fetch all keys from AsyncStorage
        const allKeys = await AsyncStorage.getAllKeys();
        // Filter keys to only include those belonging to your app
        const appKeysGoal = allKeys.filter(key => key.startsWith(Goal_Prefix + "local"));
        const appKeysEaten = allKeys.filter(key => key.startsWith(Food_Eaten_Prefix + currentDate)); // Gets todays eaten food values
        console.log(Food_Eaten_Prefix + currentDate);
        // Fetch values corresponding to the filtered keys
        const valuesGoalLocal = await AsyncStorage.multiGet(appKeysGoal);
        const valuesEaten = await AsyncStorage.multiGet(appKeysEaten);

        // Goal values
        const goalValues = valuesGoalLocal[0][1]?.split(',');
        setGoalCalories(goalValues[0].split(':')[1]);
        setGoalCarbs(goalValues[1].split(':')[1]);
        setGoalFat(goalValues[2].split(':')[1]);
        setGoalProtein(goalValues[3].split(':')[1].replace('}', ''));

        valuesEaten.forEach(element => {
          
        });

        console.log(valuesEaten);
        
        //setLocalValuesEaten(valuesEaten);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


    return (
      <View style={styles.container}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Tracking Tab</Text>
          <Text>Viso kalorijų per dieną: {sumCalories} Rekomenduojama: {goalCalories}</Text>
          <Text>Viso angliavandenių per dieną: {sumCarbs} Rekomenduojama: {goalCarbs}</Text>
          <Text>Viso riebalų per dieną: {sumFat} Rekomenduojama: {goalFat}</Text>
          <Text>Viso baltymų per dieną: {sumProtein} Rekomenduojama: {goalProtein}</Text>
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