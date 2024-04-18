import React from 'react';
import { Text, StyleSheet, ScrollView, View, useColorScheme} from 'react-native';
import { Stack } from 'expo-router'
import { commonStyles } from '../../../components/commonStyles';

export default function Page() {
  const colorScheme = useColorScheme();
  const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
  const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;
    return (
        <View style={styles.container}>
        <ScrollView>
        <Text style={styles.title}>Kas yra baltymai?</Text>

<Text style={styles.text}>
Baltymai – statybinė raumenų medžiaga.
</Text>



<Text style={styles.text}>
Baltymai – viena iš pagrindinių maistinių medžiagų, kaip angliavandeniai ir riebalai. 
</Text>

<Text style={styles.text}>
Visos šios maistinės medžiagos susideda iš anglies, deguonies ir vandenilio. 
</Text>

<Text style={styles.text}>
Baltymai nuo angliavandenių ir riebalų skiriasi tuo, kad juose be anglies, deguonies ir vandenilio molekulių dar yra azoto, sulfanilamidino ir keletas mineralų. 
</Text>

<Text style={styles.text}>
Baltymas yra suformuota iš 100 ar daugiau susijungusių amino rūgščių. 
</Text>

<Text style={styles.text}>
Baltymai formuojami vadovaujantis specifiniai genetiniais kodais. 
</Text>

<Text style={styles.text}>
Taigi, atskiros amino rūšys į specifinius baltymus yra jungiamos naudojantis tam tikrais genais ar kodais. 
</Text>

<Text style={styles.text}>
Yra apie 10000 skirtingų baltymų rūšių.
</Text>

<Text style={styles.text}>
</Text>

<Text style={styles.text}>
</Text>

<Text style={styles.title}>Baltymų paskirtis</Text>

<Text style={styles.text}>
Baltymai yra statybinė raumens medžiaga, atstato pažeistas raumens skaidulas po treniruotės.
</Text>

<Text style={styles.text}>
Aprūpina imuninę sistemą antikūnais.
</Text>

<Text style={styles.text}>
Gamina hormonus ir enzimus, kurie yra įtraukiami į daugelį organizme vykstančių reakcijų.
</Text>

<Text style={styles.text}>
Padeda virškinti ir absorbuoti maistą.
</Text>

<Text style={styles.text}>
Energijos šaltinis, kai glikogeno atsargos išnaudotos.
</Text>

<Text style={styles.text}>
Maksimizuoja deguonies transportavimą į audinius.
</Text>

<Text style={styles.text}>
Medžiaga būtina raumenims, sausgyslėms, vidaus organams, kaulams, plaukams, odai, ir kitiems audiniams.
</Text>

<Text style={styles.refference}>Šaltinis:{'\n'}https://maistassportui.lt/straipsniai/ivairus/baltymai/</Text>
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


