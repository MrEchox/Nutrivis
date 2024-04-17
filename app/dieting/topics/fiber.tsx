import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Stack } from 'expo-router'

export default function Page() {
    
    return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Kas yra skaidulos?</Text>

            <Text style={styles.text}>
            Skaidulos – nevirškinami angliavandeniai, esantys maisto produktuose.
            </Text>

            <Text style={styles.text}>
            Skaidulinių medžiagų virškinimo fermentai neskaido, todėl jos yra apdorojamos storosios žarnos mikrofloroje.
            </Text>

            <Text style={styles.title}>Padeda palaikyti tinkamą svorį</Text>

            <Text style={styles.text}>
            Daržovės ir vaisiai, kuriuose itin gausu skaidulų, paprastai yra mažai kaloringi.
            </Text>

            <Text style={styles.text}>
            Be to, skaidulos gali padėti sulėtinti virškinimą ir ilgesnį laiką palaikyti sotumo jausmą.
            </Text>

            <Text style={styles.title}>Reguliuoja cukraus kiekį kraujyje</Text>

            <Text style={styles.text}>
            Organizmas ilgiau skaido daug skaidulų turintį maistą, todėl gliukozė taip greitai nepatenka į kraują – tai padeda išlaikyti pastovesnį cukraus kiekį kraujyje.
            </Text>

            <Text style={styles.refference}>Šaltinis:{'\n'}https://fruttberry.com/blogs/tinklarastis/skaidulos-kas-tai-ir-kur-ju-gausu</Text>
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


