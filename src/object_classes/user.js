import {collection, addDoc} from "firebase/firestore";
import {db} from "../../firebase.config.js";
import AsyncStorage from "@react-native-async-storage/async-storage";


// This is the class for the user object. This object is used to store the nutritional information of a user.
// Since this is not TypeScript, we have to manually check the types of the parameters. 
// If the types are not correct, we throw an error.
// This class also contains functions to save the object to the database.
// Additional functions can be added as needed.

const prefix = '@User:';

const isEmail = (input) => {
    // Regular expression to match email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(input);
  };

export class User {
        constructor(email, username, password, salt) {
        if (isEmail(email) === false){
            throw new Error('Email must be a email type');
        }
        if (typeof username !== 'string') {
            throw new Error('Username must be a string');
        }
        if (typeof password !== 'string') {
            throw new Error('Password must be a string');
        }
        if (typeof salt !== 'string') {
            throw new Error('Salt must be a string');
        }

        this.email = email;
        this.username = username;
        this.password = password;
        this.salt = salt;
    }

    // This function saves the object to the database.
    async save() {
        try 
        {
            const docRef = await addDoc(collection(db, "users"), 
            {
                email: this.email,
                username: this.username,
                password: this.password,
                salt: this.salt
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async saveLocal() {
        try {
            const { email, username, loggedIn} = this;

            const jsonValue = JSON.stringify({ email, username, loggedIn });
            var id = prefix + this.email;
            await AsyncStorage.setItem(id, jsonValue);
            AsyncStorage.getItem(id).then((res) => console.log("Added user:\n" + res))
        }
        catch (e) {
            console.log(e);
        }
    }

    async PullFromDatabase(email) {
        const docRef = await getDoc(doc(db, "users", email));
        if (docRef.exists()) {
            console.log("Document data:", docRef.data());
            return docRef.data();
        } else {
            console.log("No such document!");
        }
    }
}