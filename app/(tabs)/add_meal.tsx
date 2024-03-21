import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { food_object_manual } from '@/src/object_classes/food_object';

const TabTwoScreen = () => {
    const [barcode, setBarcode] = useState('');
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [carbs, setCarbs] = useState('');
    const [sugar, setSugar] = useState('');
    const [fat, setFat] = useState('');
    const [protein, setProtein] = useState('');
    const [salt, setSalt] = useState('');

    const handleAddData = async () => {
        const food = new food_object_manual(name, parseInt(barcode), parseInt(calories), 
        parseInt(carbs), parseInt(sugar), parseInt(fat), parseInt(protein), parseInt(salt));
        food.save();
        <Text>Produktas sėkmingai/nesėkmingai įdėtas į duombazę</Text>
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Barkodas:</Text>
                <TextInput
                style={styles.input}
                placeholder="Įveskite produkto barkodą"
                keyboardType="numeric"
                onChangeText={(text) => setBarcode(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Pavadinimas:</Text>
                <TextInput
                style={styles.input}
                placeholder="Įveskite produkto pavadinimą"
                onChangeText={(text) => setName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Energetinė vertė:</Text>
                <TextInput
                style={styles.input}
                placeholder="Įveskite 100g produkto energetine vertę (kcal)"
                keyboardType="numeric"
                onChangeText={(text) => setCalories(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Angliavandeniai:</Text>
                <TextInput
                style={styles.input}
                placeholder="Įveskite 100g produkto angliavandenių kiekį gramais"
                keyboardType="numeric"
                onChangeText={(text) => setCarbs(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Cukrai:</Text>
                <TextInput
                style={styles.input}
                placeholder="Įveskite 100g produkto cukrų kiekį gramais"
                keyboardType="numeric"
                onChangeText={(text) => setSugar(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Riebalai:</Text>
                <TextInput
                style={styles.input}
                placeholder="Įveskite 100g produkto riebalų kiekį gramais"
                keyboardType="numeric"
                onChangeText={(text) => setFat(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Baltymai:</Text>
                <TextInput
                style={styles.input}
                placeholder="Įveskite 100g produkto baltymų kiekį gramais"
                keyboardType="numeric"
                onChangeText={(text) => setProtein(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Druska:</Text>
                <TextInput
                style={styles.input}
                placeholder="Įveskite 100g produkto druskos kiekį gramais"
                keyboardType="numeric"
                onChangeText={(text) => setSalt(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Button title="Įdėti į duombaze" onPress={handleAddData} />
            </View>
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

export default TabTwoScreen;