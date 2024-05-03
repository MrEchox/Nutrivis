import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import quizContent from './quiz_content'; // Importing the structured quiz content
import { Button } from 'react-native-paper';
import { commonStyles } from '@/components/commonStyles';


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

    const colorScheme = useColorScheme();
    const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
    const themeContainer = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;
    const themeSvg = colorScheme === 'light' ? '#ffffff' : '#003049';

    return (
        <View style={[themeBackground, styles.container]}>
            <Text style={[themeTextStyle, styles.label]}>{`Quiz: ${quizId}`}</Text> {/* Display the quiz identifier */}
            {currentContent.type === 'info' && (
                <View style={[themeContainer, commonStyles.mainStatsContainer]}>
                    <Text style={themeTextStyle}>{currentContent.text}</Text>
                    <View style={[{alignSelf:'center', paddingTop: 20}]}>
                        <Image 
                          source={require('../../assets/images/nutrivis_hmm.png')}
                          style={[{width:150, height:167, marginBottom:20}]}
                        />
                    </View>
                    <View style={[styles.buttonContainer]}>
                        <Button buttonColor={themeSvg} textColor={'white'} onPress={() => handleAnswer()}>Next</Button>
                    </View>
                </View>
            )}
            {currentContent.type === 'quiz' && (
                <View style={[themeContainer, commonStyles.mainStatsContainer]}>
                    <Text style={themeTextStyle}>{currentContent.question}</Text>
                    {currentContent.options.map((option, index) => (
                        <View style={[styles.buttonContainer, {backgroundColor:themeSvg, padding:10, marginTop:10}]}>
                            <TouchableOpacity key={index} onPress={() => handleAnswer(option)}>
                                <Text style={themeTextStyle}>{option}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

export default QuizScreen;

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