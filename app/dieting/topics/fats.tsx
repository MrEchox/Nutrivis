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
          <Text style={styles.title}>Kas yra lipidai?</Text>

<Text style={styles.text}>
Lipidai – svarbus organizmo energijos bei endogeninio vandens šaltinis (po galutinės 100 g lipidų oksidacijos susidaro 107,1 g vandens).
</Text>

<Text style={styles.text}>
Riebalai gali būti augalinės arba gyvulinės kilmės.
</Text>

<Text style={styles.text}>
Augalinės kilmės lipiduose yra būtinų organizmui nesočiųjų riebiųjų rūgščių (linolino, linoleno, arachido), kurios atlieka vitaminų vaidmenį.
</Text>

<Text style={styles.text}>
Lipidai apsaugo nuo oksidacijos ir suirimo riebaluose tirpstančius vitaminus.
</Text>

<Text style={styles.text}>
Organizmui labai svarbios nesočiosios riebiosios rūgštys, biologiškai jos yra vertingesnės nei sočiosios riebiosios rūgštys. 
</Text>

<Text style={styles.text}>
Todėl augaliniai aliejai (ypač nerafinuoti) yra žymiai naudingesni nei kieti gyvuliniai riebalai. 
</Text>

<Text style={styles.text}>
Nesočiosios riebiosios rūgštys padeda pašalinti iš organizmo cholesterino perteklių per viškinamąjį traktą. 
</Text>

<Text style={styles.text}>
Nesočiosios riebiosios rūgštys žmogaus organizme nėra sintezuojamos, todėl jos yra nepakeičiamos, o produktai, kuriuose jų yra būtinai turi būti maisto racione.
</Text>

<Text style={styles.text}>
Kaip maisto papildai dažniausiai naudojami dvejopi polinesočiųjų riebiųjų rūgščių kompleksai – omega-3 ir omega-6. 
</Text>

<Text style={styles.text}>
Jos kaupiasi galvos smegenų ir reprodukcinių ląstelių membranose.
</Text>

<Text style={styles.refference}>Šaltinis:{'\n'}https://maistassportui.lt/straipsniai/ivairus/lipidai/</Text>
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


