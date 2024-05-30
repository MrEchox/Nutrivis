import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Modal,
  Platform,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { calculateStepGoal, calculateRecommendedCalories } from "@/src/util/goal_calculations";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { Barcode_Food } from "@/src/object_classes/food_object_barcode";
import { daily_goal_object } from "@/src/object_classes/daily_goal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { commonStyles } from "../components/commonStyles";
import { HelperText } from "react-native-paper";

const Goal_Prefix = "@Goal:";

const SettingsScreen = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [weightObjective, setWeightObjective] = useState("maintain");
  const [stepGoal, setStepGoal] = useState(0);
  
  const [ageError, setAgeError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');
  
  const [username, setUsername] = useState("");

  const getLoggedInEmail = async () => {
    const loginVal = await AsyncStorage.getItem("@LoggedIn:");
    if (loginVal) {
      const status = JSON.parse(loginVal);
      return status.email;
    }
    return "";
  };

  const getLoggedInName = async () => {
    const loginVal = await AsyncStorage.getItem("@LoggedIn:");
    if (loginVal) {
      const status = JSON.parse(loginVal);
      setUsername(status.username);
    }
  };
  getLoggedInName();

  const handleCaloriesAndSteps = async () => {
    let hasError = false;
    const email = await getLoggedInEmail();

    // Checking input data for age error
    const inputAge = parseInt(age);
    if (inputAge >= 12 && inputAge <= 120) {
      setAge(age);
    } else {
      setAgeError('Amžius turi būti daugiau 12(netinkama vaikam)!');
      hasError=true;
    }


    // Checking input data for height error
    const inputheight = parseInt(height);
    if (inputheight >= 12 && inputheight <= 260) {
      setHeight(height);
    } else {
      setHeightError(' Ūgis turi atitikti realius matmenis cm !');
      hasError=true;
    }

    // Checking input data for weight error
    const inputweight = parseInt(weight);
    if (inputweight >= 0) {
      setHeight(weight);
    } else {
      setWeightError ('Svoris turibūti teigiamas!');
      hasError=true;
    }

    if (hasError){
      return;
    }

    const calculatedRecommendedCalories = calculateRecommendedCalories(
      inputAge,
      gender,
      height,
      weight,
      activityLevel,
      weightObjective
    );
    setCalorieGoal(calculatedRecommendedCalories);

    const calculatedStepGoal = calculateStepGoal(
      inputAge,
      gender,
      height,
      weight,
      activityLevel
    );
    setStepGoal(calculatedStepGoal);

    const goal_object = new daily_goal_object(
      calculatedRecommendedCalories,
      Math.round((calculatedRecommendedCalories * 0.5) / 4),
      Math.round((calculatedRecommendedCalories * 0.2) / 9),
      Math.round((calculatedRecommendedCalories * 0.3) / 4),
      calculatedStepGoal,
      email
    );
    await goal_object.saveLocal();
    await goal_object.save(email);
    router.replace("./home");
  };

  const colorScheme = useColorScheme();
  const themeBackground = colorScheme === "light" ? commonStyles.lightBackground : commonStyles.darkBackground;
  const themeContainer = colorScheme === "light" ? commonStyles.lightContainer : commonStyles.darkContainer;
  const themeTextStyle = colorScheme === "light" ? [commonStyles.lightThemeText, { fontFamily: "Helvetica", fontWeight: "bold" }] : [commonStyles.darkThemeText, { fontFamily: "Helvetica", fontWeight: "bold" }];
  const themeSvg = colorScheme === "light" ? "#ffffff" : "#003049";

  async function handleLogout() {
    const loginVal = await AsyncStorage.getItem("@LoggedIn:");
    if (loginVal) {
      const status = JSON.parse(loginVal);
      status.username = "";
      await AsyncStorage.setItem("@LoggedIn:", JSON.stringify(status));
      router.replace("./session/login");
    } else {
      await AsyncStorage.setItem("@LoggedIn:", JSON.stringify({ username: "" }));
      router.replace("./session/login");
    }
  }

  return (
    <SafeAreaView style={[styles.container, themeBackground]}>
      <ScrollView>
        <View style={[commonStyles.mainStatsContainer, themeContainer]}>
          <Text style={[styles.label, themeTextStyle]}>Amžius:</Text>
          <TextInput
            style={[styles.input, themeTextStyle]}
            placeholder="Įveskite savo amžių"
            keyboardType="numeric"
            value={age}
            onChangeText={(text) => setAge(text)}
          />
          {ageError ? <Text style={{ color: 'red' }}>{ageError}</Text> : null}
        </View>
        <View style={[commonStyles.mainStatsContainer, themeContainer]}>
          <Text style={[styles.label, themeTextStyle]}>Lytis</Text>
          <Picker
            selectedValue={gender}
            placeholder="Pasirinkite lytį"
            onValueChange={(itemValue) => setGender(itemValue)}
            style={[styles.input, themeContainer, themeTextStyle]}
          >
            <Picker.Item label="Vyras" value="male" />
            <Picker.Item label="Moteris" value="female" />
          </Picker>
        </View>
        <View style={[commonStyles.mainStatsContainer, themeContainer]}>
          <Text style={[styles.label, themeTextStyle]}>Ūgis</Text>
          <TextInput
            style={[styles.input, themeTextStyle]}
            placeholder="Įveskite savo ūgį (cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={(text) => setHeight(text)}
          />
          {heightError ? <Text style={{ color: 'red' }}>{heightError}</Text> : null}
        </View>
        <View style={[commonStyles.mainStatsContainer, themeContainer]}>
          <Text style={[styles.label, themeTextStyle]}>Svoris</Text>
          <TextInput
            style={[styles.input, themeTextStyle]}
            placeholder="Įveskite savo svorį (kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={(text) => setWeight(text)}
          />
          {weightError ? <Text style={{ color: 'red' }}>{weightError}</Text> : null}
        </View>
        <View style={[commonStyles.mainStatsContainer, themeContainer]}>
          <Text style={[styles.label, themeTextStyle]}>Fizinio aktyvumo lygis</Text>
          <Picker
            selectedValue={activityLevel}
            onValueChange={(itemValue) => setActivityLevel(itemValue)}
            style={[styles.input, themeTextStyle, themeContainer]}
          >
            <Picker.Item label="Neaktyvus" value="sedentary" />
            <Picker.Item label="Mažas" value="lightly active" />
            <Picker.Item label="Vidutinis" value="moderately active" />
            <Picker.Item label="Didelis" value="very active" />
            <Picker.Item label="Labai didelis" value="extra active" />
          </Picker>
        </View>
        <View style={[commonStyles.mainStatsContainer, themeContainer]}>
          <Text style={[styles.label, themeTextStyle]}>Jūsų tikslas</Text>
          <Picker
            selectedValue={weightObjective}
            onValueChange={(itemValue) => setWeightObjective(itemValue)}
            style={[styles.input, themeTextStyle, themeContainer]}
          >
            <Picker.Item label="Ekstremalus svorio metimas" value="extreme loss" />
            <Picker.Item label="Svorio metimas" value="loss" />
            <Picker.Item label="Svorio palaikymas" value="maintain" />
            <Picker.Item label="Svorio priaugimas" value="gain" />
            <Picker.Item label="Ekstremalus svorio priaugimas" value="extreme gain" />
          </Picker>
        </View>
        <View style={[commonStyles.mainStatsContainer, themeContainer]}>
          <View style={styles.buttonContainer}>
            <Button
              color={themeSvg}
              title="Apskaičiuoti"
              onPress={handleCaloriesAndSteps}
            />
          </View>
        </View>
        <View style={[commonStyles.mainStatsContainer, themeContainer]}>
          <Text style={[themeTextStyle, { alignSelf: "center", marginBottom: 10 }]}>
            Sveiki {username}!
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              color={themeSvg}
              title="Atsijungti nuo paskyros"
              onPress={handleLogout}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    marginRight: -20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    marginRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    fontWeight: "500",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    alignSelf: "center",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "",
  },
});

export default SettingsScreen;
