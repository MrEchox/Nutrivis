import React from 'react';
import { Text, StyleSheet, ScrollView, View, useColorScheme} from 'react-native';
import { Stack } from 'expo-router'
import { commonStyles } from '../../commonStyles';

export default function Page() {
  const colorScheme = useColorScheme();
  const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
  const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;
    return (
        <View style={[styles.container, themeBackground]}>
          
          <ScrollView>
            <Text style={[styles.title, themeTextStyle]}>Kas yra kalorijos?</Text>

            <Text style={[styles.text,themeTextStyle]}>
              Kalorija yra energijos vienetas. 
              Kalorijos mums asocijuojasi su maistu, tačiau jomis galima apskaičiuoti beveik viską, 
              kas turi energijos.
            </Text>

            <Text style={[styles.text,themeTextStyle]}>
              Kalorija - nesisteminis darbo ir energijos matavimo vienetas, lygus 4,186J (džauliai).
              1 kalorija atitinka energiją, kurios reikia, norint vieną gramo vandens temperatūrą pakelti 1 laipsniu Celcijaus.
            </Text>

            <Text style={[styles.text,themeTextStyle]}>
              Dauguma mūsų kalorijas sieja su maistu: „pakelis liesos varškės turi 158 kalorijas“. 
              Kalorijos, nurodytos ant maisto produkto įpakavimo iš tiesų yra kilokalorijos (1000 kalorijų = 1 kilokalorija). 
              Maisto kaloriją sudaro 4,186 J (džauliai). Taigi, pakelis liesos varškės turintis 158 maisto kalorijas, iš tiesų turi 158 000 kalorijas, 
              arba 158 kilokalorijas. O galonas benzino (~ 4litrai) – 31 000 kilokalorijų.
            </Text>

            <Text style={[styles.text,themeTextStyle]}>
              Tas pats tinka ir treniruotėse: jei sakoma, kad nubėgus vieną mylią, Jūs sudeginate 100 kalorijų, 
              tai reiškia, kad sudeginate 100 kilokalorijų.
            </Text>

            <Text style={[styles.title, themeTextStyle]}>Ką daro kalorijos?</Text>

            <Text style={[styles.text,themeTextStyle]}>
              Žmogui reikalinga energija, kad jis gyventų – kvėpuotų, judėtų, 
              vyktų kraujotaka – ir visam tam reikalingą energiją gauname su maistu.
            </Text>

            <Text style={[styles.text,themeTextStyle]}>
              Maiste esančių kalorijų kiekis nurodo, kiek potencialios energijos yra tame produkte. 
              Vienas gramas angliavandenių turi keturias kilokalorijas, vienas gramas baltymų turi taip pat keturias kilokalorijas, 
              o vienas gramas riebalų turi devynias kilokalorijas. Maistas sudarytas iš šių trijų sudedamųjų dalių. Taigi, jei žinote, 
              kiek gramų baltymų, riebalų bei angliavandenių yra tam tikrame maisto produkte, lengvai galima apskaičiuoti, kiek jis turi kilokalorijų.
            </Text>

            <Text style={[styles.text,themeTextStyle]}>
              Pažiūrėkime į jau minėtos liesos varškės įpakavimo etiketę. Pasakyta, kad 100g produkto turi 79 kilokalorijas. 
              Tai reiškia, kad, jei 100 gramų varškės supiltume į indą, bei pastatę ant ugnies, lauktume, kol produktas visiškai sudegs, 
              ši reakcija išskirtų 79 kilokalorijas – t.y. tokį energijos kiekį, kurio pakaktų 79 kilogramų vandens temperatūrą padidinti vienu laipsniu Celcijaus.
            </Text>

            <Text style={[styles.text,themeTextStyle]}>
              Atidžiau pažiūrėję į tos pačios varškės įpakavimo etiketę, pamatysime, kad varškę sudaro 16,3 gramai baltymų, 
              2,3 gramai angliavandenių bei 0,5 gramo riebalų, kas sudaro 79 kilokalorijas. Iš šių 79 kilokalorijų, 65,2 yra iš baltymų (4 kcal x 16,3 g), 
              4,5 kcal yra iš riebalų (9 kcal x 0,5 g) bei 9,2 yra iš angliavandenių (4 kcal x 2,3g).
            </Text>

            <Text style={[styles.text,themeTextStyle]}>
              Mūsų organizmas „sudegina“ šias varškės kalorijas metabolinių procesų metu, kai enzimai angliavandenius suskaido į gliukozę ir kitus cukrus, 
              riebalus – į glicerolį ir riebiaisias rūgštis, o baltymus – į aminorūgštis
            </Text>

            <Text style={[styles.text,themeTextStyle]}>
              Kraujotakos dėka šios molekulės yra išnešiojamos po ląsteles, kuriose jos arba absorbuojamos, arba siunčiamos toliau, 
              galutinėms metabolizmo stadijoms, kuriose jos reaguoja su deguonimi, kad išskirtų energiją.
            </Text>

            <Text style={[styles.title, themeTextStyle]}>Kalorijų poreikis</Text>

            <Text style={[styles.text,themeTextStyle]}>
              Taigi, kiek reikia kilokalorijų, kad mūsų ląstelės gerai funkcionuotų? Kiekvienam skirtingai. Tai priklauso nuo ūgio, svorio, amžiaus, lyties,
              aktyvumo lygio bei kitų faktorių.
            </Text>

            <Text style={styles.refference}>Šaltinis:{'\n'}https://maistassportui.lt/straipsniai/ivairus/apie-kalorijas</Text>
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


