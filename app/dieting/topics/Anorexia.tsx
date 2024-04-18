import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Stack } from 'expo-router'

export default function Page() {
    
    return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Anoreksijos simptomai</Text>

            <Text style={styles.text}>
            Nervinė anoreksija – tai nepaprastai pavojingas sveikatai ir žmogaus gyvybei valgymo sutrikimas, kuris kyla dėl neurotinio noro suliesėti.
            </Text>

            <Text style={styles.text}>
            Sąmoningas “storinančio maisto” vengimas, badavimas, vidurius laisvinančių ir apetitą slopinančių preparatų vartojimas, vėmimo sukėlimas, alkio neigimas, pernelyg intensyvus sportavimas.
            </Text>

            <Text style={styles.text}>
            Asmuo iškreiptai vertina savo kūną, nuolat nerimauja, bijodamas sustorėti.
            </Text>

            <Text style={styles.text}>
            Moterims dingsta mėnesinės, vyrams sumažėja seksualinis potraukis ir susilpnėja potencija.
            </Text>

            
            

            <Text style={styles.refference}>Šaltinis:{'\n'}https://maistassportui.lt/straipsniai/ivairus/mitybos-sutrikimai/</Text>
          </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    refference: {
        fontSize: 14,
        marginBottom: 10,
        fontStyle: 'italic',
        color: 'gray',
    }
});


