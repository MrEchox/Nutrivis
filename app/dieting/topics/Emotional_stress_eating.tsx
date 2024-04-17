import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Stack } from 'expo-router'

export default function Page() {
    
    return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Emocinis valgymas - nervinė bulimija</Text>

            <Text style={styles.text}>
            Nervinė bulimija – valgymo sutrikimas, pasireiškiantis pasikartojančiais persivalgymo priepuoliais, kurių metu juntamas palengvėjimas, nes maistas savotiškai ramina ir po kurių ima persekioti kaltės jausmas, mintys apie gresiantį antsvorį.
            </Text>

            <Text style={styles.text}></Text>

            <Text style={styles.title}>
            Nervinės bulimijos simptomai:
            </Text>

            <Text style={styles.text}>
            Besaikis valgymas.
            </Text>

            <Text style={styles.text}>Griežtos dietos laikymasis.</Text>

            <Text style={styles.text}>Diuretikų, vidurius laisvinančiųjų vartojimas.</Text>

            <Text style={styles.text}>Dažnas vaikščiojimas i vonia/tualetą po valgio.</Text>

            <Text style={styles.text}>
            Nuolatinis rūpinimas savo svoriu.
            </Text>

            <Text style={styles.text}>
            Sekinantis sportavimo rėžimas.
            </Text>

            <Text style={styles.text}>
            SDepresija ar dažni nuotaikos svyravimai.
            </Text>

            <Text style={styles.text}>
            Neįprastas skruostų arba žandikaulių srities patinimas.
            </Text>

            <Text style={styles.text}>
            Dėl dažno vėmimo būna nudilęs dantų emalis.
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


