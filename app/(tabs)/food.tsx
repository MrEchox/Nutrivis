import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Modal, Button, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { food_object_eaten } from '@/src/object_classes/food_object_eaten'; 
import { useFocusEffect } from '@react-navigation/native';


// Unique identifiers
const FOOD_PREFIX = '@Food:';
const FOOD_BARCODE_PREFIX = '@Barcode_Food:';

export default function Foods() {
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

  const renderFoodItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleFoodItemClick(item, index)}>
      <Text>{item[0].replace(FOOD_PREFIX, '')}</Text>
    </TouchableOpacity>
  );
  const renderScannedFoodItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleFoodItemClick(item, index)}>
      <Text>{item[0].replace(FOOD_BARCODE_PREFIX, '')}</Text>
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

  const handleFoodSave = async (currentDate, eatenGrams, name, calories, carbs, fat, protein) => {
    const email = await getLoggedInEmail();
    const eatenFood = new food_object_eaten(currentDate, parseFloat(eatenGrams), name, calories, carbs, fat, protein, email);
    eatenFood.saveLocal();
    eatenFood.save(email);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maisto puslapis</Text>
      <View style={styles.container} /* Container for local food objects */> 
        <Text style={styles.title}>Įvesti maisto produktai</Text>
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
            <View style={styles.modalContent}>
            <Text>Food information: {selectedItemIndex !== null ? selectedItemIndex.toString() : ''}</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Suvalgytas produkto kiekis</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Įveskite kiekį gramais"
                  keyboardType="numeric"
                  onChangeText={(text) => setEatenGrams(text)}
                />
                <Button
                title="Įvesti"
                onPress={() => { // On press saves the eaten food to local storage
                  const name = selectedItemIndex.split(',')[0].split(':')[1]; // Don't worry abt it, it works
                  var date = new Date();
                  const currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                  handleFoodSave(currentDate, eatenGrams, name, calories, carbs, fat, protein);
              }}
              />
            </View>
            <Button
              title="Panaikinti"
              onPress={() => {
                setModalVisible(!modalVisible);
                removeItem(selectedItemKey);
                setRefreshPage(prevState => !prevState); // Toggle refreshPage state to trigger page refresh
              }}
            />
            <Button
              title="Uždaryti"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.container} /* Container for scanned food objects */>
        <Text style={styles.title}>Skenuoti maisto produktai</Text>
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
  },
  label: {
    marginRight: 10,
    paddingLeft: 10,
  },
});
