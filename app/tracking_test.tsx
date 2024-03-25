import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Define your app's unique identifier
const FOOD_PREFIX = '@Food:';
const NORM_PREFIX = '@Norm:';

export default function Tracking() {
  const [localValuesT, setLocalValuesT] = useState([]);
  const [localValuesF, setLocalValuesF] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all keys from AsyncStorage
        const allKeysT = await AsyncStorage.getAllKeys();
        // Filter keys to only include those belonging to your app
        const appKeysT = allKeysT.filter(key => key.startsWith("@Norm:"));
        // Fetch values corresponding to the filtered keys
        const valuesT = await AsyncStorage.multiGet(appKeysT);

        // Update state with the retrieved values
        setLocalValuesT(valuesT);

        // Fetch all keys from AsyncStorage
        const allKeysF = await AsyncStorage.getAllKeys();
        // Filter keys to only include those belonging to your app
        const appKeysF = allKeysF.filter(key => key.startsWith("@Food:"));
        // Fetch values corresponding to the filtered keys
        const valuesF = await AsyncStorage.multiGet(appKeysF);

        // Update state with the retrieved values
        setLocalValuesF(valuesF);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItemT = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <Text>{item[0].replace(NORM_PREFIX, '')}: {item[1]}</Text>
    </TouchableOpacity>
  );

  const renderItemF = ({ item }) => (
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
      <Text style={styles.title}>User recomended daily norm Tab</Text>
      <FlatList
        data={localValuesT}
        renderItem={renderItemT}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
      <Text style={styles.title}>Food Tab</Text>
      <FlatList
        data={localValuesF}
        renderItem={renderItemF}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
      <FlatList
        data={localValuesF}
        renderItem={renderItemF}
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
