import React from 'react';
import { View, Text, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";

import quizContent from './quiz_content';

export default function CongratsScreen() {
    const { score } = useLocalSearchParams();
    const scoreNumber = parseInt(score, 10);
    const { quizId } = useLocalSearchParams();
    const prefix = '@Topic:';

    const router = useRouter();


    const countQuizQuestions = quizContent
        .filter((item) => item.quizId === quizId)
        .flatMap((item) => item.content)
        .filter((contentItem) => contentItem.type === 'quiz')
        .length;

    // Save the quiz results to AsyncStorage
    if (scoreNumber === countQuizQuestions)
        try {
            var id = prefix + quizId;
            AsyncStorage.setItem(id, true.toString());
            AsyncStorage.getItem(id).then((res) => console.log("Added completed quiz:\n" + res))
        }
        catch (e) {
            console.log(e);
        }


    return (
        <View>
            <Text>Sveikiname! Jūs surinkote {score} iš {countQuizQuestions} taškų</Text>
            <Button title="Grįžti atgal" onPress={() => router.replace('../(tabs)/diet_info')} />
        </View>
    );
}