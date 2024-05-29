import { StyleSheet, TextInput, Button, ScrollView, useColorScheme, Alert} from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { food_object } from '@/src/object_classes/food_object';
import { commonStyles } from '../../components/commonStyles';

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
        const food_item = new food_object(name, parseFloat(calories), parseFloat(carbs),
            parseFloat(sugars), parseFloat(fat), parseFloat(protein), parseFloat(salt));
        food_item.saveLocal();
        Alert.alert('Valio!', 'Maisto produktas pridėtas sėkmingai!', [
            { text: 'OK', onPress: () => router.replace('./food')}
        ]);
    };

    const colorScheme = useColorScheme();
    const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
    const themeContainer = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? [commonStyles.lightThemeText, { fontFamily: 'Helvetica', fontWeight: 'bold' }] : [commonStyles.darkThemeText, { fontFamily: 'Helvetica', fontWeight: 'bold' }];
    const themeSvg = colorScheme === 'light' ? '#ffffff' : '#003049';
    
    return (
        <ScrollView style={themeBackground}>
        <View style={[styles.container, themeBackground, {paddingBottom: 20}]}>
                <View style={[commonStyles.mainStatsContainer, themeContainer]}> 
                    <Text style={[styles.label, themeTextStyle]}>Pavadinimas:</Text>
                    <TextInput
                        style={[styles.input, themeTextStyle]}
                        placeholder="Įveskite pavadinimą"
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <Text style={[styles.input, themeTextStyle, {borderWidth: 0, marginTop: -10}]}>Įveskite reikšmes 100g produkto</Text>

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
                        onChangeText={(text) => setSalt(text)}
                    />
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
