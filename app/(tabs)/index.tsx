import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { calculateStepGoal } from '@/src/util/goal_calculations';
import {Picker} from '@react-native-picker/picker'

const TabOneScreen = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [stepGoal, setStepGoal] = useState(0);

  // Function to calculate step goal
  const handleCalculateStepGoal = () => {
    const calculatedStepGoal = calculateStepGoal(age, gender, height, weight, activityLevel);
    setStepGoal(calculatedStepGoal);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Index/home tab</Text>
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
          selectedValue={activityLevel}
          placeholder="Pasirinkite lytį"
          onValueChange={(itemValue) => setGender(itemValue)}
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
      <Button title="Apskaičiuoti" onPress={handleCalculateStepGoal} />
      <Text>Rekomenduojamas žingsnių skaičius per dieną: {stepGoal}</Text>
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
