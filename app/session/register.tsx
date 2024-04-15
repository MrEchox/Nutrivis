import { StyleSheet, TextInput, Button, ScrollView, SafeAreaView, BackHandler } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
    return (
        <View style={styles.container}>
                <Text style={styles.title}>Registruotis</Text>
                <Text> </Text>
                <View style={styles.inputContainer}> 
                    <Text style={styles.label}>El. paštas:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Įveskite prisijungimo el. paštą"
                    />
                </View>
                <View style={styles.inputContainer}> 
                    <Text style={styles.label}>Slapyvardis:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Kaip jus vadinti"
                    />
                </View>
                <View style={styles.inputContainer}> 
                    <Text style={styles.label}>Slaptažodis:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Sugalvokite prisijungimo slaptažodį"
                    />
                </View>
                <View style={styles.inputContainer}> 
                    <Text style={styles.label}>Pakartokite slaptažodį:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Pakartokite prisijungimo slaptažodį"
                    />
                </View>
                <Button 
                    title="Registruotis"
                />
                <Text> </Text>
                <Text>Ęsate prisiregistravę?</Text>
                <Button 
                    title="Prisijungti"
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
