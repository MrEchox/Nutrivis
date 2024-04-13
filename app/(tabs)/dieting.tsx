import React, { useState } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { Link } from 'expo-router';


const pages = [
    { title: 'Kalorijos', link: '../dieting/topics/calories' },
    { title: 'Angliavandeniai', link: '../dieting/topics/carbs' },
    { title: 'Baltymai', link: '../dieting/topics/protein' },
    { title: 'Riebalai - lipidai', link: '../dieting/topics/fats' },
    { title: 'Skaidulos', link: '../dieting/topics/fiber' },
    { title: 'Hidratacija', link: '../dieting/topics/hydration'},
    { title: 'Papildai', link: '../dieting/topics/supplements'},
  // Add more pages as needed
];

const PageList = () => {
    const renderItem = ({ item }) => (
        <Link href={item.link} style={{ padding: 10, fontSize: 20, borderBottomWidth: 1 }}>
            ● {item.title}
        </Link>
    );

    return (
        <View>
            <FlatList
                data={pages}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
            />
        </View>
    );
};

export default PageList;