import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { calculateStepGoal } from '@/src/util/goal_calculations';
import { calculateRecommendedCalories } from '@/src/util/goal_calculations';
import {Picker} from '@react-native-picker/picker'
import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../firebase.config.js/index.js";
import { Link } from 'expo-router';

const BarcodeInputScreen = () => {

const [foundBarcode, setFoundBarcode] = useState('');
const [barcode, setBarcode] = useState(0);

//Checks if barcode exists in the database
const SearchBarcode = async (barcode: number) => {
  const collectionRef = collection(db, "barcode_food_verified");

  const q = query(collectionRef, where("barcode", "==", barcode));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    setFoundBarcode("Rastas barkodas");
  } 
  else {
    setFoundBarcode("Barkodas nerastas");
  };
}

return (

    //---Calories---
    <View style={styles.container}>
      <Text style={styles.title}>Įveskite barkodą</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Barkodas"
          keyboardType="numeric"
          onChangeText={(text) => setBarcode(parseInt(text))}
        />
      </View>
      <Button title="Ieškoti" onPress={() => {SearchBarcode(barcode)}} />
      {/*This is a placeholder so that when the selection screen appears it doesn't get moved by flex. more styles for this reason as well*/}
      {(foundBarcode != "Barkodas nerastas") &&
      <View style = {styles.sometimesContainer}>
        <Text style = {styles.text}></Text>
        <View style = {styles.buttonView}>
          <View style = {styles.buttonPlaceholder}>
          </View>
        </View>
      </View>}
      {foundBarcode == "Barkodas nerastas" && 
      <View style = {styles.sometimesContainer}>
        <Text style = {styles.text}>Tokio barkodo neradome. Ar norėtumėte jį įvesti?</Text>
        <View style = {styles.buttonView}>
          <Link href={{pathname: "./add_food", params: {barcode: barcode}}} style={[styles.button, {backgroundColor: 'rgba(0,260,0,1)',}]}>
            <Pressable>
              <Text>Taip</Text>
            </Pressable>
          </Link>
          <Link href="./food" style={[styles.button, {backgroundColor: 'rgba(260,0,0,1)',}]}>
            <Pressable>
              <Text>Ne</Text>
            </Pressable>
          </Link>
        </View>
      </View>}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonPlaceholder: {
    padding: 17,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  sometimesContainer: {
    alignItems: 'center',
  },
  text: {
    height: 40,
  },
});

export default BarcodeInputScreen;
