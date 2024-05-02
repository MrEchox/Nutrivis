import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Button, Pressable, useColorScheme, FlatList, TouchableOpacity} from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from 'react-native-paper';
import { commonStyles } from '../../components/commonStyles';
import CircularProgress from '../../components/CircularProgress';
import { getSvgByName } from '../../components/SVGs';
import {Svg } from 'react-native-svg';
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

  const [eatenFoods, setEatenFoods] = useState([]); // Angry for type never or smth

  //Theme consts, to be moved elsewhere
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;
  const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
  const themeContainer = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
  const themeProg = colorScheme === 'light' ? '#669bbc' : '#003049';
  const themeProgF = colorScheme === 'light' ? '#ffffff' : '#ffffff';
  const themeProgBack = colorScheme === 'light' ? commonStyles.lightProgress : commonStyles.darkProgress;
  const themeSvg = colorScheme === 'light' ? '#ffffff' : '#003049'

  const minusSvg = getSvgByName("minus", themeSvg);
  const plusSvg = getSvgByName("plus", themeSvg);
  const waterSvg = getSvgByName("water", themeSvg);

  var date = new Date();
  const currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(); // dd/mm/yyyy

  const [Watah, setWatah] = useState(0);

  const getLoggedInEmail = async () => {
    const loginVal = await AsyncStorage.getItem("@LoggedIn:");
    if (loginVal) {
      const status = JSON.parse(loginVal);
      return status.email;
    }
    return "";
  };

  const renderEatenFoodItem = ({ item, index }) => (
    <View style={[styles.FoodItemStyle, {backgroundColor:themeSvg}]}>
      <Text style={themeTextStyle}>{item.date.substring(10, 15)} {item.name} {item.amount} g</Text>
      <TouchableOpacity onPress={() => removeEatenFoodItem(item, index)}>
        <Text style={{ color: '#cf5a5a', fontWeight: 'bold' }}>X</Text>
      </TouchableOpacity>
    </View>
  );

    const fetchData = async () => {
      try {
        setEatenFoods([]); // Clear eaten foods list

        const email = await getLoggedInEmail();

        // Fetch all keys from AsyncStorage
        const allKeys = await AsyncStorage.getAllKeys();

        // Filter keys to only include those belonging to your app
        const appKeysGoal = allKeys.filter(key => key.startsWith(Goal_Prefix + "local"  + ":" + email));
        const appKeysEatenUnfiltered = allKeys.filter(key => key.startsWith(Food_Eaten_Prefix + currentDate)); // Gets todays eaten food values
        const appKeysEaten = appKeysEatenUnfiltered.filter(key => key.includes(email)); // Filter out only todays eaten food values for the logged in user
        const appKeysWater = allKeys.filter(key => key.startsWith('@Water:' + currentDate)); // Gets todays drank water values


        // Fetch values corresponding to the filtered keys
        const unfilteredValuesGoalLocal = await AsyncStorage.multiGet(appKeysGoal);
        const valuesGoalLocal = unfilteredValuesGoalLocal.filter(([key, value]) => {
          const data = JSON.parse(value);
          return data.email === email;
        });

        // Eaten values
        const unfilteredValuesEaten = await AsyncStorage.multiGet(appKeysEaten);
        const valuesEaten = unfilteredValuesEaten.filter(([key, value]) => {
          const data = JSON.parse(value);
          return data.email === email;
        });
        
        // Water values
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

        console.log(valuesEaten);
        
        valuesEaten.forEach(element => {
          // Add to list
          setEatenFoods(prevEatenFoods => [...prevEatenFoods, JSON.parse(element[1])]);

          // Add to counter
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

  const removeEatenFoodItem = async (item, index) => {
    try {
      // Get the key from the item's data
      const keyToRemove = Food_Eaten_Prefix + currentDate + ":" + item.email + ":" + item.name;
      
      // Remove the item from AsyncStorage
      await AsyncStorage.removeItem(keyToRemove);
      
      // Remove the item from the state
      setEatenFoods(prevEatenFoods => {
        const updatedFoods = prevEatenFoods.filter((_, i) => i !== index);
        return updatedFoods;
      });
  
      // Update sums after removing an item
      setSumCalories(sumCalories - (item.calories / 100 * item.amount));
      setSumCarbs(sumCarbs - (item.carbs / 100 * item.amount));
      setSumFat(sumFat - (item.fat / 100 * item.amount));
      setSumProtein(sumProtein - (item.protein / 100 * item.amount));
  
    } catch (error) {
      console.error('Error removing food item:', error);
    }
  };



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
    <View style={[styles.container, themeBackground]}>
      <View style={[commonStyles.mainStatsContainer, themeContainer]}>
      <View style={[styles.statsItem, themeContainer]}>
            <Text style={[styles.text, themeTextStyle]}>Kalorijos</Text>
            <View style={[styles.progressBarContainer, themeContainer]}>
            <CircularProgress
              size={110} 
              strokeWidth={10}
              //progressPercent={60}
              progressPercent={(sumCalories/goalCalories)*100}
              text="50%" //does nothing currently
              fill={themeProg}
              back={themeProgF}
            />
            </View>
            <Text style={[styles.text, themeTextStyle]}>{sumCalories.toFixed(0)}/{goalCalories} kcal</Text>
            <Text>{'\n'}</Text>
          </View>
        <View style={[styles.column, themeContainer]}>
          <View style={[styles.statsItem, themeContainer]}>
          <Text style={[styles.text, themeTextStyle]}>Baltymai</Text>
            <View style={styles.progressBarContainer}>
              {/* <ProgressBar progress={(sumProtein/goalProtein)} color={themeProg} style={themeProgBack}/> */}
            </View>
            <Text style={[styles.text, themeTextStyle]}>{sumProtein.toFixed(0)}/{goalProtein} g</Text>
          </View>
          <View style={[styles.statsItem, themeContainer]}>
          <Text style={[styles.text, themeTextStyle]}>Angliavandeniai</Text>
            <View style={styles.progressBarContainer}>
              {/* <ProgressBar progress={(sumCarbs/goalCarbs)} color={themeProg} style={themeProgBack} /> */}
            </View>
            <Text style={[styles.text, themeTextStyle]}>{sumCarbs.toFixed(0)}/{goalCarbs} g</Text>
          </View>
          <View style={[styles.statsItem, themeContainer]}>
          <Text style={[styles.text, themeTextStyle]}>Riebalai</Text>
            <View style={styles.progressBarContainer}>
              {/* <ProgressBar progress={(sumFat/goalFat)} color={themeProg} style={themeProgBack} /> */}
            </View>
            <Text style={[styles.text, themeTextStyle]}>{sumFat.toFixed(0)}/{goalFat} g</Text>
          </View>
        </View>
      </View>

      <View style={[commonStyles.mainStatsContainer, themeContainer]}>
        <View style={[styles.column, themeContainer]}>
          <Text style={[styles.text, themeTextStyle]}>Pr</Text>
          <Text style={[styles.text, themeTextStyle]}>An</Text>
          <Text style={[styles.text, themeTextStyle]}>Tr</Text>
          <Text style={[styles.text, themeTextStyle]}>Kt</Text>
          <Text style={[styles.text, themeTextStyle]}>Pe</Text>
          <Text style={[styles.text, themeTextStyle]}>Še</Text>
          <Text style={[styles.text, themeTextStyle]}>Sk</Text>
        </View>
      </View>

      <View style={[commonStyles.mainStatsContainer, themeContainer, { alignItems: 'center'}]}>
        <View style={[styles.column, themeContainer]}>
          <Pressable style={[styles.waterIntakeButton]} onPress={() => handleWaterDrink('minus5')}> 
            <Svg width="100" height="100" style={{ transform: [{ scale: 0.5 }] }} >
              {minusSvg}
            </Svg>
            <Text style={[styles.waterIntakeText, themeTextStyle, {bottom:42, fontSize: 13}]}>500</Text>
          </Pressable>
          <Pressable style={[styles.waterIntakeButton]} onPress={() => handleWaterDrink('minus2')}> 
            <Svg width="100" height="100" style={{ transform: [{ scale: 0.5 }] }} >
              {minusSvg}
            </Svg>
            <Text style={[styles.waterIntakeText, themeTextStyle, {bottom:42, fontSize: 13}]}>200</Text>
          </Pressable>
          <View style={[styles.waterIntakeButton, themeContainer]}>
            <Svg width="100" height="100" style={{ transform: [{ scale: 1 }] }} >
              {waterSvg}
            </Svg>
          </View>
          <Text style={[styles.waterIntakeText, themeTextStyle]}>{Watah}ml</Text>
          <Pressable style={styles.waterIntakeButton} onPress={() => handleWaterDrink('add2')} >
            <Svg width="100" height="100" style={{ transform: [{ scale: 0.5 }] }} >
              {plusSvg}
            </Svg>
            <Text style={[styles.waterIntakeText, themeTextStyle, {bottom:42, fontSize: 13}]}>200</Text>
          </Pressable>
          <Pressable style={styles.waterIntakeButton} onPress={() => handleWaterDrink('add5')} >
            <Svg width="100" height="100" style={{ transform: [{ scale: 0.5 }] }} >
              {plusSvg}
            </Svg>
            <Text style={[styles.waterIntakeText, themeTextStyle, {bottom:42, fontSize: 13}]}>500</Text>
          </Pressable>
        </View>
      </View>
        <View style={[commonStyles.mainStatsContainer, themeContainer]}>
          <Text style={[styles.text, themeTextStyle]}>Maisto istorija:</Text>
          <View style={{ maxHeight: 100, backgroundColor:''}}>
          <FlatList
            data={eatenFoods}
            keyExtractor={(item, index) => index.toString()} // or use a unique ID if available
            renderItem={renderEatenFoodItem}
          />
          </View>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '47%',
  },
  statsItem: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  statsCounter: {
    fontSize: 16,
  },
  waterIntakeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  waterIntakeButton: {
    width: 100,
    height: 100,
    margin: -10,
  },
  waterIntakeText: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
  },
  progressBarContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  FoodItemStyle: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});