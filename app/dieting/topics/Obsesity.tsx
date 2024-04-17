import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Stack } from 'expo-router'

export default function Page() {
    
    return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Nutukimas</Text>

            <Text style={styles.text}>
            Nutukimas – ne tik estetinė, bet ir viso organizmo problema, dažnai susijusi su daugybe gretutinių ligų, tokių kaip cukrinis diabetas, arterinė hipertenzija ir obstrukcinė miego apnėja.
            </Text>

            <Text style={styles.text}>
            Antsvorį ir nutukimą lemia disbalansas tarp suvartojamų ir sunaudojamų kalorijų – šiais laikais ne visi žmonės skiria pakankamai laiko pasirūpinti tinkama mityba, todėl renkasi greitai energijos suteikiančius produktus, kuriuose gausu cukraus ir riebalų.
            </Text>

            <Text style={styles.text}>
            Nutukimas yra susijęs su riebalinio audinio problemomis – jis ne tik kaupia bei išskiria energiją, bet yra laikomas ir endokrininiu audiniu, o tai reiškia, kad jis gamina hormonus.
            </Text>

            

            <Text style={styles.refference}>Šaltinis:{'\n'}https://www.lrt.lt/naujienos/gyvenimas/13/2096471/gydytoja-nutukimas-ne-grozio-matas-o-letine-liga-kuria-svarbu-gydyti</Text>
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


