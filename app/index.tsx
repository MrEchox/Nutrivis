import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import {collection, query, where, getDocs, addDoc} from "firebase/firestore";
import {db} from "../firebase.config.js";
import { food_object_eaten } from '@/src/object_classes/food_object_eaten'; 
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
        
        querySnapshot.forEach((doc) => {
            const userDocId = doc.id;
            try {
                const q2 = collection(db, "users", userDocId, "daily_food");
                for (const food of foodValuesUser) {
                    for (const food of foodValuesUser) {
                        const foodData = JSON.parse(food[1]);
                        const thisFood = querySnapshot.docs[0].data().daily_food.filter(food => food.name === foodData.name && food.date === foodData.date);
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
                const databaseFood = querySnapshot.docs[0].data().daily_food;
                for (const food of databaseFood) {
                    const thisFood = foodValuesUser.filter(food => food[1].includes(food.name) && food[1].includes(food.date));
                    if (thisFood.length === 0) {
                        addDoc(q2, {
                            date: food.date,
                            amount: food.amount,
                            name: food.name,
                            calories: food.calories,
                            carbs: food.carbs,
                            fat: food.fat,
                            protein: food.protein
                        });
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
                    const thisGoal = querySnapshot.docs[0].data().daily_goal.filter(goal => goal.date === goalData.date);
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
                const databaseGoal = querySnapshot.docs[0].data().daily_goal;
                for (const goal of databaseGoal) {
                    console.log('Goal:', goal);
                    const thisGoal = goalValuesUser.filter(goal => goal[1].includes(goal.date));
                    if (thisGoal.length === 0) {
                        addDoc(q3, {
                            date: goal.date,
                            calories: goal.calories,
                            carbs: goal.carbs,
                            fat: goal.fat,
                            protein: goal.protein,
                            steps: goal.steps
                        });
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
                    const thisWater = querySnapshot.docs[0].data().daily_water.filter(water => water.date === waterData.date);
                    if (thisWater.length > 0) {
                        console.log('Water already exists in database');
                    } else {
                        addDoc(q4, {
                            date: waterData.date,
                            amount: waterData.amount
                        });
                    }
                }
                const databaseWater = querySnapshot.docs[0].data().daily_water;
                for (const water of databaseWater) {
                    const thisWater = waterValuesUser.filter(water => water[1].includes(water.date));
                    if (thisWater.length === 0) {
                        addDoc(q4, {
                            date: water.date,
                            amount: water.amount
                        });
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
                if (status.email === '') {
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
