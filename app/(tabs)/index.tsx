import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { calculateStepGoal } from '@/src/util/goal_calculations';
import { calculateRecommendedCalories } from '@/src/util/goal_calculations';
import {Picker} from '@react-native-picker/picker'
import {Barcode_Food} from '@/src/object_classes/barcode_food'

const TabOneScreen = () => {

return (

    //---Calories---
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!!!</Text>
      <Text style={styles.title}>Index/home tab</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    marginRight: 10,
    paddingLeft: 10,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  input: {
    padding: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default TabOneScreen;
