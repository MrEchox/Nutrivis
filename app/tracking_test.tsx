import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, SectionList } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from '@babel/core';


// Define your app's unique identifier
const FOOD_PREFIX = '@Food:';
const NORM_PREFIX = '@Norm:';


export default function Tracking() {
  const [localValuesT, setLocalValuesT] = useState([]);
  const [localValuesF, setLocalValuesF] = useState([]);
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [protein, setProtein] = useState(0);
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

        // Fetch all keys from AsyncStorage
        const allKeysF = await AsyncStorage.getAllKeys();
        // Filter keys to only include those belonging to your app
        const appKeysF = allKeysF.filter(key => key.startsWith("@Food:"));
        // Fetch values corresponding to the filtered keys
        const valuesF = await AsyncStorage.multiGet(appKeysF);

        // Update state with the retrieved values
        setLocalValuesF(valuesF);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItemT = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <Text>{item[0].replace(NORM_PREFIX, '')}: {item[1]}</Text>
    </TouchableOpacity>
  );

  const renderItemF = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <Text>{item[0].replace(FOOD_PREFIX, '')}: {item[1]}</Text>
    </TouchableOpacity>
  );

  const handleItemClick = (item) => {
    // Handle the click event for each item in the list
    // For example, you can navigate to a detail screen or perform any other action
    console.log('Clicked item:', item);

    if(item[0].startsWith(NORM_PREFIX))
    {
      const jsonValues = JSON.parse(item[1]);
      setUserCalories(jsonValues.calories);
      setUserCarbs(jsonValues.carbs);
      setUserFat(jsonValues.fat);
      setUserProtein(jsonValues.protein);
    }
    else{
      // Extract the calories value
      const jsonValues = JSON.parse(item[1]);
      setCalories(jsonValues.calories);
      setCarbs(jsonValues.carbs);
      setFat(jsonValues.fat);
      setProtein(jsonValues.protein);

      console.log('Calories:', calories);
      console.log('Carbs:', carbs);
      console.log('Fat:', fat);
      console.log('Protein:', protein);
      setSumCalories(sumCalories + calories);
      setSumCarbs(sumCarbs + carbs);
      setSumFat(sumFat + fat);
      setSumProtein(sumProtein + protein);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User recomended daily norm Tab</Text>
      <FlatList
        data={localValuesT}
        renderItem={renderItemT}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
      <Text style={styles.title}>Food Tab</Text>
      <FlatList
        data={localValuesF}
        renderItem={renderItemF}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Tracking Tab</Text>
        <Text>Viso kalorijų per dieną: {sumCalories} Rekomenduojama: {userCalories}</Text>
        <Text>Viso angliavandenių per dieną: {sumCarbs} Rekomenduojama: {userCarbs}</Text>
        <Text>Viso riebalų per dieną: {sumFat} Rekomenduojama: {userFat}</Text>
        <Text>Viso baltymų per dieną: {sumProtein} Rekomenduojama: {userProtein}</Text>
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
});
