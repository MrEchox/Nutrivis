import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { calculateStepGoal } from '@/src/util/goal_calculations';

const TabOneScreen = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [stepGoal, setStepGoal] = useState(0);

  // Function to calculate step goal
  const handleCalculateStepGoal = () => {
    const calculatedStepGoal = calculateStepGoal(age, gender, height, weight, activityLevel);
    setStepGoal(calculatedStepGoal);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Index/home tab</Text>
      <TextInput
        placeholder="Age"
        keyboardType="numeric"
        onChangeText={(text) => setAge(text)}
      />
      <TextInput
        placeholder="Gender"
        onChangeText={(text) => setGender(text.toLowerCase())}
      />
      <TextInput
        placeholder="Height (cm)"
        keyboardType="numeric"
        onChangeText={(text) => setHeight(text)}
      />
      <TextInput
        placeholder="Weight (kg)"
        keyboardType="numeric"
        onChangeText={(text) => setWeight(text)}
      />
      <TextInput
        placeholder="Activity Level"
        onChangeText={(text) => setActivityLevel(text.toLowerCase())}
      />
      <Button title="Calculate" onPress={handleCalculateStepGoal} />
      <Text>Recommended Daily Step Goal: {stepGoal}</Text>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default TabOneScreen;
