import { StyleSheet, TextInput, Button, ScrollView, SafeAreaView, BackHandler, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { User } from '@/src/object_classes/user';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config.js";


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
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
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
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                );
            return;
        }

        const q2 = query(collectionRef, where("username", "==", username));
        const querySnapshot2 = await getDocs(q2);
        if (querySnapshot2.size > 0) {
            Alert.alert(
                "Klaida",
                "Toks slapyvardis jau užimtas",
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                );
            return;
        }

        // Hash the password
        const saltRounds = 7;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        // Make a user object
        const user = new User( email, username, hash, salt);

        // Save the object to local storage
        user.saveLocal();
        // Save the object to the database
        user.save();
    }

    return (
        <View style={styles.container}>
                <Text style={styles.title}>Registruotis</Text>
                <Text> </Text>
                <View style={styles.inputContainer}> 
                    <Text style={styles.label}>El. paštas:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Įveskite prisijungimo el. paštą"
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.inputContainer}> 
                    <Text style={styles.label}>Slapyvardis:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Kaip jus vadinti"
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>
                <View style={styles.inputContainer}> 
                    <Text style={styles.label}>Slaptažodis:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Sugalvokite prisijungimo slaptažodį"
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View style={styles.inputContainer}> 
                    <Text style={styles.label}>Pakartokite slaptažodį:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Pakartokite prisijungimo slaptažodį"
                        onChangeText={(text) => setRepeatPassword(text)}
                    />
                </View>
                <Button 
                    title="Registruotis"
                    onPress={handleRegister}
                />
                <Text> </Text>
                <Text>Ęsate prisiregistravę?</Text>
                <Button 
                    title="Prisijungti"
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

export default TabTwoScreen;
