import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import {Barcode_Food} from '@/src/object_classes/barcode_food'
import { inputCaloriesMacro } from '@/src/util/goal_calculations';
import { Link } from 'expo-router';

var sumCarbs = 0;
var sumFat = 0;
var sumProtein = 0;
var sumCalories = 0;

//---Macro input Tab---
const TabOneScreen = () => {
  var [carbs, setCarbs] = useState('');
  var [fat, setFat] = useState('');
  var [protein, setProtein] = useState('');
  var [calculatedCalories, setCalculatedCalories] = useState(0);

  // Function to Handle Input of macros
  const handleInput = () => {
    const inputDoneCaloriesMacro = inputCaloriesMacro(carbs, fat, protein);
    setCalculatedCalories(inputDoneCaloriesMacro);
    sumCarbs = sumCarbs + parseInt(carbs);
    sumFat = sumFat + parseInt(fat);
    sumProtein = sumProtein + parseInt(protein);
    sumCalories = sumCalories + calculatedCalories;
  };

  return (
    //---Calories---
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!!!</Text>
      <Text style={styles.title}>Index/home tab</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Angliavandeniai:</Text>
        <TextInput
          style={styles.input}
          placeholder="Įveskite suvartotų angliavandenių kiekį gramais"
          keyboardType="numeric"
          onChangeText={(text) => setCarbs(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Riebalai</Text>
        <TextInput
          style={styles.input}
          placeholder="Įveskite suvartotų riebalų kiekį gramais"
          keyboardType="numeric"
          onChangeText={(text) => setFat(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Baltymai</Text>
        <TextInput
          style={styles.input}
          placeholder="Įveskite suvartotų baltymų kiekį gramais"
          keyboardType="numeric"
          onChangeText={(text) => setProtein(text)}
        />
      </View>
      <Button title="Apskaičiuoti suvartotų kalorijų kiekį" onPress={handleInput} />
        <Text>Iš viso angliavandenių: {sumCarbs} g</Text>
        <Text>Iš viso riebalų: {sumFat} g</Text>
        <Text>Iš viso baltymų: {sumProtein} g</Text>
        <Text>Suvartotų kalorijų kiekis: {calculatedCalories + sumCalories} kcal</Text>
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
