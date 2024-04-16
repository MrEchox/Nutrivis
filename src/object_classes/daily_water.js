import AsyncStorage from "@react-native-async-storage/async-storage";

// This is the class for the food object. This object is used to store the user's daily norm of calories and macronutrients.
// Since this is not TypeScript, we have to manually check the types of the parameters. 
// If the types are not correct, we throw an error.
// This class also contains functions to save the object locally.
// Additional functions can be added as needed.

const prefix = '@Water:';
var x = 0;

export class daily_water_object {
        constructor(date, water) {
        if (typeof date !== 'string') {
            throw new Error('Date must be a string');
        }
        if (typeof water !== 'number') {
            throw new Error('Water must be a number');
        }
        this.date = date;
        this.water = water;
    }

    async saveLocal() {
        try {
            const jsonValue = JSON.stringify(this);
            var id = prefix + this.date;
            await AsyncStorage.setItem(id, jsonValue);
            AsyncStorage.getItem(id).then((res) => console.log("Added water:\n" + res))
        }
        catch (e) {
            console.log(e);
        }
    }
}