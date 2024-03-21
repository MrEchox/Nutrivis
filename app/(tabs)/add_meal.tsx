import { StyleSheet, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { food_object } from '@/src/object_classes/food_object'; 

const AddFoodScreen = () => {
    var [name, setName] = useState('');
    var [calories, setCalories] = useState('');
    var [carbs, setCarbs] = useState('');
    var [sugars, setSugars] = useState('');
    var [fat, setFat] = useState('');
    var [protein, setProtein] = useState('');
    var [salt, setSalt] = useState('');

    // Function to Handle Input of macros
    const handleInput = () => {
        console.log(name, typeof(parseFloat(calories)), carbs, sugars, fat, protein, salt);
        const food_item = new food_object(name, parseFloat(calories), parseFloat(carbs),
            parseFloat(sugars), parseFloat(fat), parseFloat(protein), parseFloat(salt));
        food_item.saveLocal();
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pridėkite naują maisto produktą</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <View style={styles.inputContainer}> 
                <Text style={styles.label}>Pavadinimas:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Įveskite pavadinimą"
                    onChangeText={(text) => setName(text)}
                />
            </View>

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
                    onChangeText={(text) => setSalt(text)}
                />
            </View>

            <Button 
            title="Pridėti naują maisto produktą"
            onPress={handleInput}
            />
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
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
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
});

export default AddFoodScreen;