import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Food_Eaten_Prefix = '@Food_Eaten:';
const Goal_Prefix = '@Goal:';

export default function Tracking() {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status

  const [sumCalories, setSumCalories] = useState(0);
  const [sumCarbs, setSumCarbs] = useState(0);
  const [sumFat, setSumFat] = useState(0);
  const [sumProtein, setSumProtein] = useState(0);

  const [goalCalories, setGoalCalories] = useState(0);
  const [goalCarbs, setGoalCarbs] = useState(0);
  const [goalFat, setGoalFat] = useState(0);
  const [goalProtein, setGoalProtein] = useState(0);

  useEffect(() => {
    const loginStatus = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const loginKey = keys.filter(key => key.startsWith("@LoggedIn:"));

        if (loginKey.length > 0) {
          const loginVal = await AsyncStorage.getItem("@LoggedIn:");
          if (loginVal) {
            const status = JSON.parse(loginVal);
            if (status.username === '') {
              router.replace('./session/login');
            } else {
              fetchData(); // Proceed with fetching data if user is logged in
            }
          }
        } else {
          router.replace('./session/login');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loginStatus();
  }, []);

  const fetchData = async () => {
    try {
      var date = new Date();
      const currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(); // dd/mm/yyyy

      const allKeys = await AsyncStorage.getAllKeys();
      const appKeysGoal = allKeys.filter(key => key.startsWith(Goal_Prefix + "local"));
      const appKeysEaten = allKeys.filter(key => key.startsWith(Food_Eaten_Prefix + currentDate));
      
      const valuesGoalLocal = await AsyncStorage.multiGet(appKeysGoal);
      const valuesEaten = await AsyncStorage.multiGet(appKeysEaten);

      const goalValues = JSON.parse(valuesGoalLocal[0][1]);
      setGoalCalories(goalValues.calories);
      setGoalCarbs(goalValues.carbs);
      setGoalFat(goalValues.fat);
      setGoalProtein(goalValues.protein);

      var Calories = 0;
      var Carbs = 0;
      var Fat = 0;
      var Protein = 0;

      valuesEaten.forEach(element => {
        const eatenVals = JSON.parse(element[1]);
        Calories += eatenVals.calories / 100 * eatenVals.amount;
        Carbs += eatenVals.carbs / 100 * eatenVals.amount;
        Fat += eatenVals.fat / 100 * eatenVals.amount;
        Protein += eatenVals.protein / 100 * eatenVals.amount;
      });
      setSumCalories(Calories);
      setSumCarbs(Carbs);
      setSumFat(Fat);
      setSumProtein(Protein);
      setIsLoading(false); // Set loading state to false when data fetching is complete
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
