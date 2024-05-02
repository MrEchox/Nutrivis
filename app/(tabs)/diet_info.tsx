import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, FlatList, Text, useColorScheme, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { commonStyles } from '../../components/commonStyles';

const prefix = '@Topic:';

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

    const [completedQuizzes, setCompletedQuizzes] = useState([]);

    const colorScheme = useColorScheme();
    const router = useRouter();

    const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
    const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;
    const themeSvg = colorScheme === 'light' ? '#ffffff' : '#003049';
    useEffect(() => {
        const fetchCompletedQuizzes = async () => {
            const keys = pages.map((item) => prefix + item.quizId);
            const results = await AsyncStorage.multiGet(keys);

            const completed = results
                .filter(([key, value]) => value === 'true')
                .map(([key, _]) => key.replace(prefix, ''));

            setCompletedQuizzes(completed);
        };

        fetchCompletedQuizzes();
    }, []);

    const renderItem = ({ item }) => {
        const isCompleted = completedQuizzes.includes(item.quizId);

        return (
                <TouchableOpacity
                    style={[
                        themeTextStyle,
                        { padding: 10 },
                        isCompleted ? { backgroundColor: 'lightgreen' } : {},
                    ]}
                    onPress={() => router.push(`../dieting/quiz_screen?quizId=${item.quizId}`)}
                >
                    <Text style={themeTextStyle}>{item.title}</Text>
                </TouchableOpacity>
        );
    };
    

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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 30,
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
  });