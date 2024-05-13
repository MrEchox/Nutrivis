import React from 'react';
import { View, Text, Button, StyleSheet, useColorScheme, Image} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";

import quizContent from './quiz_content';
import { commonStyles } from '@/components/commonStyles';

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


    const colorScheme = useColorScheme();
    const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
    const themeContainer = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;
    const themeSvg = colorScheme === 'light' ? '#ffffff' : '#003049';
    return (
        <View style={[themeBackground, styles.container]}>
            <View style={[themeContainer, commonStyles.mainStatsContainer]}>
              {score === '0' ? (
                <Text style={[themeTextStyle, styles.label]}>Ups! Jūs surinkote {score} iš {countQuizQuestions} taškų. Sėkmės kitą kartą</Text>
              ) : (
                <Text style={[themeTextStyle, styles.label]}>Sveikiname! Jūs surinkote {score} iš {countQuizQuestions} taškų.</Text>
                )}
                <View style={[{alignSelf:'center'}]}>
                    <Image 
                      source={require('../../assets/images/nutrivis_hmm.png')}
                      style={[{width:150, height:167, marginBottom:20}]}
                    />
                </View>
                <View style={[styles.buttonContainer, {marginTop:10}]}>
                    <Button color={themeSvg} title="Grįžti atgal" onPress={() => router.replace('../(tabs)/diet_info')} />
                </View>
            </View>
        </View>
    );
}

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