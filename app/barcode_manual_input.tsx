import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, useColorScheme, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.config.js";
import { Link } from 'expo-router';
import { commonStyles } from '@/components/commonStyles';

const BarcodeInputScreen = () => {
  const [foundBarcode, setFoundBarcode] = useState('');
  const [barcode, setBarcode] = useState(0);

  // Checks if barcode exists in the database
  const SearchBarcode = async (barcode) => {
    const collectionRef = collection(db, "barcode_food_verified");
    const q = query(collectionRef, where("barcode", "==", barcode));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      setFoundBarcode("Rastas barkodas");
    } else {
      setFoundBarcode("Barkodas nerastas");
    }
  };

  const colorScheme = useColorScheme();
  const themeBackground = colorScheme === "light" ? commonStyles.lightBackground : commonStyles.darkBackground;
  const themeContainer = colorScheme === "light" ? commonStyles.lightContainer : commonStyles.darkContainer;
  const themeTextStyle = colorScheme === "light" ? [commonStyles.lightThemeText, { fontFamily: "Helvetica", fontWeight: "bold" }] : [commonStyles.darkThemeText, { fontFamily: "Helvetica", fontWeight: "bold" }];
  const themeSvg = colorScheme === "light" ? "#ffffff" : "#003049";

  return (
    <View style={[styles.container, themeBackground]}>
      <View style={[themeContainer, commonStyles.mainStatsContainer]}>
        <Text style={styles.title}>Įveskite barkodą</Text>
        <View style={{ backgroundColor: 'transparent' }}>
          <TextInput
            style={styles.input}
            placeholder="Barkodas"
            keyboardType="numeric"
            onChangeText={(text) => setBarcode(parseInt(text))}
          />
        </View>
        <View style={[styles.buttonContainer, { marginTop: 10 }]}>
          <Button title="Ieškoti" color={themeSvg} onPress={() => SearchBarcode(barcode)} />
        </View>
        {foundBarcode !== "Barkodas nerastas" && (
          <View style={[styles.sometimesContainer, { backgroundColor: 'transparent' }]}>
            <Text style={styles.text}></Text>
            <View style={styles.buttonContainer}></View>
          </View>
        )}
        {foundBarcode === "Barkodas nerastas" && (
          <View style={[styles.sometimesContainer, { backgroundColor: 'transparent' }]}>
            <Text style={themeTextStyle}>Tokio barkodo neradome. Ar norėtumėte jį įvesti?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
              <View style={[styles.buttonContainer, {backgroundColor: themeSvg}]}>
                <Link href={{ pathname: "./add_food", params: { barcode: barcode } }} style={[styles.linkButton]}>
                  <Text style={themeTextStyle}>Taip</Text>
                  
                </Link>
              </View>
              <View style={[styles.buttonContainer, {backgroundColor: themeSvg, marginLeft: 20}]}>
                <Link href="./food" style={styles.linkButton}>
                  <Text style={themeTextStyle}>Ne</Text>
                </Link>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    marginRight: -20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  sometimesContainer: {
    alignItems: 'center',
  },
  text: {
    height: 40,
  },
  linkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
  },
  linkButtonText: {
    color: '#ffffff',
  },
});

export default BarcodeInputScreen;
