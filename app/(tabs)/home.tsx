import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Button, Pressable, useColorScheme, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from 'react-native-paper';
import { commonStyles } from '../../components/commonStyles';
import CircularProgress from '../../components/CircularProgress';
import { getSvgByName } from '../../components/SVGs';
import { Svg } from 'react-native-svg';
import { daily_water_object } from '@/src/object_classes/daily_water';
import { useFocusEffect } from '@react-navigation/native';
import { BarChart } from "react-native-gifted-charts";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Food_Eaten_Prefix = '@Food_Eaten:';
const Goal_Prefix = '@Goal:';

export default function Tracking() {

  // -------------- Constants and Variables --------------

  const [sumCalories, setSumCalories] = useState(0);
  const [sumCarbs, setSumCarbs] = useState(0);
  const [sumFat, setSumFat] = useState(0);
  const [sumProtein, setSumProtein] = useState(0);

  const [goalCalories, setGoalCalories] = useState(0);
  const [goalCarbs, setGoalCarbs] = useState(0);
  const [goalFat, setGoalFat] = useState(0);
  const [goalProtein, setGoalProtein] = useState(0);

  const [PBarProtein, setPBarProtein] = useState(0);
  const [PBarCarbs, setPBarCarbs] = useState(0);
  const [PBarFat, setPBarFat] = useState(0);

  const [barData, setBarData] = useState([
    { value: 0, label: 'Pr' },
    { value: 0, label: 'An' },
    { value: 0, label: 'Tr' },
    { value: 0, label: 'Kt' },
    { value: 0, label: 'Pe' },
    { value: 0, label: 'Še' },
    { value: 0, label: 'Sk' },
  ]);

  const [eatenFoods, setEatenFoods] = useState([]);

  //Theme consts, to be moved elsewhere
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? [commonStyles.lightThemeText, { fontFamily: 'Helvetica', fontWeight: 'bold' }] : [commonStyles.darkThemeText, { fontFamily: 'Helvetica', fontWeight: 'bold' }];
  const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
  const themeContainer = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
  const themeProg = colorScheme === 'light' ? '#669bbc' : '#003049';
  const themeProgF = colorScheme === 'light' ? '#ffffff' : '#ffffff';
  const themeProgBack = colorScheme === 'light' ? commonStyles.lightProgress : commonStyles.darkProgress;
  const themeSvg = colorScheme === 'light' ? '#ffffff' : '#003049'

  const minusSvg = getSvgByName("minus", themeSvg);
  const plusSvg = getSvgByName("plus", themeSvg);
  const waterSvg = getSvgByName("water", themeSvg);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date()); //these are changed on useFocusEffect

  var date = new Date();
  const currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(); // dd/mm/yyyy

  const [Watah, setWatah] = useState(0);

  // -------------------------------- End of constants -----------------------------------

  // Gets the current user's email
  const getLoggedInEmail = async () => {
    const loginVal = await AsyncStorage.getItem("@LoggedIn:");
    if (loginVal) {
      const status = JSON.parse(loginVal);
      return status.email;
    }
    return "";
  };

  // Render eaten food item
  const renderEatenFoodItem = ({ item, index }) => (
    <View style={[styles.FoodItemStyle, { backgroundColor: themeSvg }]}>
      <Text style={themeTextStyle}>{item.date.substring(10, 15)} {item.name} {item.amount} g</Text>
      <TouchableOpacity onPress={() => removeEatenFoodItem(item, index)}>
        <Text style={{ color: '#cf5a5a', fontWeight: 'bold' }}>X</Text>
      </TouchableOpacity>
    </View>
  );
  const [loading, setLoading] = useState(true);

    // Function to set the start and end dates for the current week
  const setDates = () => {
    let currentDate = new Date();
    let currentDayOfWeek = currentDate.getDay();
    let difference = currentDayOfWeek - 1;
    if (difference < 0) {
        difference = 6;
    }
    let mondayDate = new Date(currentDate);

    mondayDate.setDate(currentDate.getDate() - difference)
    mondayDate.setHours(0, 0, 0, 0);
    setStartDate(mondayDate);

    let sundayDate = new Date(mondayDate);
    sundayDate.setDate(mondayDate.getDate() + 6);
    setEndDate(sundayDate);
    sundayDate.setHours(23, 59, 59, 999);
  }
  
  // Function to fetch data from AsyncStorage
  const fetchData = async () => {
    try {
      const email = await getLoggedInEmail();

      // Fetch all keys from AsyncStorage
      const allKeys = await AsyncStorage.getAllKeys();

      const appKeysGoal = allKeys.filter(key => key.startsWith(Goal_Prefix + "local" + ":" + email));

      const appKeysEatenAll = allKeys.filter(key => key.startsWith(Food_Eaten_Prefix)); // Gets all eaten food values
      const appKeysEatenAllFiltered = appKeysEatenAll.filter(key => key.includes(email)); // Filter out only eaten food values for the logged in user

      // Fetch values corresponding to the filtered keys
      const unfilteredValuesGoalLocal = await AsyncStorage.multiGet(appKeysGoal);
      const valuesGoalLocal = unfilteredValuesGoalLocal.filter(([key, value]) => {
        const data = JSON.parse(value);
        return data.email === email;
      });

      // Goal values
      console.log("Goal values: " + valuesGoalLocal);
      const goalValues = JSON.parse(valuesGoalLocal[0][1]);

      if (goalValues !== null) {
        if (goalValues.calories !== null) {
          setGoalCalories(goalValues.calories);
        }
        else {
          setGoalCalories(0);
        }

        if (goalValues.carbs !== null) {
          setGoalCarbs(goalValues.carbs);
        }
        else {
          setGoalCarbs(0);
        }

        if (goalValues.fat !== null) {
          setGoalFat(goalValues.fat);
        }
        else {
          setGoalFat(0);
        }

        if (goalValues.protein !== null) {
          setGoalProtein(goalValues.protein);
        }
        else {
          setGoalProtein(0);
        }

      }
      else {
        setGoalCalories(0);
        setGoalCarbs(0);
        setGoalFat(0);
        setGoalProtein(0);
      }


      setEatenFoods([]); // Clear eaten foods list
      var keysBetweenStartAndEnd = [];

      ///////////////////////////////////////start of bar chart data/////////////////////////////////////
      var weekCalories = [
        { value: 0, label: 'Pr' },
        { value: 0, label: 'An' },
        { value: 0, label: 'Tr' },
        { value: 0, label: 'Kt' },
        { value: 0, label: 'Pe' },
        { value: 0, label: 'Še' },
        { value: 0, label: 'Sk' },
      ];

      var startDateHere = startDate;

      //set calories eaten for each day of the week
      for (let i = 0; i < 7; i++) {
        keysBetweenStartAndEnd = []; // clear days food
        for (const foodKey of appKeysEatenAllFiltered) {
          const splits = foodKey.split(':');
          const [day, month, year] = splits[1].split(/[ -]/)[0].split('/'); //long-ass function, but it works, don't worry about it
          const date = new Date(`${year}-${month}-${day}`);
          var nextDay = new Date();
          nextDay = new Date(new Date(startDateHere).getTime() + 60 * 60 * 24 * 1000);

          if (date >= startDateHere && date < nextDay && splits[splits.length - 1] === email) {
            keysBetweenStartAndEnd.push(foodKey);
          }
        }
        const valuesFood = await AsyncStorage.multiGet(keysBetweenStartAndEnd);

        for (const foodIndex in valuesFood) {
          const parsedFood = JSON.parse(valuesFood[foodIndex][1]);
          console.log(parsedFood.calories);
          weekCalories[i].value += parsedFood.calories / 100 * parsedFood.amount;
          console.log(weekCalories[i].value);
        }
        startDateHere.setDate(startDateHere.getDate() + 1);

        console.log("day: " + i + " weekcals: " + weekCalories[i].value);
      }

      setBarData(weekCalories);
      ///////////////////////////////////////end of bar chart data/////////////////////////////////////

      const appKeysEatenUnfiltered = allKeys.filter(key => key.startsWith(Food_Eaten_Prefix + currentDate)); // Gets todays eaten food values
      const appKeysEaten = appKeysEatenUnfiltered.filter(key => key.includes(email)); // Filter out only todays eaten food values for the logged in user
      const appKeysWater = allKeys.filter(key => key.startsWith('@Water:' + currentDate)); // Gets todays drank water values

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
      if (valuesWater.length > 0) {
        const waterValues = JSON.parse(valuesWater[0][1]);
        setWatah(waterValues.water);
        console.log("Loaded water: " + waterValues.water + "ml");
      }

      var Calories = 0
      var Carbs = 0
      var Fat = 0
      var Protein = 0

      console.log("Eaten values: " + valuesEaten);

      valuesEaten.forEach(element => {
        // Add to list
        const newEatenFood = JSON.parse(element[1]);
        setEatenFoods(prevEatenFoods => [...prevEatenFoods, { ...newEatenFood, key: `${newEatenFood.date}:${newEatenFood.name}` }]);


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

      if (goalValues.carbs !== null) {
        setPBarCarbs(((Carbs / goalValues.carbs) < 1 && (Carbs / goalValues.carbs) >= 0 ? Carbs /goalValues.carbs : 1));
      }
      else{
        setPBarCarbs(0);
      }

      if (goalValues.fat !== null) {
        setPBarFat((Fat / goalValues.fat) < 1 && (Fat / goalValues.fat) >= 0 ? Fat / goalValues.fat : 1);
      }
      else{
        setPBarFat(0);
      }

      if (goalValues.protein !== null) {
        setPBarProtein((Protein / goalValues.protein) < 1 && (Protein / goalValues.protein) >= 0 ? Protein / goalValues.protein : 1);
      }
      else{
        setPBarProtein(0);
      }

      console.log("PBarProtein: " + (Protein / goalProtein) + " PBarCarbs: " + (Carbs / goalCarbs) + " PBarFat: " + (Fat / goalFat))

    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };


  // Function calls on page focus
  useEffect(() => {
    fetchData();
  
    // Return cleanup function
    return () => {
      // Any cleanup you want to do when startDate changes
    };
  }, [startDate]);


  useFocusEffect( // When focusing on page, fetch data
  React.useCallback(() => {
    setDates();
    // Return cleanup function
    return () => {
      // Any cleanup you want to do when the component is unmounted or loses focus
    };
  }, [])
);

  // Function to remove an eaten food item
  const removeEatenFoodItem = async (item, index) => {
    try {
      //@EatenFood:date:name:email

      // Get the key from the item's data
      const keyToRemove = `${Food_Eaten_Prefix}${item.date}:${item.name}:${item.email}`;

      // Remove the item from AsyncStorage
      await AsyncStorage.removeItem(keyToRemove);

      // Remove the item from the state
      setEatenFoods((prevEatenFoods) => {
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
    <SafeAreaView style={[styles.container, themeBackground]}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView style={[{ paddingTop: 10 }]}>
          <View style={[commonStyles.mainStatsContainer, themeContainer]}>
            <View style={[styles.statsItem, themeContainer, {marginBottom: -30}]}>
              <Text style={[styles.title, styles.text, themeTextStyle]}>Kalorijos</Text>
              <View style={[styles.progressBarContainer, themeContainer]}>
                <CircularProgress
                  size={110}
                  strokeWidth={10}
                  progressPercent={(sumCalories / goalCalories) * 100}
                  text="50%" //does nothing currently
                  fill={themeProg}
                  back={themeProgF}
                />
              </View>
              <Text style={[styles.text, themeTextStyle]}>{sumCalories.toFixed(0)}/{goalCalories} kcal</Text>
              <Text>{'\n'}</Text>
            </View>

            {(
              <View style={[styles.column, themeContainer]}>
                <View style={[styles.statsItem, themeContainer]}>
                  <Text style={[styles.text, themeTextStyle]}>Baltymai</Text>
                  <View style={styles.progressBarContainer}>
                    <ProgressBar progress={(PBarProtein <= 1 && PBarProtein >= 0 ? PBarProtein : 0)} color={themeProg} style={themeProgBack}/>
                  </View>
                  <Text style={[styles.text, themeTextStyle]}>{sumProtein.toFixed(0)}/{goalProtein} g</Text>
                </View>
                <View style={[styles.statsItem, themeContainer]}>
                  <Text style={[styles.text, themeTextStyle]}>Angliavandeniai</Text>
                  <View style={styles.progressBarContainer}>
                    <ProgressBar progress={(PBarCarbs <= 1 && PBarCarbs >= 0 ? PBarCarbs : 0)} color={themeProg} style={themeProgBack}/>
                  </View>
                  <Text style={[styles.text, themeTextStyle]}>{sumCarbs.toFixed(0)}/{goalCarbs} g</Text>
                </View>
                <View style={[styles.statsItem, themeContainer]}>
                  <Text style={[styles.text, themeTextStyle]}>Riebalai</Text>
                  <View style={styles.progressBarContainer}>
                    <ProgressBar progress={(PBarFat <= 1 && PBarFat >= 0 ? PBarFat : 0)} color={themeProg} style={themeProgBack} />
                  </View>
                  <Text style={[styles.text, themeTextStyle]}>{sumFat.toFixed(0)}/{goalFat} g</Text>
                </View>
              </View>
            )} 
          </View>

          <View style={[commonStyles.mainStatsContainer, themeContainer]}>
            <View style={[styles.statsItem, themeContainer]}>
              <Text style={[styles.title, styles.text, themeTextStyle]}>Savaitė</Text>
              <View style={[styles.progressBarContainer, themeContainer]}>
                <BarChart
                  key={JSON.stringify(barData)}
                  barWidth={22}
                  noOfSections={3}
                  barBorderRadius={5}
                  frontColor={themeSvg}
                  data={barData}
                  yAxisThickness={0}
                  xAxisThickness={0}
                  hideYAxisText={true}
                  xAxisLabelTextStyle={[themeTextStyle]}
                  dashGap={0}
                  xAxisColor={'red'}
                  height={100}
                />
              </View>
            </View>
          </View>

          <View style={[commonStyles.mainStatsContainer, themeContainer, { alignItems: 'center' }]}>
            <View style={[styles.column, themeContainer]}>
              <Pressable style={[styles.waterIntakeButton]} onPress={() => handleWaterDrink('minus5')}>
                <Svg width="100" height="100" style={{ transform: [{ scale: 0.5 }] }} >
                  {minusSvg}
                </Svg>
                <Text style={[styles.waterIntakeText, themeTextStyle, { bottom: 42, fontSize: 13 }]}>500</Text>
              </Pressable>
              <Pressable style={[styles.waterIntakeButton]} onPress={() => handleWaterDrink('minus2')}>
                <Svg width="100" height="100" style={{ transform: [{ scale: 0.5 }] }} >
                  {minusSvg}
                </Svg>
                <Text style={[styles.waterIntakeText, themeTextStyle, { bottom: 42, fontSize: 13 }]}>200</Text>
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
                <Text style={[styles.waterIntakeText, themeTextStyle, { bottom: 42, fontSize: 13 }]}>200</Text>
              </Pressable>
              <Pressable style={styles.waterIntakeButton} onPress={() => handleWaterDrink('add5')} >
                <Svg width="100" height="100" style={{ transform: [{ scale: 0.5 }] }} >
                  {plusSvg}
                </Svg>
                <Text style={[styles.waterIntakeText, themeTextStyle, { bottom: 42, fontSize: 13 }]}>500</Text>
              </Pressable>
            </View>
          </View>
          <View style={[commonStyles.mainStatsContainer, themeContainer]}>
            <Text style={[styles.text, themeTextStyle]}>Maisto istorija:</Text>
            <View style={{ maxHeight: 100, backgroundColor: '' }}>
              <FlatList
                nestedScrollEnabled={true}
                data={eatenFoods}
                keyExtractor={(item, index) => `${item.date}:${item.name}:${index}`}
                renderItem={renderEatenFoodItem}
              />
            </View>
          </View>
          <Text></Text>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: -20,
    //alignItems: 'center',
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
    alignItems: 'center'
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
    margin: -16,
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});