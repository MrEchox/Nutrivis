import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, useColorScheme, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { commonStyles } from '../../components/commonStyles';

const prefix = '@Topic:';

const pages = [
  { title: '● Kalorijos', quizId: 'calories_quiz' },
  { title: '● Angliavandeniai', quizId: 'carbs_quiz' },
  { title: '● Baltymai', quizId: 'protein_quiz' },
  { title: '● Riebalai - lipidai', quizId: 'fats_quiz' },
  { title: '● Skaidulos', quizId: 'fiber_quiz' },
  { title: '● Hidratacija', quizId: 'hydration_quiz' },
  { title: '● Papildai', quizId: 'supplements_quiz' },
  { title: '● Sportavimo tipai', quizId: 'exercise_types_quiz' },
  { title: '● Maisto valgymo laikas', quizId: 'eating_time_quiz' },
  { title: '● Maisto planavimas', quizId: 'meal_planning_quiz' },
  { title: '● Nutukimas', quizId: 'obesity_quiz' },
  { title: '● Anoreksija', quizId: 'anorexia_quiz' },
  { title: '● Emocinis valgymas', quizId: 'emotional_eating_quiz' },
  // Add more pages as needed
];

const PageList = () => {

  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  const colorScheme = useColorScheme();
  const router = useRouter();

  const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
  const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;
  const themeContainer = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;

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
            <View style={[commonStyles.mainStatsContainer, themeContainer]}>
              <TouchableOpacity
                key={item.quizId}
                style={[
                  styles.item,
                  completedQuizzes.includes(item.quizId) ? { backgroundColor: 'lightgreen' } : {},
                ]}
                onPress={() => handleItemClick(item.quizId)}
              >
                <Text style={themeTextStyle}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      );
    }

    return columns;
  };

  return (
    <View style={[themeBackground, styles.container]}>
      <View style={[styles.columnContainer, commonStyles.mainStatsContainer, themeContainer, {marginLeft:20}]}>
        <View style={[styles.column, { alignItems: 'center' }]}>
          <Image
            source={require('../../assets/images/nutrivis_magnif.png')}
            style={[{ width: 121, height: 167, marginBottom: 20 }]}
          />
        </View>
        <View style={[styles.column, { alignItems: 'center' }]}>
          <Text style={[themeTextStyle, { fontSize: 70 }]}>1/13</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {renderColumns()}
      </View>
    </View>
  );
};

export default PageList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginTop: 0,
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
    padding: 10,
    marginBottom: 10,
  },
});
