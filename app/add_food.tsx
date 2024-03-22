import { StyleSheet, TextInput, Button, ScrollView, SafeAreaView, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, View } from '@/components/Themed';
import { Barcode_Food } from '@/src/object_classes/barcode_food'; 
import { useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

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
            const barcode_food = new Barcode_Food( name, parseFloat(barcode), parseFloat(calories), parseFloat(carbs),
                parseFloat(sugars), parseFloat(fat), parseFloat(protein), parseFloat(sodium), unit);
            // Save the object to local storage
            barcode_food.saveLocal();
            // Save the object to the database
            barcode_food.save();
            router.replace(`./food?calories=${calories}&name=${name}&carbs=${carbs}
            &sugars=${sugars}&fat=${fat}&protein=${protein}
            &sodium=${sodium}&measuring_unit=${unit}`);
        }
    };
    
    return (
        <ScrollView>
            <Text style={styles.title}>Pridėkite naują produktą</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <View style={styles.inputContainer}> 
                <Text style={styles.label}>Barkodas</Text>
                <Text style={styles.label}>{barcode}</Text>
            </View>

            <View style={styles.inputContainer}> 
                <Text style={styles.label}>Pavadinimas:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Įveskite pavadinimą"
                    onChangeText={(text) => setName(text)}
                />
            </View>

            <Text></Text>
            <Text style={styles.label}>Įveskite reikšmes 100g produkto</Text>

            <View style={styles.inputContainer}> 
                <Text style={styles.label}>Kalorijos:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Įveskite kalorijų kiekį"
                    keyboardType="numeric"
                    onChangeText={(text) => setCalories(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Angliavandeniai:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Įveskite angliavandenių kiekį gramais"
                    keyboardType="numeric"
                    onChangeText={(text) => setCarbs(text)}
                />
                <Text style={styles.label}>(iš kurių cukrų):</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Įveskite cukrų kiekį gramais"
                    keyboardType="numeric"
                    onChangeText={(text) => setSugars(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Riebalai:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Įveskite riebalų kiekį gramais"
                    keyboardType="numeric"
                    onChangeText={(text) => setFat(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Baltymai:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Įveskite baltymų kiekį gramais"
                    keyboardType="numeric"
                    onChangeText={(text) => setProtein(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Druska:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Įveskite druskos kiekį gramais"
                    keyboardType="numeric"
                    onChangeText={(text) => setSodium(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Matavimo vienetai</Text>
                <Picker
                    selectedValue={unit}
                    onValueChange={(itemValue) => setUnit(itemValue)}
                    style={styles.input}
                >
                    <Picker.Item label="g" value="g" />
                    <Picker.Item label="ml" value="ml" />
                </Picker>
            </View>

            <Button 
            title="Pridėti naują maisto produktą"
            onPress={handleInput}
            />
        </ScrollView>
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
        alignSelf: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    label: {
        marginRight: 10,
        paddingLeft: 10,
        alignSelf: 'center',
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        alignSelf: 'center',
    },
    input: {
        padding: 10,
    },
});

export default AddFoodScreen;