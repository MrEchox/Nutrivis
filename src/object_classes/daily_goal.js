import AsyncStorage from "@react-native-async-storage/async-storage";
import {collection, query, where, getDocs, addDoc} from "firebase/firestore";
import {db} from "../../firebase.config.js";


// This is the class for the food object. This object is used to store the user's daily norm of calories and macronutrients.
// Since this is not TypeScript, we have to manually check the types of the parameters. 
// If the types are not correct, we throw an error.
// This class also contains functions to save the object locally.
// Additional functions can be added as needed.

const prefix = '@Goal:';
var x = 0;

export class daily_goal_object {
        constructor(calories, carbs, fat, protein, stepGoal, email) {
        if (typeof calories !== 'number') {
            throw new Error('Calories must be a number');
        }
        if (typeof carbs !== 'number') {
            throw new Error('Carbs must be a number');
        }
        if (typeof fat !== 'number') {
            throw new Error('Fat must be a number');
        }
        if (typeof protein !== 'number') {
            throw new Error('Protein must be a number');
        }
        if (typeof stepGoal !== 'number') {
            throw new Error('Step goal must be a number');
        }

        this.calories = calories;
        this.carbs = carbs;
        this.fat = fat;
        this.protein = protein;
        this.stepGoal = stepGoal;
        this.email = email;
    }

    async saveLocal() {
        try {
            const jsonValue = JSON.stringify(this);
            var id = prefix + "local" + ":" + this.email;
            await AsyncStorage.setItem(id, jsonValue);
            AsyncStorage.getItem(id).then((res) => console.log("Added goal:\n" + res))
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
                const dailyGoalRef = collection(db, "users", userDocId, "daily_goal");
                addDoc(dailyGoalRef, {
                    calories: this.calories,
                    carbs: this.carbs,
                    fat: this.fat,
                    protein: this.protein,
                    stepGoal: this.stepGoal
                });
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}