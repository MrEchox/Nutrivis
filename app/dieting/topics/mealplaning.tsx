import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Stack } from 'expo-router'

export default function Page() {
    
    return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Maistas kurį reikia valgyti ir kurio vengti?</Text>

            <Text style={styles.text}>
            Gyvybinės energijos turintis maistas – tai visos natūralios, neapdorotos arba mažai apdorotos maisto medžiagos.
            </Text>

            <Text style={styles.text}>
            Daržovės – žalios, o ne konservuotos, su šalto spaudimo aliejaus ir citrinos padažu, o ne majonezu ar grietine.
            </Text>

            <Text style={styles.text}>
            Vaisiai ir uogos – švieži arba pačių užšaldyti, o ne konservuoti, virti ar dar blogiau – uogienių pavidalu.
            </Text>

            <Text style={styles.text}>Sultys – tik natūralios, pačių spaustos.</Text>

            <Text style={styles.text}>Duona ir pyrago gaminiai – viena riekelė baltos duonos per savaitę ar picos gabalėlis jūsų nenužudys, tačiau valgyti tai kasdien – lėtai kastis sau duobę.</Text>

            <Text style={styles.text}>Duoną rinkitės tik mažai apdorotą, su nesmulkintais grūdais</Text>

            <Text style={styles.text}>
            Saldumynai bei cukrus – tai yra tai, ko jums tikrai mažiausiai reikia. Cukrų pakeiskite fruktoze, medumi ar natūraliu ruduoju cukranendrių cukrumi.
            </Text>

            <Text style={styles.text}>
            Riebalai – naudingi, tačiau spirgučių padažas tai ne tai ko jums reikėtų.
            </Text>

            <Text style={styles.text}>
            Naudokite šaltai spaustą alyvuogių arba linų sėmenų aliejų.
            </Text>

            <Text style={styles.text}>
            Kruopas naudokite kuo mažiau apdorotas, kuo prasčiau jos atrodo pakelyje – tuo geriau.
            </Text>

            <Text style={styles.text}>
            Baltus miltus praturtinkite skaidulomis ir gemalais, taip jiems sugrąžinsite biologinę vertę.
            </Text>

            <Text style={styles.text}>
            Mėsą valgykite tik atskirtą nuo krakmolinių angliavandenių (bulvių, makaronų, duonos).
            </Text>

            <Text style={styles.refference}>Šaltinis:{'\n'}https://maistassportui.lt/straipsniai/ivairus/mityba-gyvenimui/</Text>
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


