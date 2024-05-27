import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, useColorScheme, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { commonStyles } from '../../components/commonStyles';

const prefix = '@Topic:';

const pages = [
  { title: 'Kalorijos', quizId: 'calories_quiz' },
  { title: 'Angliavandeniai', quizId: 'carbs_quiz' },
  { title: 'Baltymai', quizId: 'protein_quiz' },
  { title: 'Riebalai - lipidai', quizId: 'fats_quiz' },
  { title: 'Skaidulos', quizId: 'fiber_quiz' },
  { title: 'Hidratacija', quizId: 'hydration_quiz' },
  { title: 'Papildai', quizId: 'supplements_quiz' },
  { title: 'Sportavimo tipai', quizId: 'exercise_types_quiz' },
  { title: 'Valgymo laikas', quizId: 'eating_time_quiz' },
  { title: 'Maisto planavimas', quizId: 'meal_planning_quiz' },
  { title: 'Nutukimas', quizId: 'obesity_quiz' },
  { title: 'Anoreksija', quizId: 'anorexia_quiz' },
  { title: 'Emocinis valgymas', quizId: 'emotional_eating_quiz' },
  // Add more pages as needed
];

const PageList = () => {
  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  const colorScheme = useColorScheme();
  const router = useRouter();

  const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
  const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;
  const themeContainer = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
  const themeSvg = colorScheme === 'light' ? '#ffffff' : '#003049'

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

  const handleItemClick = (quizId) => {
    router.push(`../dieting/quiz_screen?quizId=${quizId}`);
  };

  const renderColumns = () => {
    const numItems = pages.length;
    const numColumns = 2;
    const itemsPerColumn = Math.ceil(numItems / numColumns);
    const columns = [];

    for (let i = 0; i < numColumns; i++) {
      const start = i * itemsPerColumn;
      const end = Math.min(start + itemsPerColumn, numItems);
      const columnItems = pages.slice(start, end);

      columns.push(
        <View key={i} style={styles.column}>
          {columnItems.map((item) => (
            <TouchableOpacity
              key={item.quizId}
              style={[
                styles.item
              ]}
              onPress={() => handleItemClick(item.quizId)}
            >
              <View style={[commonStyles.mainStatsContainer, themeContainer, 
                  completedQuizzes.includes(item.quizId) ? { backgroundColor: themeSvg } : {}, { paddingBottom: 60}]}>
                {completedQuizzes.includes(item.quizId) && (
                  <Image
                    source={require('../../assets/images/nutrivis_award2.png')}
                    style={[{ width: 68, height: 90, marginBottom: 0, position: 'absolute', right: 20, top: 5 }]}
                  />
                )}<Text style={[themeTextStyle, { fontSize: 15 }]}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    return columns;
  };

  return (
    <View style={[themeBackground, styles.container]}>
      <ScrollView style={[{ paddingTop: 10 }]}>
        <View style={[styles.columnContainer, commonStyles.mainStatsContainer, themeContainer, { width: '95%' }]}>
          <View style={[styles.column, { alignItems: 'center' }]}>
            <Image
              source={require('../../assets/images/nutrivis_magnif.png')}
              style={[{ width: 121, height: 167, marginBottom: 20 }]}
            />
          </View>
          <View style={[styles.column, { alignItems: 'center' }]}>
            <Text style={[themeTextStyle, { fontSize: 60 }]}>{completedQuizzes.length}/13</Text>
          </View>
        </View>
        <View style={styles.listContainer}>
          {renderColumns()}
        </View>
      </ScrollView>
    </View>
  );
};

export default PageList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: -20,
    paddingRight:20
  },

  listContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  columnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 0,
    marginBottom: 10,
  },
});
