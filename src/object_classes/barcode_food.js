import {collection, addDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig.js";
import AsyncStorage from "@react-native-async-storage/async-storage";


// This is the class for the Barcode_Food object. This object is used to store the nutritional information of a food item.
// Since this is not TypeScript, we have to manually check the types of the parameters. 
// If the types are not correct, we throw an error.
// This class also contains functions to save the object to the database.
// Additional functions can be added as needed.
export class Barcode_Food {
        constructor(name, barcode, calories, carbs, sugars, fat, protein, sodium, measuring_unit) {
        if (typeof name !== 'string') {
            throw new Error('Name must be a string');
        }
        if (typeof barcode !== 'number') {
            throw new Error('Barcode must be a number');
        }
        if (typeof calories !== 'number') {
            throw new Error('Calories must be a number');
        }
        if (typeof carbs !== 'number') {
            throw new Error('Carbs must be a number');
        }
        if (typeof sugars !== 'number') {
            throw new Error('Sugars must be a number');
        }
        if (typeof fat !== 'number') {
            throw new Error('Fat must be a number');
        }
        if (typeof protein !== 'number') {
            throw new Error('Protein must be a number');
        }
        if (typeof sodium !== 'number') {
            throw new Error('Sodium must be a number');
        }
        if (typeof measuring_unit !== 'string') {
            throw new Error('Measuring unit must be a string');
        }

        this.barcode = barcode;
        this.name = name;
        this.carbs = carbs;
        this.sugars = sugars;
        this.protein = protein;
        this.fat = fat;
        this.calories = calories;
    }

    // This function saves the object to the database.
    async save() {
        try 
        {
            const docRef = await addDoc(collection(db, "barcode_food_not_verified"), 
            {
                barcode: this.barcode,
                name: this.name,
                carbs: this.carbs,
                sugars: this.sugars,
                protein: this.protein,
                fat: this.fat,
                calories: this.calories
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async saveLocal() {
        try {
            const jsonValue = JSON.stringify(this);
            var id = "@BARCODE_FOOD:" + this.name;
            await AsyncStorage.setItem(id, jsonValue);
            AsyncStorage.getItem(this.name).then((res) => console.log(res))
        }
        catch (e) {
            console.log(e);
        }
    }

    async PullFromDatabase(barcode) {
        // const docRef = await getDoc(doc(db, "barcode_food_not_verified", barcode));
        // if (docRef.exists()) {
        //     console.log("Document data:", docRef.data());
        // } else {
        //     console.log("No such document!");
        // }
    }
}