import React from 'react';
import { StyleSheet, View, Pressable, Image, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.mainStatsContainer}>
      <View style={styles.statsItem}>
            <Text style={styles.statsLabelText}>Kalorijos</Text>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={0.75} color='#003049' style={styles.progressBar} />
            </View>
            <Text style={styles.statsCounter}>1500/2000</Text>
            <Text>{'\n'}</Text>
          </View>
        <View style={styles.column}>
          <View style={styles.statsItem}>
            <Text style={styles.statsLabelText}>Baltymai</Text>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={0.4} color='#003049' style={styles.progressBar} />
            </View>
            <Text style={styles.statsCounter}>8/20 g</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsLabelText}>Angliavandeniai</Text>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={0.2} color='#003049' style={styles.progressBar} />
            </View>
            <Text style={styles.statsCounter}>2/10 g</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsLabelText}>Riebalai</Text>
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={0.7} color='#003049' style={styles.progressBar} />
            </View>
            <Text style={styles.statsCounter}>15/20 g</Text>
          </View>
        </View>
      </View>

      <View style={styles.mainStatsContainer}>
        <View style={styles.column}>
          <Text style={styles.statsLabelText}>Pr</Text>
          <Text style={styles.statsLabelText}>An</Text>
          <Text style={styles.statsLabelText}>Tr</Text>
          <Text style={styles.statsLabelText}>Kt</Text>
          <Text style={styles.statsLabelText}>Pe</Text>
          <Text style={styles.statsLabelText}>Še</Text>
          <Text style={styles.statsLabelText}>Sk</Text>
        </View>
      </View>

        <View style={[styles.mainStatsContainer, { alignItems: 'center'}]}>
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
        <View style={styles.mainStatsContainer}>
          <Text style={styles.statsLabelText}>Quick Meal 1</Text>
          <Image source={require('../../assets/images/water-glass.png')} style={styles.waterImage}></Image>
        </View>
        <View style={styles.mainStatsContainer}>
          <Text style={styles.statsLabelText}>Quick Meal 2</Text>
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
    backgroundColor: '#003049',
  },
  mainStatsContainer: {
    backgroundColor: '#12BA69',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10, 
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
  statsLabelText: {
    fontSize: 18,
    marginBottom: 5,
    color: "#ffffff",
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