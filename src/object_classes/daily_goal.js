import AsyncStorage from "@react-native-async-storage/async-storage";

// This is the class for the food object. This object is used to store the user's daily norm of calories and macronutrients.
// Since this is not TypeScript, we have to manually check the types of the parameters. 
// If the types are not correct, we throw an error.
// This class also contains functions to save the object locally.
// Additional functions can be added as needed.

const prefix = '@Goal:';
var x = 0;

export class daily_goal_object {
        constructor(calories, carbs, fat, protein, stepGoal) {
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
    }

    async saveLocal() {
        try {
            const jsonValue = JSON.stringify(this);
            var id = prefix + "local";
            await AsyncStorage.setItem(id, jsonValue);
            AsyncStorage.getItem(id).then((res) => console.log("Added goal:\n" + res))
        }
        catch (e) {
            console.log(e);
        }
    }
}