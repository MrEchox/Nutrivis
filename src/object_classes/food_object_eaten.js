import AsyncStorage from "@react-native-async-storage/async-storage";

// This is the class for the food object. This object is used to store the nutritional information of a food item.
// Since this is not TypeScript, we have to manually check the types of the parameters. 
// If the types are not correct, we throw an error.
// This class also contains functions to save the object locally.
// Additional functions can be added as needed.

const prefix = '@Food_Eaten:';

export class food_object_eaten {
        constructor(date, amount, name, calories, carbs, fat, protein) {
        if (typeof date !== 'string') {
            throw new Error('Date must be a string');
        }
        if (typeof amount !== 'number') {
            throw new Error('Amount must be a number');
        }
        if (typeof name !== 'string') {
            throw new Error('Name must be a string');
        }
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

        this.date = date;
        this.amount = amount;
        this.name = name;
        this.calories = calories;
        this.carbs = carbs;
        this.fat = fat;
        this.protein = protein;
    }

    async saveLocal() {
        try {
            const jsonValue = JSON.stringify(this);
            var id = prefix + this.date + ":" + this.name; // @EatenFood:date:name
            await AsyncStorage.setItem(id, jsonValue);
            AsyncStorage.getItem(id).then((res) => console.log("Added eaten food:\n" + res))
        }
        catch (e) {
            console.log(e);
        }
    }
}