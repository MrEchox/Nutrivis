import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { daily_water_object } from '@/src/object_classes/daily_water';

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

  const [Watah, setWatah] = useState(0);

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
    fetchData();
  }, []);

  const handleWaterDrink = (operation : String) => {
    switch (operation){
      case 'minus5':
        if (Watah != 0 && Watah >= 500)
          {
            setWatah(Watah - 500)
            var date = new Date();
            const currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      
            const drunkWater = new daily_water_object(currentDate, Watah);
            drunkWater.saveLocal();
          };
        return Watah;
      case 'minus2':
        if (Watah != 0 && Watah >= 200)
          {
            setWatah(Watah - 200)
            var date = new Date();
            const currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      
            const drunkWater = new daily_water_object(currentDate, Watah);
            drunkWater.saveLocal();
          };
        return Watah;
      case 'add2':
        {
        setWatah(Watah + 200);
        var date = new Date();
        const currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  
        const drunkWater = new daily_water_object(currentDate, Watah);
        drunkWater.saveLocal();
        }
        return Watah;
      case 'add5':
        {
        setWatah(Watah + 500);
        var date = new Date();
        const currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  
        const drunkWater = new daily_water_object(currentDate, Watah);
        drunkWater.saveLocal();
        }
        return Watah;
      default:
        return 0;

      
    }
  }

  return (
      <View style={styles.container}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    
        <View style={styles.inputContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Tracking Tab</Text>
              <Text>Viso kalorijų per dieną: {sumCalories} Rekomenduojama: {goalCalories}</Text>
              <Text>Viso angliavandenių per dieną: {sumCarbs} Rekomenduojama: {goalCarbs}</Text>
              <Text>Viso riebalų per dieną: {sumFat} Rekomenduojama: {goalFat}</Text>
              <Text>Viso baltymų per dieną: {sumProtein} Rekomenduojama: {goalProtein}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Water xixixaxa</Text>
              <View style={styles.label}>
                <Text style={{width:'auto', textAlign: 'center'}}>Šią dieną jūs išgėrėte</Text>
              </View>
              <View style={styles.inputContainer2}>
                <View style={styles.buttonLeft}>
                  <Button title="-0.5" onPress={() => handleWaterDrink('minus5')}></Button>
                </View>
                <View style={styles.buttonLeft}>
                  <Button title="-0.2" onPress={() => handleWaterDrink('minus2')}></Button>
                </View>
                <View>
                  <Text style={styles.inputContainer}>{Watah}</Text>
                </View>
                <View style={styles.buttonRight}> 
                  <Button title="+0.2" onPress={() => handleWaterDrink('add2')}></Button> 
                </View>
                <View style={styles.buttonRight}> 
                  <Button title="+0.5" onPress={() => handleWaterDrink('add5')}></Button> 
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