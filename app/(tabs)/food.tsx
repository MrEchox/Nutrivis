import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, ScrollView, SafeAreaView, VirtualizedList } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';

// Define your app's unique identifier
const FOOD_PREFIX = '@Food:';
const BAR_FOOD_PREFIX = '@BARCODE_FOOD:';

export default function Foods() {
  const [localValues, setLocalValues] = useState([]);
  var { name } = useLocalSearchParams<{name: string}>(); // Get barcode from the url args
  var { calories } = useLocalSearchParams<{calories: string}>(); // Get barcode from the url args
  var { carbs } = useLocalSearchParams<{carbs: string}>(); // Get barcode from the url args
  var { sugars } = useLocalSearchParams<{sugars: string}>(); // Get barcode from the url args
  var { fat } = useLocalSearchParams<{fat: string}>(); // Get barcode from the url args
  var { protein } = useLocalSearchParams<{protein: string}>(); // Get barcode from the url args
  var { sodium } = useLocalSearchParams<{sodium: string}>(); // Get barcode from the url args
  var { measuring_unit} = useLocalSearchParams<{measuring_unit: string}>(); // Get barcode from the url args

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all keys from AsyncStorage
        const allKeys = await AsyncStorage.getAllKeys();
        // Filter keys to only include those belonging to your app
        const appKeys = allKeys.filter(key => key.startsWith(BAR_FOOD_PREFIX));
        // Fetch values corresponding to the filtered keys
        const values = await AsyncStorage.multiGet(appKeys);

        // Update state with the retrieved values
        setLocalValues(values);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <Text>{item[0].replace(FOOD_PREFIX, '')}: {item[1]}</Text>
    </TouchableOpacity>
  );

  const handleItemClick = (item) => {
    // Handle the click event for each item in the list
    // For example, you can navigate to a detail screen or perform any other action
    console.log('Clicked item:', item);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Food Tab</Text>
          <FlatList
            data={localValues}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
          />
        </View>
        <View>
            <View style={styles.container}> 
                <Text style={styles.label}>Pavadinimas:</Text>
                <Text>{name}</Text>
            </View>

            <Text></Text>
            <Text style={styles.label}>100{measuring_unit} produkto maistinės vertės</Text>

            <View style={styles.container}> 
                <Text style={styles.label}>Kalorijos:</Text>
                <Text style={styles.label}>{parseFloat(calories)}</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.label}>Angliavandeniai:</Text>
                <Text style={styles.label}>{parseFloat(carbs)}</Text>
                <Text style={styles.label}>(iš kurių cukrų):</Text>
                <Text style={styles.label}>{parseFloat(sugars)}</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.label}>Riebalai:</Text>
                <Text style={styles.label}>{parseFloat(fat)}</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.label}>Baltymai:</Text>
                <Text>{parseFloat(protein)}</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.label}>Druska:</Text>
                <Text style={styles.label}>{sodium}</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.label}>Matavimo vienetai</Text>
                <Text style={styles.label}>{measuring_unit}</Text>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  label: {
    marginRight: 10,
    paddingLeft: 10,
    alignSelf: 'center',
},
});
