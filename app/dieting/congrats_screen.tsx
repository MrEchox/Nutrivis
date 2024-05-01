import React from 'react';
import { View, Text, Button } from 'react-native';
import quizContent from './quiz_content'; // Importing the structured quiz content

function CongratsScreen({ route, navigation }) {
    const { score } = route.params;

    return (
        <View>
            <Text>Congratulations! You scored {score} out of {quizContent.filter((item) => item.type === 'quiz').length}</Text>
            <Button title="Start Again" onPress={() => navigation.navigate('QuizScreen')} />
        </View>
    );
}

export default CongratsScreen;
