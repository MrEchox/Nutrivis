import {collection, addDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig.js";


// This is the class for the Barcode_Food object. This object is used to store the nutritional information of a food item.
// Since this is not TypeScript, we have to manually check the types of the parameters. 
// If the types are not correct, we throw an error.
// This class also contains functions to save the object to the database.
// Additional functions can be added as needed.
export class food_object_manual {
        constructor(name, barcode, calories, carbs, sugar, fat, protein, salt) {
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
        if (typeof sugar !== 'number') {
            throw new Error('Sugar must be a number');
        }
        if (typeof fat !== 'number') {
            throw new Error('Fat must be a number');
        }
        if (typeof protein !== 'number') {
            throw new Error('Protein must be a number');
        }
        if (typeof salt !== 'number') {
            throw new Error('Salt must be a number');
        }

        this.barcode = barcode;
        this.name = name;
        this.carbs = carbs;
        this.sugar = sugar;
        this.fat = fat;
        this.protein = protein;
        this.salt = salt;
    }

    // This function saves the object to the database.
    async save() {
        const docRef = await addDoc(collection(db, "food_object_manual"), {
            barcode: this.barcode,
            name: this.name,
            carbs: this.carbs,
            sugar: this.sugar,
            fat: this.fat,
            protein: this.protein,
            salt: this.salt
        });
        console.log("Document written with ID: ", docRef.id);
    }
}