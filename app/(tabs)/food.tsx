import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define your app's unique identifier
const FOOD_PREFIX = '@Food:';

export default function Foods() {
  const [localValues, setLocalValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all keys from AsyncStorage
        const allKeys = await AsyncStorage.getAllKeys();
        // Filter keys to only include those belonging to your app
        const appKeys = allKeys.filter(key => key.startsWith("@BARCODE_FOOD:"));
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
    <View style={styles.container}>
      <Text style={styles.title}>Food Tab</Text>
      <FlatList
        data={localValues}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    width: '100%',
  },
});
