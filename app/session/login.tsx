import { StyleSheet, TextInput, Button, ScrollView, SafeAreaView, BackHandler } from 'react-native';
import { Text, View } from '@/components/Themed';
import { User } from '@/src/object_classes/user';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { collection, query, where, getDocs, connectFirestoreEmulator } from "firebase/firestore";
import { db } from "../../firebase.config.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';

const TabTwoScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function changeLoginStatus(username: string) {
        const keys = await AsyncStorage.getAllKeys();
        const loginKey = keys.filter(key => key.startsWith("@LoggedIn:"));

        console.log(loginKey);

        if (loginKey.length > 0) {
            const loginVal = await AsyncStorage.getItem("@LoggedIn:");
            if (loginVal) {
                const status = JSON.parse(loginVal);

                status.username = username;

                await AsyncStorage.setItem("@LoggedIn:", JSON.stringify(status));

                console.log(status);

                router.replace('../');
            }
        }
        else {
            await AsyncStorage.setItem("@LoggedIn:", JSON.stringify({ username: username}));

            console.log({ username: username });
            router.replace('../');
        }
    }

    async function handleLogin() {
        // Get user from database
        const collectionRef = collection(db, "users");

        const q = query(collectionRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        console.log(querySnapshot.size);
        console.log(bcrypt.compareSync(password, querySnapshot.docs[0].data().password));

        if (querySnapshot.size > 0) {
            // Check if password is correct
            if (bcrypt.compareSync(password, querySnapshot.docs[0].data().password)) {

                const keys = await AsyncStorage.getAllKeys();
                const userKey = keys.filter(key => key.startsWith("@User:" + email));

                console.log(userKey);
                console.log(keys);

                if (userKey.length > 0) {
                    const userVal = await AsyncStorage.getItem(userKey[0]);
                    if (userVal) {
                        const user = JSON.parse(userVal);
                        console.log(user);
                        changeLoginStatus(user.username);
                        console.log(user);
                    }
                }

                else {
                    var LogInUser = new User(querySnapshot.docs[0].data().email, querySnapshot.docs[0].data().username, querySnapshot.docs[0].data().password, querySnapshot.docs[0].data().salt);
                    console.log(LogInUser);
                    changeLoginStatus(LogInUser.username);
                    LogInUser.saveLocal();
                }
            }
        }
    }

    return (
        <View style={styles.container}>
                <Text style={styles.title}>Prisijungimas</Text>
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
                    <Text style={styles.label}>Slaptažodis:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Įveskite prisijungimo slaptažodį"
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <Button 
                    title="Prisijungti"
                    onPress={handleLogin}
                />
                <Text> </Text>
                <Button 
                    title="Prisijungti su Google"
                />
                <Text> </Text>
                <Text>Jungiates pirmą kartą?</Text>
                <Button 
                    title="Registruotis"
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