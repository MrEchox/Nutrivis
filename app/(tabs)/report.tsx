import { StyleSheet, Button, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { parse } from 'expo-linking';
import { commonStyles } from '@/components/commonStyles';
import { BarChart } from "react-native-gifted-charts";

export default function TabTwoScreen() {

    const FOOD_PREFIX = '@Food_Eaten:';
    const WATER_PREFIX = '@Water:';
    const USER_PREFIX = '@LoggedIn:';
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date()); //these are changed on useFocusEffect
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fat, setFat] = useState(0);
    const [protein, setProtein] = useState(0);
    const [water, setWater] = useState(0);
    const [refreshPage, setRefreshPage] = useState(false);
    const [pageEnter, setPageEnter] = useState(true);

    const [caloriesBarData, setBarData] = useState([
        { value: 0, label: 'Pr' },
        { value: 0, label: 'An' },
        { value: 0, label: 'Tr' },
        { value: 0, label: 'Kt' },
        { value: 0, label: 'Pe' },
        { value: 0, label: 'Še' },
        { value: 0, label: 'Sk' },
    ]);

    const [carbsBarData, setCarbsBarData] = useState([
        { value: 0, label: 'Pr' },
        { value: 0, label: 'An' },
        { value: 0, label: 'Tr' },
        { value: 0, label: 'Kt' },
        { value: 0, label: 'Pe' },
        { value: 0, label: 'Še' },
        { value: 0, label: 'Sk' },
    ]);

    const [fatBarData, setFatBarData] = useState([
        { value: 0, label: 'Pr' },
        { value: 0, label: 'An' },
        { value: 0, label: 'Tr' },
        { value: 0, label: 'Kt' },
        { value: 0, label: 'Pe' },
        { value: 0, label: 'Še' },
        { value: 0, label: 'Sk' },
    ]);

    const [proteinBarData, setProteinBarData] = useState([
        { value: 0, label: 'Pr' },
        { value: 0, label: 'An' },
        { value: 0, label: 'Tr' },
        { value: 0, label: 'Kt' },
        { value: 0, label: 'Pe' },
        { value: 0, label: 'Še' },
        { value: 0, label: 'Sk' },
    ]);

    const [waterBarData, setWaterBarData] = useState([
        { value: 0, label: 'Pr' },
        { value: 0, label: 'An' },
        { value: 0, label: 'Tr' },
        { value: 0, label: 'Kt' },
        { value: 0, label: 'Pe' },
        { value: 0, label: 'Še' },
        { value: 0, label: 'Sk' },
    ]);

    const fetchData = async () => {
        try {
            var keysBetweenStartAndEnd = [];

            // Fetch all keys from AsyncStorage
            const allKeys = await AsyncStorage.getAllKeys();

            const loggedInKey = allKeys.filter(key => key.startsWith(USER_PREFIX));
            const loggedIn = await AsyncStorage.getItem(loggedInKey[0]);
            const loggedInEmail = JSON.parse(loggedIn).email;

            // Gets keys only between start and end dates
            const appKeysFood = allKeys.filter(key => key.startsWith(FOOD_PREFIX));
            for (const foodKey of appKeysFood) {
                const splits = foodKey.split(':');
                const [day, month, year] = splits[1].split(/[ -]/)[0].split('/'); //long-ass function, but it works, don't worry about it
                const date = new Date(`${year}-${month}-${day}`);
                if (date >= startDate && date <= endDate && splits[splits.length - 1] === loggedInEmail) {
                    keysBetweenStartAndEnd.push(foodKey);
                }
            }

            // Fetch values corresponding to the filtered keys
            const valuesFood = await AsyncStorage.multiGet(keysBetweenStartAndEnd);
            
            var caloriesHere = 0;
            var carbsHere = 0;
            var fatHere = 0;
            var proteinHere = 0;

            for (const foodIndex in valuesFood) {
                const parsedFood = JSON.parse(valuesFood[foodIndex][1]);
                caloriesHere += parsedFood.calories / 100 * parsedFood.amount;
                carbsHere += parsedFood.carbs / 100 * parsedFood.amount;
                fatHere += parsedFood.fat / 100 * parsedFood.amount;
                proteinHere += parsedFood.protein / 100 * parsedFood.amount;
            }

            setCalories(caloriesHere);
            setCarbs(carbsHere);
            setFat(fatHere);
            setProtein(proteinHere);


            // Repeat process for water
            const appKeysWater = allKeys.filter(key => key.startsWith(WATER_PREFIX));
            const waterKeysBetweenStartAndEnd = [];
            for (const waterKey of appKeysWater) {
                const splits = waterKey.split(':');
                const [day, month, year] = splits[1].split(/[ -]/)[0].split('/');
                const date = new Date(`${year}-${month}-${day}`);
                if (date >= startDate && date <= endDate && splits[splits.length - 1] === loggedInEmail) {
                    waterKeysBetweenStartAndEnd.push(waterKey);
                }
            }

            const valuesWater = await AsyncStorage.multiGet(waterKeysBetweenStartAndEnd);
            var waterHere = 0;
            for (const waterIndex in valuesWater) {
                waterHere += JSON.parse(valuesWater[waterIndex][1]).water;
            }
            setWater(waterHere);
            console.log('Water:', waterHere);

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

        var weekCarbs = [
            { value: 0, label: 'Pr' },
            { value: 0, label: 'An' },
            { value: 0, label: 'Tr' },
            { value: 0, label: 'Kt' },
            { value: 0, label: 'Pe' },
            { value: 0, label: 'Še' },
            { value: 0, label: 'Sk' },
        ];

        var weekFat = [
            { value: 0, label: 'Pr' },
            { value: 0, label: 'An' },
            { value: 0, label: 'Tr' },
            { value: 0, label: 'Kt' },
            { value: 0, label: 'Pe' },
            { value: 0, label: 'Še' },
            { value: 0, label: 'Sk' },
        ];

        var weekProtein = [
            { value: 0, label: 'Pr' },
            { value: 0, label: 'An' },
            { value: 0, label: 'Tr' },
            { value: 0, label: 'Kt' },
            { value: 0, label: 'Pe' },
            { value: 0, label: 'Še' },
            { value: 0, label: 'Sk' },
        ];

  
        var startDateHere = new Date(startDate);
  
          //set calories eaten for each day of the week
        for (let i = 0; i < 7; i++) {  
            keysBetweenStartAndEnd = [];

            var nextDay = new Date();

            nextDay = new Date(new Date(startDateHere).getTime() + 60 * 60 * 24 * 1000);

            for (const foodKey of appKeysFood) {
              const splits = foodKey.split(':');
              const [day, month, year] = splits[1].split(/[ -]/)[0].split('/'); //long-ass function, but it works, don't worry about it
              const date = new Date(`${year}-${month}-${day}`);

              if (date >= startDateHere && date < nextDay && splits[splits.length - 1] === loggedInEmail) {

                  keysBetweenStartAndEnd.push(foodKey);
              }
            }

            console.log("Start date here: " + startDateHere);
            console.log("NextDay: " + nextDay)

            console.log("keys between length: " + keysBetweenStartAndEnd.length);

            const valuesFood = await AsyncStorage.multiGet(keysBetweenStartAndEnd);
  
            for (const foodIndex in valuesFood) {
              const parsedFood = JSON.parse(valuesFood[foodIndex][1]);
              console.log(parsedFood.calories);
              weekCalories[i].value += parsedFood.calories / 100 * parsedFood.amount;
              weekCarbs[i].value += parsedFood.carbs / 100 * parsedFood.amount;
              weekFat[i].value += parsedFood.fat / 100 * parsedFood.amount;
              weekProtein[i].value += parsedFood.protein / 100 * parsedFood.amount;
              console.log(weekCalories[i].value);
            }
            startDateHere.setDate(startDateHere.getDate() + 1); 
  
            console.log("day: " + i +" weekcals: " + weekCalories[i].value);
        }
  
        setBarData(weekCalories);
        setCarbsBarData(weekCarbs);
        setFatBarData(weekFat);
        setProteinBarData(weekProtein);
        ///////////////////////////////////////end of bar chart data/////////////////////////////////////

        }   
        catch (error) {
            console.error('Error fetching data:', error);
        }
      };

    const setDates = (dateNavigate: number) => {
        console.log('Setting dates');
        console.log('Date navigate:', dateNavigate);
        switch (dateNavigate) {
            case 0:
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
                break;
            case 1:
                let currentStartDate = startDate;
                let currentEndDate = endDate;

                currentStartDate.setDate(currentStartDate.getDate() + 7);
                currentEndDate.setDate(currentEndDate.getDate() + 7);

                setStartDate(currentStartDate);
                setEndDate(currentEndDate);
                break;
            case -1:
                let currentStartDate2 = startDate;
                let currentEndDate2 = endDate;

                currentStartDate2.setDate(currentStartDate2.getDate() - 7);

                currentEndDate2.setDate(currentEndDate2.getDate() - 7);

                setStartDate(currentStartDate2);

                setEndDate(currentEndDate2);
                break;
            default:
                break;
        }
    };

    const onChangeDate = (dateNavigate: number) => {
        setDates(dateNavigate);
        setRefreshPage(!refreshPage);
    }

    useFocusEffect( // When focusing on page, fetch data
      React.useCallback(() => {
        if (pageEnter) {
            onChangeDate(0);

            setPageEnter(false);
        }

        fetchData();
        // Return cleanup function
        return () => {
          // Any cleanup you want to do when the component is unmounted or loses focus
        };
      }, [refreshPage])
    );
    
    const colorScheme = useColorScheme();
    const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
    const themeContainer = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? [commonStyles.lightThemeText, { fontFamily: 'Helvetica', fontWeight: 'bold' }] : [commonStyles.darkThemeText, { fontFamily: 'Helvetica', fontWeight: 'bold' }];
    const themeSvg = colorScheme === 'light' ? '#ffffff' : '#003049';

    return (
        <View style={[styles.container, themeBackground, {paddingTop: 20}]}>
            <Text style={[styles.title, {paddingBottom: 20}]}>Jūsų savaitės</Text>
            <View style={[commonStyles.mainStatsContainer, themeContainer]}>
                <Text style={[themeTextStyle, {alignSelf:"center"}]}>Data: {startDate.toLocaleDateString('lt-LT')} - {endDate.toLocaleDateString('lt-LT')}</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <View style={[styles.columnContainer, {backgroundColor:'transparent'}]}>
                    <View style={styles.buttonContainer}>
                        <Button color={themeSvg} title="Praėjusi savaitė" onPress={() => onChangeDate(-1)} />
                    </View>
                    <View style={[styles.buttonContainer, {marginLeft: 15}]}>
                        <Button color={themeSvg} title="Kita savaitė" onPress={() => onChangeDate(1)} />
                    </View>
                </View>
            </View>
            <View>
            </View>
            <Text>Kalorijos: {calories} kcal</Text>
            <Text>Angliavandeniai: {carbs} g</Text>
            <Text>Riebalai: {fat} g</Text>
            <Text>Baltymai: {protein} g</Text>
            <Text>Vanduo: {water} ml</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <View style={[commonStyles.mainStatsContainer, themeContainer]}>
                <View style={[styles.statsItem, themeContainer]}>
                    <Text style={[styles.text, themeTextStyle]}>Savaitės kalorijos</Text>
                    <View style={[styles.progressBarContainer, themeContainer]}>
                        <BarChart
                                key={JSON.stringify(caloriesBarData)}
                                barWidth={22}
                                noOfSections={3}
                                barBorderRadius={5}
                                frontColor={themeSvg}
                                data={caloriesBarData}
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
            
            <View style={[commonStyles.mainStatsContainer, themeContainer]}>
                <View style={[styles.statsItem, themeContainer]}>
                    <Text style={[styles.text, themeTextStyle]}>Savaitės angliavandeniai</Text>
                    <View style={[styles.progressBarContainer, themeContainer]}>
                        <BarChart
                                key={JSON.stringify(carbsBarData)}
                                barWidth={22}
                                noOfSections={3}
                                barBorderRadius={5}
                                frontColor={themeSvg}
                                data={carbsBarData}
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

            
            <View style={[commonStyles.mainStatsContainer, themeContainer]}>
                <View style={[styles.statsItem, themeContainer]}>
                    <Text style={[styles.text, themeTextStyle]}>Savaitės riebalai</Text>
                    <View style={[styles.progressBarContainer, themeContainer]}>
                        <BarChart
                                key={JSON.stringify(fatBarData)}
                                barWidth={22}
                                noOfSections={3}
                                barBorderRadius={5}
                                frontColor={themeSvg}
                                data={fatBarData}
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

            
            <View style={[commonStyles.mainStatsContainer, themeContainer]}>
                <View style={[styles.statsItem, themeContainer]}>
                    <Text style={[styles.text, themeTextStyle]}>Savaitės baltymai</Text>
                    <View style={[styles.progressBarContainer, themeContainer]}>
                        <BarChart
                                key={JSON.stringify(proteinBarData)}
                                barWidth={22}
                                noOfSections={3}
                                barBorderRadius={5}
                                frontColor={themeSvg}
                                data={proteinBarData}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 60,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    label: {
      marginRight: 10,
      paddingLeft: 10,
      paddingBottom: 10,
      fontWeight: "500",
    },
    inputContainer: {
      width: '80%',
      marginBottom: 20,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ccc',
      alignSelf: 'center',
    },
    input: {
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    buttonContainer: {
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '',
    },
    columnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    progressBarContainer: {
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 5,
    },
    statsItem: {
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    }
  });
