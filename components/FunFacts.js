import React from 'react';
import { Text } from 'react-native';

const FunFacts = ({ calories, water, style}) => {
    const facts = [
        <Text key={1} style={style}>Šią savaitę suvalgėte: {(calories / 20_000_000_000).toFixed(10)} gramų urano.</Text>,
        <Text key={2} style={style}>Norint sudeginti tiek kalorijų, reikėtų nueiti {Math.round(calories / 0.04)} žingsnių.</Text>,
        <Text key={3} style={style}>Jūs suvartojote tiek kalorijų, kiek yra {(calories / 556).toFixed(2)} šokolado plytelėse.</Text>,
        <Text key={4} style={style}>Reikėtų užlipti {Math.round(calories / 0.17)} laiptų, kad sudegintumėte tiek kalorijų.</Text>,    
        <Text key={5} style={style}>Jūs išgėrėte {(water/1000/2_500_00)} olimpinių baseinų.</Text>,
        <Text key={6} style={style}>Jūsų kalorijų suvartojimas atitinka {(calories / 350).toFixed(2)} vidutinių obuolių pyrago gabalėlių.</Text>,
        <Text key={7} style={style}>Jūsų vandens suvartojimas prilygsta {Math.round(water / 500)} buteliukų vandens.</Text>,
        <Text key={8} style={style}>Norėdami sudeginti šias kalorijas bėgdami, turėtumėte bėgti apie {(calories / 750).toFixed(2)} valandas.</Text>,
    ];

    const randomIndex = Math.floor(Math.random() * facts.length);
    return facts[randomIndex];
};

export default FunFacts;