import { StatusBar } from 'expo-status-bar';
import { Modal, Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import React, { useState } from 'react';
import { TextInput, Button, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { calculateRecommendedCalories } from '@/src/util/goal_calculations';
import { Barcode_Food } from '@/src/object_classes/barcode_food';

//---Step Tab---
// const TabOneScreen = () => {
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('male');
//   const [height, setHeight] = useState('');
//   const [weight, setWeight] = useState('');
//   const [activityLevel, setActivityLevel] = useState('sedentary');
//   const [stepGoal, setStepGoal] = useState(0);


//   // Function to calculate step goal
//   const handleCalculateStepGoal = () => {
//     const calculatedStepGoal = calculateStepGoal(age, gender, height, weight, activityLevel);
//     setStepGoal(calculatedStepGoal);
//   };

//---Calorie Tab---
const ModalScreen = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [weightObjective, setWeightObjective] = useState(0);

  // Function to calculate recomended calories
  const handleCalculateRecommendedCalories = () => {
    const calculatedRecommendedCalories = calculateRecommendedCalories(age, gender, height, weight, activityLevel, weightObjective);
    setCalorieGoal(calculatedRecommendedCalories);
  };

  // Testing function to add data to the database
  // To check what each part of data is, check src/object_classes/barcode_food.ts
  const handleAddData = async () => {
    const food = new Barcode_Food("Testuojama", 1234512, 100, 100.101, 100, 100, 100, 100, "g");
    food.save();
  }

  return (
    //---Steps---
    // <View style={styles.container}>
    //   <Text style={styles.title}>Index/home tab</Text>
    //   <View style={styles.inputContainer}>
    //     <Text style={styles.label}>Amžius:</Text>
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Įveskite savo amžių"
    //       keyboardType="numeric"
    //       onChangeText={(text) => setAge(text)}
    //     />
    //   </View>
    //   <View style={styles.inputContainer}>
    //     <Text style={styles.label}>Lytis</Text>
    //     <Picker
    //       selectedValue={gender}
    //       placeholder="Pasirinkite lytį"
    //       onValueChange={(itemValue) => setGender(itemValue)}
    //       style={styles.input}
    //     >
    //       <Picker.Item label="Vyras" value="male" />
    //       <Picker.Item label="Moteris" value="female" />
    //     </Picker>
    //   </View>
    //   <View style={styles.inputContainer}>
    //     <Text style={styles.label}>Ūgis</Text>
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Įveskite savo ūgį (cm)"
    //       keyboardType="numeric"
    //       onChangeText={(text) => setHeight(text)}
    //     />
    //   </View>
    //   <View style={styles.inputContainer}>
    //     <Text style={styles.label}>Svoris</Text>
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Įveskite savo svorį (kg)"
    //       keyboardType="numeric"
    //       onChangeText={(text) => setWeight(text)}
    //     />
    //   </View>
    //   <View style={styles.inputContainer}>
    //     <Text style={styles.label}>Fizinio aktyvumo lygis</Text>
    //     <Picker
    //       selectedValue={activityLevel}
    //       onValueChange={(itemValue) => setActivityLevel(itemValue)}
    //       style={styles.input}
    //     >
    //       <Picker.Item label="Neaktyvus" value="sedentary" />
    //       <Picker.Item label="Mažas" value="lightly active" />
    //       <Picker.Item label="Vidutinis" value="moderately active" />
    //       <Picker.Item label="Didelis" value="very active" />
    //       <Picker.Item label="Labai didelis" value="extra active" />
    //     </Picker>
    //   </View>
    //   <Button title="Apskaičiuoti" onPress={handleCalculateStepGoal} />
    //   <Text>Rekomenduojamas žingsnių skaičius per dieną: {stepGoal}</Text>
    //   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    // </View>

    //---Calories---
    <ScrollView>
      <Text style={styles.title}>Settings tab</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amžius:</Text>
        <TextInput
          style={styles.input}
          placeholder="Įveskite savo amžių"
          keyboardType="numeric"
          onChangeText={(text) => setAge(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Lytis</Text>
        <Picker
          selectedValue={gender}
          placeholder="Pasirinkite lytį"
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Vyras" value="male" />
          <Picker.Item label="Moteris" value="female" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ūgis</Text>
        <TextInput
          style={styles.input}
          placeholder="Įveskite savo ūgį (cm)"
          keyboardType="numeric"
          onChangeText={(text) => setHeight(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Svoris</Text>
        <TextInput
          style={styles.input}
          placeholder="Įveskite savo svorį (kg)"
          keyboardType="numeric"
          onChangeText={(text) => setWeight(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Fizinio aktyvumo lygis</Text>
        <Picker
          selectedValue={activityLevel}
          onValueChange={(itemValue) => setActivityLevel(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Neaktyvus" value="sedentary" />
          <Picker.Item label="Mažas" value="lightly active" />
          <Picker.Item label="Vidutinis" value="moderately active" />
          <Picker.Item label="Didelis" value="very active" />
          <Picker.Item label="Labai didelis" value="extra active" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Jūsų tikslas</Text>
        <Picker
          selectedValue={weightObjective}
          onValueChange={(itemValue) => setWeightObjective(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Ekstremalus svorio metimas" value="extreme loss" />
          <Picker.Item label="Svorio metimas" value="loss" />
          <Picker.Item label="Svorio palaikymas" value="maintain" />
          <Picker.Item label="Svorio priaugimas" value="gain" />
          <Picker.Item label="Ekstremalus svorio priaugimas" value="extreme gain" />
        </Picker>
      </View>
      {/* This is button is temporary to check if database input works */}
      <Button title="Testuojama Duombaze" onPress={handleAddData} />
      <Button title="Apskaičiuoti" onPress={handleCalculateRecommendedCalories} />
      <Text>Rekomenduojamas kalorijų kiekis per dieną svoriui palaikyti: {calorieGoal}</Text>
      {/*1g of Carbs = 4cal 50% of all calories*/}
      <Text>Rekomenduojamas angliavandenių kiekis gramais: {Math.round(calorieGoal * 0.5 / 4)}</Text>
      {/*1g of Fat = 9cal 20% of all calories*/}
      <Text>Rekomenduojamas riebalų kiekis gramais: {Math.round(calorieGoal * 0.2 / 9)}</Text>
      {/*1g of Protein = 4cal 30% of all calories*/}
      <Text>Rekomenduojamas baltymų kiekis gramais: {Math.round(calorieGoal * 0.3 / 4)}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </ScrollView>
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

export default ModalScreen;