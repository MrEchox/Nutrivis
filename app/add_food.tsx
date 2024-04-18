import { StyleSheet, TextInput, Button, ScrollView, SafeAreaView, BackHandler, useColorScheme } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, View } from '@/components/Themed';
import { Barcode_Food } from '@/src/object_classes/food_object_barcode'; 
import { useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { commonStyles } from '../components/commonStyles';

/*
This page is used for adding food with barcode
To both local storage and database
It can theoretically be used for inputting other types of food
to database, such as bananas, apples, etc. with some adjustments
but that is a problem for the future,
right now, only barcode foods
*/

const AddFoodScreen = () => {
    var { barcode } = useLocalSearchParams<{barcode: string}>(); // Get barcode from the url args
    var [name, setName] = useState('');
    var [calories, setCalories] = useState('');
    var [carbs, setCarbs] = useState('');
    var [sugars, setSugars] = useState('');
    var [fat, setFat] = useState('');
    var [protein, setProtein] = useState('');
    var [sodium, setSodium] = useState('');
    var [unit, setUnit] = useState('g');

    React.useEffect(() => {
        const backAction = () => {
            router.replace('./scanner');
          return true; // Return true to prevent default back button behavior
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        
        return () => backHandler.remove();
    }, []);

    // Function to Handle Input into the database
    const handleInput = () => {
        if (carbs >= sugars) {
            // Make a barcode food object
            const food_object_barcode = new Barcode_Food( name, parseFloat(barcode), parseFloat(calories), parseFloat(carbs),
                parseFloat(sugars), parseFloat(fat), parseFloat(protein), parseFloat(sodium), unit);
            // Save the object to local storage
            food_object_barcode.saveLocal();
            // Save the object to the database
            food_object_barcode.save();
            router.replace(`./food?calories=${calories}&name=${name}&carbs=${carbs}
            &sugars=${sugars}&fat=${fat}&protein=${protein}
            &sodium=${sodium}&measuring_unit=${unit}`);
        }
    };

    const colorScheme = useColorScheme(); // Added for color scheme
    const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground; // Added for color scheme
    const themeContainer = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer; // Added for color scheme
    const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText; // Added for color scheme
    const themeSvg = colorScheme === 'light' ? '#ffffff' : '#003049';

    return (
        <ScrollView style={themeBackground}>
         <View style={[styles.container, themeBackground, {paddingBottom: 20}]}>
            <Text style={[styles.title, themeTextStyle]}>Pridėkite naują produktą</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <View style={[commonStyles.mainStatsContainer, themeContainer]}> 
                <Text style={[styles.label, themeTextStyle]}>Barkodas</Text>
                <Text style={[styles.label, themeTextStyle]}>{barcode}</Text>
            </View>

            <View style={[commonStyles.mainStatsContainer, themeContainer]}> 
                <Text style={[styles.label, themeTextStyle]}>Pavadinimas:</Text>
                <TextInput
                    style={[styles.input, themeTextStyle]}
                    placeholder="Įveskite pavadinimą"
                    onChangeText={(text) => setName(text)}
                />
            </View>

            <Text></Text>
            <Text style={[styles.label, themeTextStyle]}>Įveskite reikšmes 100g produkto</Text>

            <View style={[commonStyles.mainStatsContainer, themeContainer]}> 
                <Text style={[styles.label, themeTextStyle]}>Kalorijos:</Text>
                <TextInput
                    style={[styles.input, themeTextStyle]}
                    placeholder="Įveskite kalorijų kiekį"
                    keyboardType="numeric"
                    onChangeText={(text) => setCalories(text)}
                />
            </View>

            <View style={[commonStyles.mainStatsContainer, themeContainer]}> 
                <Text style={[styles.label, themeTextStyle]}>Angliavandeniai:</Text>
                <TextInput
                    style={[styles.input, themeTextStyle]}
                    placeholder="Įveskite angliavandenių kiekį gramais"
                    keyboardType="numeric"
                    onChangeText={(text) => setCarbs(text)}
                />
                <Text style={[styles.label, themeTextStyle]}>(iš kurių cukrų):</Text>
                <TextInput
                    style={[styles.input, themeTextStyle]}
                    placeholder="Įveskite cukrų kiekį gramais"
                    keyboardType="numeric"
                    onChangeText={(text) => setSugars(text)}
                />
            </View>

            <View style={[commonStyles.mainStatsContainer, themeContainer]}> 
                <Text style={[styles.label, themeTextStyle]}>Riebalai:</Text>
                <TextInput
                    style={[styles.input, themeTextStyle]}
                    placeholder="Įveskite riebalų kiekį gramais"
                    keyboardType="numeric"
                    onChangeText={(text) => setFat(text)}
                />
            </View>

            <View style={[commonStyles.mainStatsContainer, themeContainer]}> 
                <Text style={[styles.label, themeTextStyle]}>Baltymai:</Text>
                <TextInput
                    style={[styles.input, themeTextStyle]}
                    placeholder="Įveskite baltymų kiekį gramais"
                    keyboardType="numeric"
                    onChangeText={(text) => setProtein(text)}
                />
            </View>

            <View style={[commonStyles.mainStatsContainer, themeContainer]}> 
                <Text style={[styles.label, themeTextStyle]}>Druska:</Text>
                <TextInput
                    style={[styles.input, themeTextStyle]}
                    placeholder="Įveskite druskos kiekį gramais"
                    keyboardType="numeric"
                    onChangeText={(text) => setSodium(text)}
                />
            </View>

            <View style={[commonStyles.mainStatsContainer, themeContainer]}> 
                <Text style={[styles.label, themeTextStyle]}>Matavimo vienetai</Text>
                <Picker
                    selectedValue={unit}
                    onValueChange={(itemValue) => setUnit(itemValue)}
                    style={[styles.input, themeTextStyle, { backgroundColor: 'transparent' }]}
                >
                    <Picker.Item label="g" value="g" />
                    <Picker.Item label="ml" value="ml" />
                </Picker>
            </View>

            <View style={[styles.buttonContainer, {backgroundColor: "transparent"}]}>
                    <Button 
                    color = {themeSvg}
                    title="Pridėti naują maisto produktą"
                    onPress={handleInput}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30,
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
    label: {
        marginRight: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        fontWeight: "500",
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
        borderWidth: 1,
        borderRadius: 10,
      },
      buttonContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
      },
});

export default AddFoodScreen;
