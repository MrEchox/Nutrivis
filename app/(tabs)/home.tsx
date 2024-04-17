import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { daily_water_object } from '@/src/object_classes/daily_water';
import { useFocusEffect } from '@react-navigation/native';


const Food_Eaten_Prefix = '@Food_Eaten:';
const Goal_Prefix = '@Goal:';

export default function Tracking() {
  const [sumCalories, setSumCalories] = useState(0);
  const [sumCarbs, setSumCarbs] = useState(0);
  const [sumFat, setSumFat] = useState(0);
  const [sumProtein, setSumProtein] = useState(0);

  const [goalCalories, setGoalCalories] = useState(0);
  const [goalCarbs, setGoalCarbs] = useState(0);
  const [goalFat, setGoalFat] = useState(0);
  const [goalProtein, setGoalProtein] = useState(0);

  var date = new Date();
  const currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(); // dd/mm/yyyy


  const [Watah, setWatah] = useState(0);

  const [refreshPage, setRefreshPage] = useState(false); // State to trigger page refresh

  const getLoggedInEmail = async () => {
    const loginVal = await AsyncStorage.getItem("@LoggedIn:");
    if (loginVal) {
      const status = JSON.parse(loginVal);
      return status.email;
    }
    return "";
  };

    const fetchData = async () => {
      try {
        const email = await getLoggedInEmail();

        // Fetch all keys from AsyncStorage
        const allKeys = await AsyncStorage.getAllKeys();
        // Filter keys to only include those belonging to your app
        const appKeysGoal = allKeys.filter(key => key.startsWith(Goal_Prefix + "local"));
        const appKeysEaten = allKeys.filter(key => key.startsWith(Food_Eaten_Prefix + currentDate)); // Gets todays eaten food values
        const appKeysWater = allKeys.filter(key => key.startsWith('@Water:' + currentDate)); // Gets todays drunk water values
        // Fetch values corresponding to the filtered keys
        const unfilteredValuesGoalLocal = await AsyncStorage.multiGet(appKeysGoal);
        console.log("unf"+unfilteredValuesGoalLocal);
        const valuesGoalLocal = unfilteredValuesGoalLocal.filter(([key, value]) => {
          const data = JSON.parse(value);
          return data.email === email;
        });
        console.log("val"+valuesGoalLocal);
        const unfilteredValuesEaten = await AsyncStorage.multiGet(appKeysEaten);
        const valuesEaten = unfilteredValuesEaten.filter(([key, value]) => {
          const data = JSON.parse(value);
          console.log(data);
          return data.email === email;
        });
        const unfilteredValuesWater = await AsyncStorage.multiGet(appKeysWater);
        const valuesWater = unfilteredValuesWater.filter(([key, value]) => {
          const data = JSON.parse(value);
          return data.email === email;
        });

        // Water value
        if (valuesWater.length > 0)
        {
          const waterValues = JSON.parse(valuesWater[0][1]);
          setWatah(waterValues.water);
          console.log("Loaded water: " + waterValues.water + "ml");
        }

        // Goal values
        console.log(valuesGoalLocal);
        const goalValues = JSON.parse(valuesGoalLocal[0][1]);
        setGoalCalories(goalValues.calories);
        setGoalCarbs(goalValues.carbs);
        setGoalFat(goalValues.fat);
        setGoalProtein(goalValues.protein);

        var Calories = 0
        var Carbs = 0
        var Fat = 0
        var Protein = 0

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

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  useFocusEffect( // When focusing on page, fetch data
    React.useCallback(() => {
      fetchData();
      // Return cleanup function
      return () => {
        // Any cleanup you want to do when the component is unmounted or loses focus
      };
    }, [])
  );

  const handleWaterDrink = async (operation: string) => {
    const email = await getLoggedInEmail();

    switch (operation) {
      case 'minus5':
        if (Watah !== 0 && Watah >= 500) {
          setWatah(prevWatah => {
            const newWatah = prevWatah - 500;
            console.log("Updated water after minus5: " + newWatah + "ml");
            const drunkWater = new daily_water_object(currentDate, newWatah, email);
            drunkWater.saveLocal();
            drunkWater.save(email);
            return newWatah;
          });
        }
        break;
      case 'minus2':
        if (Watah !== 0 && Watah >= 200) {
          setWatah(prevWatah => {
            const newWatah = prevWatah - 200;
            console.log("Updated water after minus2: " + newWatah + "ml");
            const drunkWater = new daily_water_object(currentDate, newWatah, email);
            drunkWater.saveLocal();
            drunkWater.save(email);
            return newWatah;
          });
        }
        break;
      case 'add2':
        setWatah(prevWatah => {
          const newWatah = prevWatah + 200;
          console.log("Updated water after add2: " + newWatah + "ml");
          const drunkWater = new daily_water_object(currentDate, newWatah, email);
          drunkWater.saveLocal();
          drunkWater.save(email);
          return newWatah;
        });
        break;
      case 'add5':
        setWatah(prevWatah => {
          const newWatah = prevWatah + 500;
          console.log("Updated water after add5: " + newWatah + "ml");
          const drunkWater = new daily_water_object(currentDate, newWatah, email);
          drunkWater.saveLocal();
          drunkWater.save(email);
          return newWatah;
        });
        break;
      default:
        break;
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    
        <View style={styles.inputContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Kasdienis maisto medžiagų sėkimas</Text>
              <Text>Viso kalorijų per dieną: {sumCalories} Rekomenduojama: {goalCalories}</Text>
              <Text>Viso angliavandenių per dieną: {sumCarbs} Rekomenduojama: {goalCarbs}</Text>
              <Text>Viso riebalų per dieną: {sumFat} Rekomenduojama: {goalFat}</Text>
              <Text>Viso baltymų per dieną: {sumProtein} Rekomenduojama: {goalProtein}</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.title}>Kasdienis vandens sekimas</Text>
              <View style={styles.label}>
                <Text style={{width:'auto', textAlign: 'center'}}>Šią dieną jūs išgėrėte</Text>
              </View>
              <View style={styles.inputContainer2}>
                <View style={styles.buttonLeft}>
                  <Button title="-500" onPress={() => handleWaterDrink('minus5')}></Button>
                </View>
                <View style={styles.buttonLeft}>
                  <Button title="-200" onPress={() => handleWaterDrink('minus2')}></Button>
                </View>
                <View>
                  <Text style={styles.inputContainer}>{Watah}ml</Text>
                </View>
                <View style={styles.buttonRight}> 
                  <Button title="+200" onPress={() => handleWaterDrink('add2')}></Button> 
                </View>
                <View style={styles.buttonRight}> 
                  <Button title="+500" onPress={() => handleWaterDrink('add5')}></Button> 
                </View>
              </View>
            </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 0,
  },
  label: {
    marginRight: 10,
    paddingLeft: 10,
  },
  inputContainer: {
    width: 'auto',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    padding: 10,
  },
  inputContainer2: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    padding: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonLeft: {
    width: 'auto',
    left: 0,
  },
  buttonRight: {
    width: 'auto',
    right: 0,
  },
});