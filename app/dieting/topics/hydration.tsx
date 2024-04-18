import React from 'react';
import { Text, StyleSheet, ScrollView, View, useColorScheme} from 'react-native';
import { Stack } from 'expo-router'
import { commonStyles } from '../../../components/commonStyles';

export default function Page() {
  const colorScheme = useColorScheme();
  const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
  const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;
    return (
        <View style={[styles.container, themeBackground]}>
          <ScrollView>
            <Text style={styles.title}>Kodėl vanduo toks svarbus?</Text>

            <Text style={styles.text}>
            Vanduo – vienas svarbiausių organizmo elementų, todėl reguliarus vandens vartojimas yra būtinas geram organizmo funkcionavimui.
            </Text>

            <Text style={styles.text}>
            Žmogaus organizmą sudaro du trečdaliai skysčio, kas įrodo, jog gyvybė be vandens negali egzistuoti.
            </Text>

            <Text style={styles.text}>
            Vanduo yra gyvybiškai svarbus, nes jo dėka į organizmą pernešamos svarbiausios medžiagos.
            </Text>

            <Text style={styles.text}>
            Vanduo yra gyvybiškai svarbus, nes jo dėka į organizmą pernešamos svarbiausios medžiagos.
            </Text>

            <Text style={styles.text}>
            Vanduo dalyvauja biocheminiame skaidyme, kai mes valgome ir transportuoja maistines medžiagas į mūsų organizmą.
            </Text>

            <Text style={styles.text}>
            Vanduo ne tik leidžia pasisavinti reikalingas medžiagas, bet taip pat iš organizmo pašalina toksinus bei padeda deginti nereikalingus riebalus.
            </Text>

            <Text style={styles.text}>
            Vanduo padeda reguliuoti kūno temperatūrą bei padeda išsaugoti sveikus sąnarius ir sustiprina raumenis.
            </Text>

            <Text style={styles.refference}>Šaltinis:{'\n'}https://camelia.lt/naujienos/sveikata/vandens-svarba-organizmui-kasdienis-ir-nepakeiciamas-geros-savijautos-palydovas-163</Text>
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


