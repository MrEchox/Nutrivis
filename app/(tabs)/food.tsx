import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { food_object_manual } from '@/src/object_classes/food_object';

const TabTwoScreen = () => {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [sugar, setSugar] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');
  const [salt, setSalt] = useState('');

  const handleCalculate = async () => {
    
    setCalories();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>'Food' tab</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

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

export default TabTwoScreen;