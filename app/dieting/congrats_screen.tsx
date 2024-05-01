import React from 'react';
import { View, Text, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import quizContent from './quiz_content';

export default function CongratsScreen() {
    const { score } = useLocalSearchParams();
    const { quizId } = useLocalSearchParams();
    const router = useRouter();

    const countQuizQuestions = quizContent
        .filter((item) => item.quizId === quizId)
        .flatMap((item) => item.content)
        .filter((contentItem) => contentItem.type === 'quiz')
        .length;


    return (
        <View>
            <Text>Sveikiname! Jūs surinkote {score} iš {countQuizQuestions} taškų</Text>
            <Button title="Grįžti atgal" onPress={() => router.replace('../(tabs)/diet_info')} />
        </View>
    );
}