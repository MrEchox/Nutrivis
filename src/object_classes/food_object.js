import AsyncStorage from "@react-native-async-storage/async-storage";

// This is the class for the food object. This object is used to store the nutritional information of a food item.
// Since this is not TypeScript, we have to manually check the types of the parameters. 
// If the types are not correct, we throw an error.
// This class also contains functions to save the object locally.
// Additional functions can be added as needed.

const FOOD_PREFIX = '@Food:';

export class food_object {
        constructor(name, calories, carbs, sugar, fat, protein, salt) {
        if (typeof name !== 'string') {
            throw new Error('Name must be a string');
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

        this.name = name;
        this.calories = calories;
        this.carbs = carbs;
        this.sugar = sugar;
        this.fat = fat;
        this.protein = protein;
        this.salt = salt;
    }

    async saveLocal() {
        try {
            const jsonValue = JSON.stringify(this);
            var id = FOOD_PREFIX + this.name;
            await AsyncStorage.setItem(id, jsonValue);
            AsyncStorage.getItem(this.name).then((res) => console.log(res))
        }
        catch (e) {
            console.log(e);
        }
    }
}