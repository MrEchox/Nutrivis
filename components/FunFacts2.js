import React from 'react';
import { Text } from 'react-native';

const FunFacts2 = ({style}) => {
    const facts = [
        <Text key={1} style={style}>Papildai niekada negali visiškai pakeisti tikro maisto</Text>,
        <Text key={2} style={style}>Gerkite bent 8 stiklines vandens per dieną</Text>,
        <Text key={3} style={style}>Baltymai padeda auginti raumenis ir atkurti audinius</Text>,
        <Text key={4} style={style}>Avokadai yra puikus sveikųjų riebalų šaltinis</Text>,
        <Text key={5} style={style}>Vaisiai ir daržovės turi daug vitaminų ir mineralų svarbių jūsų sveikatai</Text>,
        <Text key={6} style={style}>Skirtingos spalvos daržovės turi skirtingų tipų antioksidantų</Text>,
        <Text key={7} style={style}>Žalioji arbata gali pagerinti medžiagų apykaitą ir padėti svorio kontrolei</Text>,
        <Text key={8} style={style}>Riešutai ir sėklos yra puikus sveikųjų riebalų ir baltymų šaltinis</Text>,
        <Text key={9} style={style}>Omega-3 riebalų rūgštys, esančios žuvyse, naudingos širdies sveikatai</Text>,
        <Text key={10} style={style}>Skaldyti grūdai turi daugiau skaidulų ir maistinių medžiagų nei rafinuoti grūdai</Text>,
        <Text key={11} style={style}>Per didelis cukraus vartojimas gali padidinti riziką susirgti 2 tipo diabetu</Text>,
        <Text key={12} style={style}>Valgykite mažesnėmis porcijomis ir dažniau, kad išlaikytumėte energiją per dieną</Text>,
        <Text key={13} style={style}>Tamsus šokoladas gali būti naudingas širdies sveikatai, jei vartojamas saikingai</Text>,
        <Text key={14} style={style}>Fermentuoti maisto produktai, kaip jogurtas, gali pagerinti virškinimo sveikatą</Text>,
        <Text key={15} style={style}>Vanduo padeda reguliuoti kūno temperatūrą ir palaikyti odos sveikatą</Text>,
        <Text key={16} style={style}>Salotos turi mažai kalorijų ir gali būti puikus užkandis arba pagrindinis patiekalas</Text>,
        <Text key={17} style={style}>Skaldytos avižos yra puikus ilgai išliekantis energijos šaltinis</Text>,
        <Text key={18} style={style}>Magnis, randamas riešutuose ir žaliosiose daržovėse, svarbus raumenų ir nervų funkcijai</Text>,
        <Text key={19} style={style}>Mėlynės yra gausios antioksidantų, kurie gali padėti kovoti su uždegimais</Text>,
        <Text key={20} style={style}>Bananai yra puikus kalio šaltinis, kuris padeda reguliuoti kraujospūdį</Text>,
        <Text key={21} style={style}>Spanguolės gali padėti išvengti šlapimo takų infekcijų</Text>,
        <Text key={22} style={style}>Salierai turi labai mažai kalorijų, tačiau daug skaidulų ir vandens</Text>,
        <Text key={23} style={style}>Česnakas gali padėti stiprinti imuninę sistemą ir kovoti su infekcijomis</Text>,
        <Text key={24} style={style}>Imbieras gali padėti sumažinti pykinimą ir uždegimus</Text>,
        <Text key={25} style={style}>Obuoliai turi daug skaidulų ir gali padėti virškinimui</Text>,
        <Text key={26} style={style}>Ananasai yra turtingi bromelainu, kuris gali padėti virškinimui ir mažinti uždegimus</Text>,
        <Text key={27} style={style}>Morkos yra puikus beta-karoteno šaltinis, kuris svarbus akių sveikatai</Text>,
        <Text key={28} style={style}>Pomidorai turi daug likopeno, kuris gali padėti apsaugoti nuo tam tikrų vėžio rūšių</Text>,
        <Text key={29} style={style}>Braškės yra mažai kalorijų ir turi daug vitamino C</Text>,
        <Text key={30} style={style}>Brokoliai yra puikus vitaminų C ir K šaltinis, taip pat turi daug skaidulų</Text>,
        <Text key={31} style={style}>Špinatai turi daug geležies ir kalcio, kurie svarbūs kaulų sveikatai</Text>,
        <Text key={32} style={style}>Moliūgai turi daug vitamino A, kuris svarbus odos sveikatai</Text>,
        <Text key={33} style={style}>Kiviai yra turtingi vitaminu C ir gali padėti stiprinti imuninę sistemą</Text>,
        <Text key={34} style={style}>Granatai yra gausūs antioksidantų, kurie gali padėti širdies sveikatai</Text>,
        <Text key={35} style={style}>Agurkai yra labai hidratuojantys dėl didelio vandens kiekio</Text>,
        <Text key={36} style={style}>Persikai turi daug vitaminų A ir C, kurie svarbūs odos sveikatai</Text>,
        <Text key={37} style={style}>Arbūzai yra puikus hidratacijos šaltinis dėl didelio vandens kiekio</Text>,
        <Text key={38} style={style}>Migdolai yra puikus sveikųjų riebalų ir baltymų šaltinis</Text>,
        <Text key={39} style={style}>Graikiniai riešutai turi daug omega-3 riebalų rūgščių, svarbių smegenų sveikatai</Text>,
        <Text key={40} style={style}>Avietės turi mažai kalorijų, bet daug skaidulų ir vitamino C</Text>,

    ];

    const randomIndex = Math.floor(Math.random() * facts.length);
    return facts[randomIndex];
};

export default FunFacts2;
