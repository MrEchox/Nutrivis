import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Stack } from 'expo-router'

export default function Page() {
    
    return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Kas yra angliavandeniai?</Text>

            <Text style={styles.text}>
            Angliavandeniai yra pirminis raumenų energijos šaltinis. 
            </Text>

            <Text style={styles.text}>
            Sportuojant jūsų raumenims reikia energijos, kuri yra gaunama iš raumenyse, 
            kepenyse ir kraujo sistemoje esančių angliavandenių, baltymų ir riebalų. 
            </Text>

            <Text style={styles.text}>
            Treniruotės intensyvumas ir trukmė lemia, kuri pagrindinė maistinė medžiaga yra naudojama (deginama), 
            tačiau angliavandeniai yra pirminis ir svarbiausias energijos šaltinis jūsų raumenims, 
            taip kaip jūsų kūnui yra svarbios pagrindinės raumenų grupės.
            </Text>

            <Text style={styles.text}>
            Beveik visi dietiniai angliavandeniai yra gaunami iš augalų, išskyrus laktozę, 
            kuri gaunama iš pieno produktų. 
            </Text>

            <Text style={styles.text}>
            Angliavandeniai susideda iš anglies, vandenilio ir deguonies molekulių. 
            </Text>

            <Text style={styles.text}>
            Angliavandeniai susiformuoja vykstant procesui, kai augalas naudoja saulės energiją. 
            </Text>

            <Text style={styles.text}>
            Ją paverčia angliavandeniais ir naudoja, bei kaupia pats. 
            </Text>

            <Text style={styles.text}>
            Kai mes valgome augalus, tai, iš tiesų, mes valgome angliavandenius.
            </Text>

            <Text style={styles.text}>
            Angliavandeniai – vienintelis energijos šaltinis, kurį naudoja smegenys ir centrinė nervų sistema. 
            </Text>

            <Text style={styles.text}>
            Mūsų raumenys taip pat turi būti aprūpinami gliukoze, pagrindine angliavandenių forma, kad funkcionuotų. 
            </Text>

            <Text style={styles.text}>
            Angliavandeniai taip pat padeda išsaugoti raumenyse esantį baltymą, kad jis nebūtų panaudotas energijai gaminti, 
            bei greitina medžiagų apykaitą ir padeda efektyviai deginti riebalus. 
            </Text>

            <Text style={styles.text}>
            Angliavandeniais turtingas maistas organizmą aprūpina skaidulomis, ko negali padaryti baltymai ar riebalai.
            </Text>

            <Text style={styles.title}>Angliavandenių tipai</Text>

            <Text style={styles.text}>
            Angliavandeniai klasifikuojami pagal jų cheminę sudėtį. 
            </Text>

            <Text style={styles.text}>
            Monosacharidai yra vienas angliavandenio vienetas. 
            </Text>

            <Text style={styles.text}>
            Disacharidas – du, kartu sujungti monosacharidai. 
            </Text>

            <Text style={styles.text}>
            Polisacharidai – sudėtinės cukraus molekulės sujungtos į ilgą grandinę ir sudarančios angliavandenį. 
            </Text>

            <Text style={styles.text}>
            Paprastieji angliavandeniai, tai cukrus ir saldumynai, ir sudėtiniai angliavandeniai, tokie kaip skaidulos ir krakmolas.
            </Text>

            <Text style={styles.refference}>Šaltinis:{'\n'}https://maistassportui.lt/straipsniai/ivairus/angliavandeniai/</Text>
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


