import React, { useState } from 'react';
import { View, FlatList, ScrollView, useColorScheme} from 'react-native';
import { Link } from 'expo-router';

import { commonStyles } from '../../components/commonStyles';


const pages = [
    { title: 'Kalorijos', link: '../dieting/topics/calories' },
    { title: 'Angliavandeniai', link: '../dieting/topics/carbs' },
    { title: 'Baltymai', link: '../dieting/topics/protein' },
    { title: 'Riebalai', link: '../dieting/topics/fats' },
    { title: 'Skaidulos', link: '../dieting/topics/fiber' },
    { title: 'Hidratacija', link: '../dieting/topics/hydration'},
    { title: 'Papildai', link: '../dieting/topics/supplements'},
  // Add more pages as needed
];

const PageList = () => {
    const renderItem = ({ item }) => (
        <Link href={item.link} style={[{ padding: 10, fontSize: 20, borderBottomWidth: 1, }, themeTextStyle]}>
            ● {item.title}
        </Link>
    );
    const colorScheme = useColorScheme();
    const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
    const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;

    return (
        <View style={[themeBackground, {flex: 1}]}>
            <FlatList
                data={pages}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
            />
        </View>
    );
};

export default PageList;