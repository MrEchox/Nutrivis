import { StyleSheet, TextInput, Button, ScrollView, SafeAreaView, BackHandler, Alert, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import { User } from '@/src/object_classes/user';
import { useState } from 'react';
//var bcrypt = require('bcryptjs');
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config.js";
import { router } from 'expo-router';
import { commonStyles } from '../../components/commonStyles';


const TabTwoScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');


    async function handleRegister() {
        if (password !== repeatPassword) {
            Alert.alert(
                "Klaida",
                "Slaptažodžiai nesutampa",
                [ { text: 'OK', onPress: () => console.log('OK Pressed') } ],
                );
            return;
        }

        // Get user from database
        const collectionRef = collection(db, "users");
        const q = query(collectionRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
            Alert.alert(
                "Klaida",
                "Toks el. paštas jau užregistruotas",
                [ { text: 'OK', onPress: () => console.log('OK Pressed') } ],
                );
            return;
        }

        // Hash the password
        /*
        const saltRounds = 7;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        */

        const user = new User( email, username, password, "0"); // Make a user object (..., hash (password), salt)
        user.saveLocal(); // Save the object to local storage
        user.save(); // Save the object to the database

        Alert.alert(
            "Valio!",
            "Sėkmingai užsiregistravote!",
            [ { text: 'OK', onPress: () => {
                    console.log('OK Pressed')
                    router.replace('../session/login')}} ],
            );
    }
    
    const colorScheme = useColorScheme();
    const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
    const themeContainer = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;
    const themeSvg = colorScheme === 'light' ? '#ffffff' : '#003049';

    return (
        <View style={[styles.container, themeBackground]}>
            <View style={[commonStyles.mainStatsContainer, themeContainer]}>
            <Text style={[styles.title, themeTextStyle]}>Registracija</Text>
                <Text> </Text>
                    <Text style={[styles.label, themeTextStyle]}>El. paštas:</Text>
                    <TextInput
                        style={[styles.input, themeTextStyle]}
                        placeholder="Įveskite el. pašto adresą"
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Text> </Text>
                    <Text style={[styles.label, themeTextStyle]}>Vardas:</Text>
                    <TextInput
                        style={[styles.input, themeTextStyle]}
                        placeholder="Kaip jus vadinti"
                        onChangeText={(text) => setUsername(text)}
                    />
                    <Text> </Text>
                    <Text style={[styles.label, themeTextStyle]}>Slaptažodis:</Text>
                    <TextInput
                        style={[styles.input, themeTextStyle]}
                        placeholder="Sugalvokite prisijungimo slaptažodį"
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Text> </Text>
                    <Text style={[styles.label, themeTextStyle]}>Pakartokite slaptažodį:</Text>
                    <TextInput
                        style={[styles.input, themeTextStyle]}
                        placeholder="Pakartokite prisijungimo slaptažodį"
                        onChangeText={(text) => setRepeatPassword(text)}
                    />
                    <Text> </Text>
                <View style={styles.buttonContainer}>
                <Button color={themeSvg}
                    title="Registruotis"
                    onPress={handleRegister}
                />
                </View>
                <Text> </Text>
                <Text style={themeTextStyle}>Esate prisiregistravę?</Text>
                <View style={styles.buttonContainer}>
                <Button color={themeSvg}
                    title="Prisijungti"
                    onPress={() => router.replace('../session/login')}
                />
                </View>
            </View>
        </View>
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
        alignSelf: 'center',
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    buttonContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '',
    },
});

export default TabTwoScreen;
