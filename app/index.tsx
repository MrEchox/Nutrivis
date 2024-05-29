import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import {collection, query, where, getDocs, addDoc} from "firebase/firestore";
import {db} from "../firebase.config.js";
import { food_object_eaten } from '@/src/object_classes/food_object_eaten'; 
import { daily_goal_object } from "@/src/object_classes/daily_goal";
import { daily_water_object } from '@/src/object_classes/daily_water';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';

const syncData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const foodKeys = keys.filter(key => key.startsWith("@Food_Eaten:"));
        const foodValuesUser = (await AsyncStorage.multiGet(foodKeys)).filter(food => food[1].includes(loggedInEmail));
        const waterKeys = keys.filter(key => key.startsWith("@Water:"));
        const waterValuesUser = (await AsyncStorage.multiGet(waterKeys)).filter(water => water[1].includes(loggedInEmail));
        const goalKeys = keys.filter(key => key.startsWith("@Goal:"));
        const goalValuesUser = (await AsyncStorage.multiGet(goalKeys)).filter(goal => goal[1].includes(loggedInEmail));
        const loggedInKey = keys.filter(key => key.startsWith("@LoggedIn:"));
        const loggedIn = await AsyncStorage.getItem(loggedInKey[0]);
        const loggedInEmail = JSON.parse(loggedIn).email;

        if (!loggedInEmail) {
            return;
        }

        const collectionRef = collection(db, "users");
        const q = query(collectionRef, where("email", "==", loggedInEmail));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach(async (doc) => {
            const userDocId = doc.id;

            console.log('User doc id:', userDocId);

            try {
                const q2 = collection(db, "users", userDocId, "food_eaten");

                for (const food of foodValuesUser) {
                    for (const food of foodValuesUser) {
                        const foodData = JSON.parse(food[1]);

                        const querySnapshot2 = await getDocs(q2);

                        const thisFood = querySnapshot2.docs[0].data().filter(food1 => food1.name === foodData.name && food1.date === foodData.date);
                        if (thisFood.length > 0) {
                            console.log('Food already exists in database');
                        } else {
                        addDoc(q2, {
                                date: foodData.date,
                                amount: foodData.amount,
                                name: foodData.name,
                                calories: foodData.calories,
                                carbs: foodData.carbs,
                                fat: foodData.fat,
                                protein: foodData.protein
                            });
                        }
                    }
                }
                const databaseFood = await getDocs(q2);

                for (const food of databaseFood.docs) {

                    const foodData = food.data();

                    const thisFood = foodValuesUser.filter(food1 => food1[1].includes(foodData.name) && food1[1].includes(foodData.date));

                    if (thisFood.length === 0) {
                        const food_eaten_from_database = new food_object_eaten(foodData.date, foodData.amount, foodData.name, foodData.calories, foodData.carbs, foodData.fat, foodData.protein, loggedInEmail);
                        food_eaten_from_database.saveLocal();
                    }
                }
                
            }
            catch (error) {
                console.error('Error syncing food data:', error);
            }
            
            try {
                const q3 = collection(db, "users", userDocId, "daily_goal");
                for (const goal of goalValuesUser) {
                    const goalData = JSON.parse(goal[1]);

                    const querySnapshot3 = await getDocs(q3);

                    const thisGoal = querySnapshot3.docs[0].data().filter(goal1 => goal1.date === goalData.date);
                    if (thisGoal.length > 0) {
                        console.log('Goal already exists in database');
                    } else {
                        addDoc(q3, {
                            date: goalData.date,
                            calories: goalData.calories,
                            carbs: goalData.carbs,
                            fat: goalData.fat,
                            protein: goalData.protein,
                            steps: goalData.steps
                        });
                    }
                }
                const databaseGoal = await getDocs(q3);
                for (const goal of databaseGoal.docs) {
                    const goalData = goal.data();
                    const thisGoal = goalValuesUser.filter(goal1 => goal1[1].includes(goalData.date));
                    if (thisGoal.length === 0) {
                        const daily_goal_from_database = new daily_goal_object(goalData.calories, goalData.carbs, goalData.fat, goalData.protein, goalData.stepGoal, goalData.date);
                        daily_goal_from_database.saveLocal();
                    }
                }
            }
            catch (error) {
                console.error('Error syncing goal data:', error);
            }

            try {
                const q4 = collection(db, "users", userDocId, "daily_water");
                for (const water of waterValuesUser) {
                    const waterData = JSON.parse(water[1]);

                    const querySnapshot4 = await getDocs(q4);

                    const thisWater = querySnapshot4.docs[0].data().filter(water1 => water1.date === waterData.date);
                    if (thisWater.length > 0) {
                        console.log('Water already exists in database');
                    } else {
                        addDoc(q4, {
                            date: waterData.date,
                            amount: waterData.amount
                        });
                    }
                }
                const databaseWater = await getDocs(q4);

                for (const water of databaseWater.docs) {

                    const waterData = water.data();

                    const thisWater = waterValuesUser.filter(water1 => water1[1].includes(waterData.date));
                    if (thisWater.length === 0) {
                        const daily_water_from_database = new daily_water_object(waterData.date, waterData.water, loggedInEmail);
                        daily_water_from_database.saveLocal();
                    }
                }
            }
            catch (error) {
                console.error('Error syncing water data:', error);
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const loginStatus = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const loginKey = keys.filter(key => key.startsWith("@LoggedIn:"));

        if (loginKey.length > 0) {
            const loginVal = await AsyncStorage.getItem("@LoggedIn:");
            if (loginVal) {
                const status = JSON.parse(loginVal);
                if (status.username === '') {
                    // If user is not logged in, navigate to login screen
                    router.replace('./session/login');
                } else {
                    // If user is logged in, navigate to home screen within the tab stack
                    syncData();
                    router.replace('./(tabs)/home');
                }
            }
        } else {
            // If no login status found, navigate to login screen
            router.replace('./session/login');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


const IndexScreen = () => {
    
    // Use `useFocusEffect` to run the login status check when the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            loginStatus();
        }, [])
    );

    // Return null as this component doesn't render anything directly
    return null;
};

export default IndexScreen;
