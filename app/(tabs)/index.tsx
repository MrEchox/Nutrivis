import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Button, Pressable, useColorScheme} from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from 'react-native-paper';
import { commonStyles } from '../commonStyles';
import CircularProgress from '../../components/CircularProgress';
import { getSvgByName } from '../../components/SVGs';
import {Svg } from 'react-native-svg';

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


  return (
    <View style={[styles.container, themeBackground]}>
      <View style={[commonStyles.mainStatsContainer, themeContainer]}>
      <View style={[styles.statsItem, themeContainer]}>
            <Text style={[styles.text, themeTextStyle]}>Kalorijos</Text>
            <View style={[styles.progressBarContainer, themeContainer]}>
            <CircularProgress
              size={110} 
              strokeWidth={10} 
              progressPercent={(sumCarbs/goalCarbs)*100}
              text="50%"
              fill={themeProg}
              back={themeProgF}
            />
            </View>
            <Text style={[styles.text, themeTextStyle]}>{sumCarbs}/{goalCarbs}</Text>
            <Text>{'\n'}</Text>
          </View>
        <View style={[styles.column, themeContainer]}>
          <View style={[styles.statsItem, themeContainer]}>
          <Text style={[styles.text, themeTextStyle]}>Baltymai</Text>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={(sumProtein/goalProtein)} color={themeProg} style={themeProgBack}/>
            </View>
            <Text style={[styles.text, themeTextStyle]}>{sumProtein}/{goalProtein} g</Text>
          </View>
          <View style={[styles.statsItem, themeContainer]}>
          <Text style={[styles.text, themeTextStyle]}>Angliavandeniai</Text>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={(sumCarbs/goalCarbs)} color={themeProg} style={themeProgBack} />
            </View>
            <Text style={[styles.text, themeTextStyle]}>{sumCarbs}/{goalCarbs} g</Text>
          </View>
          <View style={[styles.statsItem, themeContainer]}>
          <Text style={[styles.text, themeTextStyle]}>Riebalai</Text>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={(sumFat/goalFat)} color={themeProg} style={themeProgBack} />
            </View>
            <Text style={[styles.text, themeTextStyle]}>{sumFat}/{goalFat} g</Text>
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
            <Pressable style={styles.waterIntakeButton}> 
              <Svg width="100" height="100" style={{ transform: [{ scale: 0.6 }] }} >
                {minusSvg}
              </Svg>
            </Pressable>
            <View style={[styles.waterIntakeButton, themeContainer]}>
              <Svg width="100" height="100" style={{ transform: [{ scale: 0.8 }] }} >
                {waterSvg}
              </Svg>
            </View>
            <Text style={[styles.waterIntakeText, themeTextStyle]}>10</Text>
            <Pressable style={styles.waterIntakeButton}>
              <Svg width="100" height="100" style={{ transform: [{ scale: 0.6 }] }} >
                {plusSvg}
              </Svg>
            </Pressable>
          </View>
        </View>

      <View style={[styles.columnContainer, themeBackground]}>
        <View style={[commonStyles.mainStatsContainer, themeContainer]}>
        <Text style={[styles.text, themeTextStyle]}>Maistas 1</Text>
          <Svg width="100" height="100" style={{ transform: [{ scale: 0.8 }] }} >
                {waterSvg}
              </Svg>
        </View>
        <View style={[commonStyles.mainStatsContainer, themeContainer]}>
        <Text style={[styles.text, themeTextStyle]}>Maistas 2</Text>
        <Svg width="100" height="100" style={{ transform: [{ scale: 0.8 }] }} >
                {waterSvg}
              </Svg>
        </View>
      </View>

      {/* <Text>Tracking Tab</Text>
      <Text>Viso kalorijų per dieną: {sumCalories} Rekomenduojama: {goalCalories}</Text>
      <Text>Viso angliavandenių per dieną: {sumCarbs} Rekomenduojama: {goalCarbs}</Text>
      <Text>Viso riebalų per dieną: {sumFat} Rekomenduojama: {goalFat}</Text>
      <Text>Viso baltymų per dieną: {sumProtein} Rekomenduojama: {goalProtein}</Text> */}
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
});