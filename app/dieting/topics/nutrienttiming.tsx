import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Stack } from 'expo-router'

export default function Page() {
    
    return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Kodėl reikia dažnai maitintis?</Text>

            <Text style={styles.text}>
            Dažnai valgydami mažesnius maisto kiekius padedame raumenims augti, kadangi toks maitinimasis apsaugo raumenis nuo katabolizmo, kuris asocijuojasi su ilgesniu laikotarpiu be maisto medžiagų.
            </Text>

            <Text style={styles.text}>
            Organizmas nesugeba kaupti baltymų ir vėliau juos panaudoti raumenų augimui.
            </Text>

            <Text style={styles.text}>
            Kadangi aminorūštys kraujyje išbūna maždaug apie tris valandas po paskutinio maitinimo, yra labai svarbu vartoti baltymus kas tris valandas.
            </Text>

            <Text style={styles.text}></Text>

            <Text style={styles.text}>
            Dažnai valgydami mažesnius maisto kiekius padedame augti raumenims, kadangi reguliuojame insulino lygį.
            </Text>

            <Text style={styles.text}>
            Didelis insulino lygis atsiranda padidėjus cukraus kiekiui kraujyje ir yra nepageidaudintas, tačiau, antra vertus, tam tikras insulino kiekis turi būti kraujyje nuolatos, kad aminorūgštys ir gliukozė būtų transportuojama į raumeninį audinį.
            </Text>

            <Text style={styles.text}>
            Viena pagrindinių insulino funkcijų – pernešti aminorūgštis į raumenį, kad jos būtų panaudojamos atsistatymui ir raumenų augimui.
            </Text>

            <Text style={styles.text}>
            Aminorūgštys negali būti kaupiamos, todėl baltymų sintezei, jos gali būti naudojamos maždaug apie 3 valandas po baltymų suvartojimo.
            </Text>


            <Text style={styles.refference}>Šaltinis:{'\n'}https://maistassportui.lt/straipsniai/ivairus/kodel-reikia-daznai-maitintis/</Text>
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


