import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Stack } from 'expo-router'

export default function Page() {
    
    return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Kam reikalingi maisto papildai?</Text>

            <Text style={styles.text}>
            Suteikia maisto medžiagų kiekį, reikalingą, siekiant išvengti ir apsaugoti organizmą nuo jų trūkumo.
            </Text>

            <Text style={styles.text}>
            Aprūpina organizmą optimaliai sveikatai reikalingu maisto medžiagų kiekiu.
            </Text>

            <Text style={styles.text}>
            Kitaip tariant, maisto papildai suteikia organizmui darbui ir gerai savijautai reikalingų jėgų!
            </Text>

            <Text style={styles.text}></Text>

            <Text style={styles.text}></Text>

            <Text style={styles.title}>Kam kokie vitaminai reikalingi?</Text>

            <Text style={styles.text}>
            Rūkaliams reikia daugiau vitamino C, kavos mėgėjams – daugiau vitamino B.
            </Text>

            <Text style={styles.text}>
            Kadangi dietos besilaikantys žmonės gauna mažai riebalų, jiems gali prireikti daugiau juose esančio vitamino E.
            </Text>

            <Text style={styles.text}>
            Jei žmonės vartoja gausių riebalų produktų, jiems reikalingi maisto papildai, suteikiantys vitamino A, D, E, K ir karotenoidų, kadangi riebalai trukdo įsisavinti šias lipiduose tirpstančias maisto medžiagas.
            </Text>

            <Text style={styles.refference}>Šaltinis:{'\n'}https://proteinas.lt/lt/info/13-maisto-papildu-svarba</Text>
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


