import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Modal, Button, TextInput, useColorScheme, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { food_object_eaten } from '@/src/object_classes/food_object_eaten'; 
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { commonStyles } from '../../components/commonStyles';
import { router } from 'expo-router';


// Unique identifiers
const FOOD_PREFIX = '@Food:';
const FOOD_BARCODE_PREFIX = '@Barcode_Food:';

export default function Foods() {
  var date = new Date();
  const currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() +
  "-" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() ; // dd/mm/yyyy-hh:mm:ss

  // Values that are grabbed from local storage
  const [localFoodValues, setLocalFoodValues] = useState([]);
  const [localFoodBarcodeValues, setLocalFoodBarcodeValues] = useState([]);

  // Values for the modal info
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [protein, setProtein] = useState(0);

  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  const [eatenGrams, setEatenGrams] = useState(''); // Eaten grams state

  // Grabbed values for the selected item
  const [selectedItemIndex, setSelectedItemIndex] = useState('');
  const [selectedItemKey, setSelectedItemKey] = useState('');

  const [refreshPage, setRefreshPage] = useState(false); // State to trigger page refresh

  const route = useRoute();

  const fetchData = async () => {
    try {
      // Fetch all keys from AsyncStorage
      const allKeys = await AsyncStorage.getAllKeys();
      // Filter keys to only include those belonging to your app
      const appKeysFood = allKeys.filter(key => key.startsWith(FOOD_PREFIX));
      const appKeysFoodBarcode = allKeys.filter(key => key.startsWith(FOOD_BARCODE_PREFIX));
      // Fetch values corresponding to the filtered keys
      const valuesFood = await AsyncStorage.multiGet(appKeysFood);
      const valuesFoodBarcode = await AsyncStorage.multiGet(appKeysFoodBarcode);

      // Update state with the retrieved values
      setLocalFoodValues(valuesFood);
      setLocalFoodBarcodeValues(valuesFoodBarcode);

      //check if barcode was passed
      let item;

      if (route.params !== null) {
        if (route.params.barcode !== null) {
          const barcode = route.params.barcode;
          console.log(valuesFoodBarcode[0][1]);
          for (let i = 0; i < valuesFoodBarcode.length; i++) {
            item = valuesFoodBarcode[i];
            if (JSON.parse(item[1]).barcode == barcode) {
              console.log('Item:', JSON.parse(item[1]));
              handleFoodItemClick(item, valuesFoodBarcode.indexOf(item));
              break;
            }
          }
        }
      }


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useFocusEffect( // When focusing on page, fetch data
    React.useCallback(() => {
      fetchData();
      // Return cleanup function
      return () => {
        // Any cleanup you want to do when the component is unmounted or loses focus
      };
    }, [])
  );

  useEffect(() => { // When refreshPage state changes fetch data
    fetchData();
  }, [refreshPage]);

  const colorScheme = useColorScheme();
  const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
  const themeContainer = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
  const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;
  const themeSvg = colorScheme === 'light' ? '#ffffff' : '#003049';

  const renderFoodItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleFoodItemClick(item, index)}>
      <View style={[styles.FoodItemStyle, {backgroundColor:themeSvg}]}>
        <Text style={themeTextStyle}>{item[0].replace(FOOD_PREFIX, '')}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderScannedFoodItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleFoodItemClick(item, index)}>
      <View style={[styles.FoodItemStyle, {backgroundColor:themeSvg}]}>
        <Text style={themeTextStyle}>{item[0].replace(FOOD_BARCODE_PREFIX, '')}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleFoodItemClick = (item, index) => {
    // Handle the click event for each item in the list
    // For example, you can navigate to a detail screen or perform any other action
    setSelectedItemIndex(index);
    setModalVisible(true);

    if (item[0].startsWith(FOOD_PREFIX) || item[0].startsWith(FOOD_BARCODE_PREFIX)){
      // Extract the calories value
      const jsonValues = JSON.parse(item[1]);
      setCalories(jsonValues.calories);
      setCarbs(jsonValues.carbs);
      setFat(jsonValues.fat);
      setProtein(jsonValues.protein);

      if (item[0].startsWith(FOOD_PREFIX)) {
        item[0].replace(FOOD_PREFIX, '');
        setSelectedItemIndex(item[1].toString());
        setSelectedItemKey(item[0].toString());
      }
      else if (item[0].startsWith(FOOD_BARCODE_PREFIX)) {
        item[0].replace(FOOD_BARCODE_PREFIX, '');
        setSelectedItemIndex(item[1].toString());
        setSelectedItemKey(item[0].toString());
      }
      console.log('Selected item:', item[0].toString());
    }
  };

  const removeItem = async (name) => {
    try {
      await AsyncStorage.removeItem(name);
      console.log('Data removed: ', name);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  };

  const getLoggedInEmail = async () => {
    const loginVal = await AsyncStorage.getItem("@LoggedIn:");
    if (loginVal) {
      const status = JSON.parse(loginVal);
      return status.email;
    }
    return "";
  };

  const handleFoodSave = async (eatenGrams, name, calories, carbs, fat, protein) => {
    const email = await getLoggedInEmail();
    const eatenFood = new food_object_eaten(currentDate, parseFloat(eatenGrams), name, calories, carbs, fat, protein, email);
    eatenFood.saveLocal();
    eatenFood.save(email);
    Alert.alert('Valio!', 'Maisto produktas suvalgytas!', [
      { text: 'OK', onPress: () => router.replace('./home')}
  ]);
  }


  return (
    <View style={[styles.container, themeBackground, {paddingTop: 20}]}>
      <View style={[styles.container, commonStyles.mainStatsContainer, themeContainer]} /* Container for local food objects */> 
        <Text style={[styles.title, themeTextStyle]}>Įvesti maisto produktai</Text>
        <FlatList
          data={localFoodValues}
          renderItem={renderFoodItem}
          keyExtractor={(item, index) => item}
          style={styles.list}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, commonStyles.mainStatsContainer, themeContainer]}>
            <Text style={[themeTextStyle, {fontWeight:"500"}]}>
              Pasirinkta: {selectedItemIndex ? JSON.parse(selectedItemIndex).name + ' ' : ''} 
              ({selectedItemIndex ? JSON.parse(selectedItemIndex).calories : ''} kcal)
            </Text>
            <Text style={[themeTextStyle]}>
              (Angl.: {selectedItemIndex ? JSON.parse(selectedItemIndex).carbs + ' g, ' : ''}
              Rieb.: {selectedItemIndex ? JSON.parse(selectedItemIndex).fat + ' g, ' : ''}
              Prot.: {selectedItemIndex ? JSON.parse(selectedItemIndex).protein + ' g' : ''}
              
              )
            </Text>
            <View style={[themeContainer, {paddingBottom: 10}]}>
              <Text style={[styles.label, themeTextStyle, {fontWeight:"500", paddingBottom: 10}]}>Suvalgytas produkto kiekis</Text>
                <TextInput
                  style={[styles.input, themeTextStyle]}
                  placeholder="Įveskite kiekį gramais"
                  keyboardType="numeric"
                  onChangeText={(text) => setEatenGrams(text)}
                />
                <View style={[styles.buttonContainer, { marginTop: 10 }]}> 
                  <Button
                  color={themeSvg}
                  title="Įvesti"
                  onPress={() => { // On press saves the eaten food to local storage
                    const name = JSON.parse(selectedItemIndex).name; // Don't worry abt it, it works
                  
                    handleFoodSave(eatenGrams, name, calories, carbs, fat, protein);
                    setModalVisible(!modalVisible);
                    //router.replace('../home');
                  }}
                  />
              </View>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: 'transparent'}}>
              <View style={[styles.buttonContainer, { marginRight: 15 }]}> 
                <Button
                  title="Panaikinti"
                  color = {themeSvg}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    removeItem(selectedItemKey);
                    setRefreshPage(prevState => !prevState); // Toggle refreshPage state to trigger page refresh
                  }}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  color={themeSvg}
                  title="Uždaryti"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
            </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={[styles.container, commonStyles.mainStatsContainer, themeContainer]} /* Container for scanned food objects */>
        <Text style={[styles.title, themeTextStyle]}>Skenuoti maisto produktai</Text>
        <FlatList
          data={localFoodBarcodeValues}
          renderItem={renderScannedFoodItem}
          keyExtractor={(item, index) => item}
          style={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  label: {
    marginRight: 10,
    paddingLeft: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
},
buttonContainer: {
  borderRadius: 10,
  overflow: 'hidden',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.25,
},
FoodItemStyle: {
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 10,
  marginBottom: 8,
}
});
