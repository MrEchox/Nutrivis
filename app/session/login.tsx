import { StyleSheet, TextInput, Button, ScrollView, SafeAreaView, BackHandler } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
    return (
        <View style={styles.container}>
                <Text style={styles.title}>Prisijungimas</Text>
                <Text> </Text>
                <View style={styles.inputContainer}> 
                    <Text style={styles.label}>El. paštas:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Įveskite prisijungimo el. paštą"
                    />
                </View>
                <View style={styles.inputContainer}> 
                    <Text style={styles.label}>Slaptažodis:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Įveskite prisijungimo slaptažodį"
                    />
                </View>
                <Button 
                    title="Prisijungti"
                />
                <Text> </Text>
                <Button 
                    title="Prisijungti su Google"
                />
                <Text> </Text>
                <Text>Jungiates pirmą kartą?</Text>
                <Button 
                    title="Registruotis"
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    label: {
        marginRight: 10,
        paddingLeft: 10,
        alignSelf: 'center',
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        alignSelf: 'center',
    },
    input: {
        padding: 10,
    },
});
