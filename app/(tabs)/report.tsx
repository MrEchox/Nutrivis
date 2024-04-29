import { StyleSheet, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { parse } from 'expo-linking';

export default function TabTwoScreen() {
    
    const FOOD_PREFIX = '@Food_Eaten:';
    const WATER_PREFIX = '@Water:';
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date()); //these are changed on useFocusEffect
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fat, setFat] = useState(0);
    const [protein, setProtein] = useState(0);
    const [water, setWater] = useState(0);
    const [refreshPage, setRefreshPage] = useState(false);
    const [pageEnter, setPageEnter] = useState(true);

    const fetchData = async () => {
        try {
            const keysBetweenStartAndEnd = [];

            // Fetch all keys from AsyncStorage
            const allKeys = await AsyncStorage.getAllKeys();

            // Gets keys only between start and end dates
            const appKeysFood = allKeys.filter(key => key.startsWith(FOOD_PREFIX));
            for (const foodKey of appKeysFood) {
                const [day, month, year] = foodKey.split(':')[1].split(/[ -]/)[0].split('/'); //long-ass function, but it works, don't worry about it
                const date = new Date(`${year}-${month}-${day}`);
                if (date >= startDate && date <= endDate) {
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
                const [day, month, year] = waterKey.split(':')[1].split(/[ -]/)[0].split('/');
                const date = new Date(`${year}-${month}-${day}`);
                if (date >= startDate && date <= endDate) {
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
        fetchData();
        setRefreshPage(!refreshPage);
    }

    useFocusEffect( // When focusing on page, fetch data
      React.useCallback(() => {
        if (pageEnter) {
            onChangeDate(0);
            setPageEnter(false);
        }
        // Return cleanup function
        return () => {
          // Any cleanup you want to do when the component is unmounted or loses focus
        };
      }, [refreshPage])
    );
    return (
        <View style={styles.container}>
        <Text style={styles.title}>'Report' tab</Text>
        <View>
            <Text>Data: {startDate.toLocaleDateString('lt-LT')} - {endDate.toLocaleDateString('lt-LT')}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={{flexDirection: 'row'}}>
                <Button title="Praėjusi savaitė" onPress={() => onChangeDate(-1)} />
                <Button title="Kita savaitė" onPress={() => onChangeDate(1)} />
            </View>
        </View>
        <View>
        </View>
        <Text>Calories: {calories}</Text>
        <Text>Carbs: {carbs}</Text>
        <Text>Fat: {fat}</Text>
        <Text>Protein: {protein}</Text>
        <Text>Water: {water}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </View>
    );
}

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
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
