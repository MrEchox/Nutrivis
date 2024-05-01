import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, FlatList, Text, useColorScheme, TouchableOpacity} from 'react-native';

import { commonStyles } from '../../components/commonStyles';

const pages = [
    { title: '● Kalorijos',               quizId: 'calories_quiz' },
    { title: '● Angliavandeniai',         quizId: 'carbs_quiz' },
    { title: '● Baltymai',                quizId: 'protein_quiz' },
    { title: '● Riebalai - lipidai',      quizId: 'fats_quiz' },
    { title: '● Skaidulos',               quizId: 'fiber_quiz' },
    { title: '● Hidratacija',             quizId: 'hydration_quiz' },
    { title: '● Papildai',                quizId: 'supplements_quiz' },
    { title: '● Sportavimo tipai',        quizId: 'exercise_types_quiz' },
    { title: '● Maisto valgymo laikas',   quizId: 'eating_time_quiz' },
    { title: '● Maisto planavimas',       quizId: 'meal_planning_quiz' },
    { title: '● Nutukimas',               quizId: 'obesity_quiz' },
    { title: '● Anoreksija',              quizId: 'anorexia_quiz' },
    { title: '● Emocinis valgymas',       quizId: 'emotional_eating_quiz' },
  // Add more pages as needed
];

const PageList = () => {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
    const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;


    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[themeTextStyle, {padding: 10}]}
            onPress={() => router.push(`../dieting/quiz_screen?quizId=${item.quizId}`)}
        >
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );
    

    return (
        <View style={[themeBackground, {flex: 1}]}>
            <FlatList
                data={pages}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
            />
        </View>
    );
};

export default PageList;