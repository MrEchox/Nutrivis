import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import quizContent from './quiz_content'; // Importing the structured quiz content
import { Button } from 'react-native-paper';


const QuizScreen = ({ navigation }) => {
    // Retrieve the 'quizId' parameter from the route
    const { quizId } = useLocalSearchParams();
    console.log('Quiz ID:', quizId); // Debug line

    const router = useRouter();

    // Filter the content based on 'quizId'
    const quizData = quizContent.find((item) => item.quizId === quizId).content;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);

    const currentContent = quizData[currentIndex];

    const handleAnswer = (answer) => {
        if (currentContent.type === 'quiz' && currentContent.correctAnswer === answer) {
            setScore(score + 1);
        }

        const nextIndex = currentIndex + 1;
        if (nextIndex < quizData.length) {
            setCurrentIndex(nextIndex);
        } else {
            router.push('../dieting/congrats_screen?score=' + score + '&quizId=' + quizId);
        }
    };

    return (
        <View>
            <Text>{`Quiz: ${quizId}`}</Text> {/* Display the quiz identifier */}
            {currentContent.type === 'info' && (
                <View>
                    <Text>{currentContent.text}</Text>
                    <Button onPress={() => handleAnswer()}>Next</Button>
                </View>
            )}
            {currentContent.type === 'quiz' && (
                <View>
                    <Text>{currentContent.question}</Text>
                    {currentContent.options.map((option, index) => (
                        <TouchableOpacity key={index} onPress={() => handleAnswer(option)}>
                            <Text>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export default QuizScreen;
