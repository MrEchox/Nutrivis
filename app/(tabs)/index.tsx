import React from 'react';
import { StyleSheet, View, Pressable, Image, Text, useColorScheme} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { commonStyles } from '../commonStyles';

export default function TabOneScreen() {
  //const colorScheme = useColorScheme();
  const colorScheme = 'light';
  const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
  
  return (
    <View style={[styles.container, themeContainerStyle]}>
      <View style={commonStyles.mainStatsContainer}>
      <View style={styles.statsItem}>
            <Text style={[styles.text, themeTextStyle]}>Kalorijos</Text>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={0.75} color='#003049' style={styles.progressBar} />
            </View>
            <Text style={styles.statsCounter}>1500/2000</Text>
            <Text>{'\n'}</Text>
          </View>
        <View style={styles.column}>
          <View style={styles.statsItem}>
          <Text style={[styles.text, themeTextStyle]}>Baltymai</Text>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={0.4} color='#003049' style={styles.progressBar} />
            </View>
            <Text style={styles.statsCounter}>8/20 g</Text>
          </View>
          <View style={styles.statsItem}>
          <Text style={[styles.text, themeTextStyle]}>Angliavandeniai</Text>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={0.2} color='#003049' style={styles.progressBar} />
            </View>
            <Text style={styles.statsCounter}>2/10 g</Text>
          </View>
          <View style={styles.statsItem}>
          <Text style={[styles.text, themeTextStyle]}>Riebalai</Text>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={0.7} color='#003049' style={styles.progressBar} />
            </View>
            <Text style={styles.statsCounter}>15/20 g</Text>
          </View>
        </View>
      </View>

      <View style={commonStyles.mainStatsContainer}>
        <View style={styles.column}>
          <Text style={[styles.text, themeTextStyle]}>Pr</Text>
          <Text style={[styles.text, themeTextStyle]}>An</Text>
          <Text style={[styles.text, themeTextStyle]}>Tr</Text>
          <Text style={[styles.text, themeTextStyle]}>Kt</Text>
          <Text style={[styles.text, themeTextStyle]}>Pe</Text>
          <Text style={[styles.text, themeTextStyle]}>Še</Text>
          <Text style={[styles.text, themeTextStyle]}>Sk</Text>
        </View>
      </View>

        <View style={[commonStyles.mainStatsContainer, { alignItems: 'center'}]}>
          <View style={styles.waterIntakeContainer}>
            <Pressable style={styles.waterIntakeButton}>
              <Image source={require('../../assets/images/minus_symbol.png')} style={{width: 35, height: 5,}} />
            </Pressable>
            <Image source={require('../../assets/images/water-glass.png')} style={styles.waterImage} />
            <Text style={styles.waterIntakeText}>10</Text>
            <Pressable style={styles.waterIntakeButton}>
              <Image source={require('../../assets/images/plus_symbol.png')} style={{width: 35, height: 35,}} />
            </Pressable>
          </View>
        </View>

      <View style={styles.columnContainer}>
        <View style={commonStyles.mainStatsContainer}>
        <Text style={[styles.text, themeTextStyle]}>Quick Meal 1</Text>
          <Image source={require('../../assets/images/water-glass.png')} style={styles.waterImage}></Image>
        </View>
        <View style={commonStyles.mainStatsContainer}>
        <Text style={[styles.text, themeTextStyle]}>Quick Meal 2</Text>
          <Image source={require('../../assets/images/water-glass.png')} style={styles.waterImage}></Image>
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
    paddingTop: 50,
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '47%',
  },
  statsItem: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  statsCounter: {
    fontSize: 16,
    color: "#ffffff",
  },
  waterIntakeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  waterIntakeButton: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 30,
    color: 'white'
  },
  waterImage: {
    width: 50,
    height: 50,
  },
  waterIntakeText: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'white',
  },
  progressBarContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    width: 100,
  },
});