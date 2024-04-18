import AsyncStorage from "@react-native-async-storage/async-storage";
import {collection, query, where, getDocs, addDoc} from "firebase/firestore";
import {db} from "../../firebase.config.js";

// This is the class for the food object. This object is used to store the user's daily norm of calories and macronutrients.
// Since this is not TypeScript, we have to manually check the types of the parameters. 
// If the types are not correct, we throw an error.
// This class also contains functions to save the object locally.
// Additional functions can be added as needed.

const prefix = '@Water:';
var x = 0;

export class daily_water_object {
        constructor(date, water, email) {
        if (typeof date !== 'string') {
            throw new Error('Date must be a string');
        }
        if (typeof water !== 'number') {
            throw new Error('Water must be a number');
        }
        this.date = date;
        this.water = water;
        this.email = email;
    }

    async saveLocal() {
        try {
            const jsonValue = JSON.stringify(this);
            var id = prefix + this.date + ":" + this.email;
            await AsyncStorage.setItem(id, jsonValue);
            AsyncStorage.getItem(id).then((res) => console.log("Added water:\n" + res))
        }
        catch (e) {
            console.log(e);
        }
    }

    async save(email) {
        try {
            const collectionRef = collection(db, "users");
            const q = query(collectionRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
                const userDocId = doc.id;
                const dailyWaterCollectionRef = collection(db, "users", userDocId, "daily_water");
                addDoc(dailyWaterCollectionRef, {
                    date: this.date,
                    water: this.water
                });
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}