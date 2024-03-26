import React from 'react';
import { StyleSheet, View, Pressable, Image, Text, useColorScheme} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { commonStyles } from '../commonStyles';
import CircularProgress from '../../components/CircularProgress';
import { getSvgByName } from '../../components/SVGs';
import {Svg } from 'react-native-svg';

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  //const colorScheme = 'light';
  const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;
  const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
  const themeContainer = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
  const themeProg = colorScheme === 'light' ? '#669bbc' : '#003049';
  const themeProgF = colorScheme === 'light' ? '#ffffff' : '#ffffff';
  const themeProgBack = colorScheme === 'light' ? commonStyles.lightProgress : commonStyles.darkProgress;
  const themeSvg = colorScheme === 'light' ? '#ffffff' : '#003049'

  const minusSvg = getSvgByName("minus", themeSvg);
  const plusSvg = getSvgByName("plus", themeSvg);
  const waterSvg = getSvgByName("water", themeSvg);
  
  
  return (
    <View style={[styles.container, themeBackground]}>
      <View style={[commonStyles.mainStatsContainer, themeContainer]}>
      <View style={styles.statsItem}>
            <Text style={[styles.text, themeTextStyle]}>Kalorijos</Text>
            <View style={styles.progressBarContainer}>
            <CircularProgress
              size={110} 
              strokeWidth={10} 
              progressPercent={50}
              text="70%"
              fill={themeProg}
              back={themeProgF}
            />
            </View>
            <Text style={[styles.text, themeTextStyle]}>1500/2000</Text>
            <Text>{'\n'}</Text>
          </View>
        <View style={styles.column}>
          <View style={styles.statsItem}>
          <Text style={[styles.text, themeTextStyle]}>Baltymai</Text>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={0.4} color={themeProg} style={themeProgBack}/>
            </View>
            <Text style={[styles.text, themeTextStyle]}>8/20 g</Text>
          </View>
          <View style={styles.statsItem}>
          <Text style={[styles.text, themeTextStyle]}>Angliavandeniai</Text>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={0.2} color={themeProg} style={themeProgBack} />
            </View>
            <Text style={[styles.text, themeTextStyle]}>2/10 g</Text>
          </View>
          <View style={styles.statsItem}>
          <Text style={[styles.text, themeTextStyle]}>Riebalai</Text>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={0.7} color={themeProg} style={themeProgBack} />
            </View>
            <Text style={[styles.text, themeTextStyle]}>15/20 g</Text>
          </View>
        </View>
      </View>

      <View style={[commonStyles.mainStatsContainer, themeContainer]}>
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

        <View style={[commonStyles.mainStatsContainer, themeContainer, { alignItems: 'center'}]}>
          <View style={styles.column}>
            <Pressable style={styles.waterIntakeButton}> 
              <Svg width="100" height="100" style={{ transform: [{ scale: 0.6 }] }} >
                {minusSvg}
              </Svg>
            </Pressable>
            <View style={styles.waterIntakeButton}>
              <Svg width="100" height="100" style={{ transform: [{ scale: 0.8 }] }} >
                {waterSvg}
              </Svg>
            </View>
            <Text style={[styles.waterIntakeText, themeTextStyle]}>10</Text>
            <Pressable style={styles.waterIntakeButton}>
              <Svg width="100" height="100" style={{ transform: [{ scale: 0.6 }] }} >
                {plusSvg}
              </Svg>
            </Pressable>
          </View>
        </View>

      <View style={styles.columnContainer}>
        <View style={[commonStyles.mainStatsContainer, themeContainer]}>
        <Text style={[styles.text, themeTextStyle]}>Quick Meal 1</Text>
          <Svg width="100" height="100" style={{ transform: [{ scale: 0.8 }] }} >
                {waterSvg}
              </Svg>
        </View>
        <View style={[commonStyles.mainStatsContainer, themeContainer]}>
        <Text style={[styles.text, themeTextStyle]}>Quick Meal 2</Text>
        <Svg width="100" height="100" style={{ transform: [{ scale: 0.8 }] }} >
                {waterSvg}
              </Svg>
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
    fontSize: 16,
    marginBottom: 5,
  },
  statsCounter: {
    fontSize: 16,
  },
  waterIntakeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  waterIntakeButton: {
    width: 100,
    height: 100,
  },
  waterIntakeText: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
  },
  progressBarContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
});