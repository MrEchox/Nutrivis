import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Stack } from 'expo-router'

export default function Page() {
    
    return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Sporto treniruočių rūšys ir kryptys</Text>

            <Text style={styles.title}></Text>

            <Text style={styles.title}>
            Jėgos: tai-bo, crossfit
            </Text>

            <Text style={styles.text}>
            Aprūpina organizmą optimaliai sveikatai reikalingu maisto medžiagų kiekiu.
            </Text>

            <Text style={styles.text}>
            Tai-bo jungia aerobikos ir jėgos technikos elementus, smūgius.
            </Text>

            <Text style={styles.text}>
            Crossfit – kompleksiniai užsiėmimai. Į sąrašą įeina jėgos treniruotės, bėgimas, pratimai su svarmenimis ir hanteliais, svorių kilnojimas.
            </Text>

            <Text style={styles.title}></Text>

            <Text style={styles.title}>Kardio pratimai: stepas, aerobika, vandens aerobika</Text>

            <Text style={styles.text}>Vandens aerobika leidžia tinkamai paskirstyti ir sumažinti skeletui ir stuburui tenkantį krūvį.</Text>

            <Text style={styles.text}>
            Aerobiką sudaro įvairūs elementai, skirti skirtingoms raumenų grupėms.
            </Text>

            <Text style={styles.text}>
            Stepas – tai pratimai ant specialios platformos, kurios pagalba lengva imituoti judesius ant laiptų.
            </Text>

            <Text style={styles.title}></Text>

            <Text style={styles.title}>
            Tempimas: tempimas, kūno plastika
            </Text>

            <Text style={styles.text}>
            Tempimas atliekamas atliekant laipsniškus raumenų ir sausgyslių tempimo pratimus, be traumų ir rizikos.
            </Text>

            <Text style={styles.text}>
            Kūno plastika reiškia treniruotes su specialiu treniruokliu, kurio pagalba gerinamas tempimas ir mažinamas svoris.
            </Text>

            <Text style={styles.title}></Text>

            <Text style={styles.title}>
            Su choreografijos elementais: šokių aerobika, Pole-Dance
            </Text>

            <Text style={styles.text}>
            Šokių aerobika apima ritminius šokio stiliaus judesius. 
            </Text>
            
            <Text style={styles.text}>
            Pole dance – užsiėmimai ant pilono. 
            </Text>

            <Text style={styles.title}></Text>

            <Text style={styles.title}>
            Su dvasinių praktikų elementais: joga, taiči, budokon
            </Text>

            <Text style={styles.text}>
            Joga sujungia fizinius ir dvasinius pratimus, kvėpavimo treniruotes, visapusiškai lavina ir stiprina kūną. 
            </Text>

            <Text style={styles.text}>
            Taiči reiškia, kad yra gimnastikos judesių, kovos menų, jėgos treniruočių.
            </Text>

            <Text style={styles.text}>
            Budokone derinamos kelios sporto kryptys, įskaitant jogą, kovos menus, meditacines praktikas, siekiant įvairiapusio tobulėjimo ir psichinio komforto.
            </Text>

            <Text style={styles.title}></Text>

            <Text style={styles.title}>
            Su treniruokliais ir sporto įranga: kamuoliais, platformomis, takeliais ir fitbolo kamuoliu
            </Text>

            <Text style={styles.text}>
            Fitball leidžia atlikti gimnastikos judesius, lavinti vikrumo, lankstumo, koordinacijos, plastiškumo įgūdžius.
            </Text>

            <Text style={styles.text}>
            Platformos ir takeliai leidžia rengti sporto pamokas, kuriose net ir mažose erdvėse yra daug judėjimo veiklos.
            </Text>

            <Text style={styles.refference}>Šaltinis:{'\n'}https://basketdream.lt/sveikatingumo-treniruociu-tipai/</Text>
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


