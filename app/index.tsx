import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

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
