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
            <Text style={[styles.title, themeTextStyle]}>Lorem?</Text>

           <Text style={[styles.text,themeTextStyle]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum nulla a nibh feugiat facilisis. Suspendisse a metus a mi dapibus tristique. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sodales mauris id condimentum molestie. Phasellus quis eleifend arcu, eu eleifend justo. 
            Sed sapien velit, laoreet vel porta at, finibus ac mi. Integer laoreet ipsum a lacus facilisis fermentum. 
            Fusce et erat commodo, aliquam risus eget, fermentum enim. Nulla iaculis orci vel dignissim consectetur. 
            Donec auctor tempor ligula in ultricies. Praesent vestibulum condimentum porta. Proin consequat eros lorem.
            </Text>

           <Text style={[styles.text,themeTextStyle]}>
            Ut nec orci placerat, congue orci quis, interdum dui. In a vestibulum arcu. Aenean erat dui, placerat sed ipsum quis, condimentum congue eros. 
            Cras porttitor venenatis neque id consequat. Duis a pulvinar diam. Sed nec arcu ipsum. Pellentesque at laoreet ipsum. Nam rhoncus quam ut est maximus, 
            ut efficitur mauris lobortis. Curabitur eget euismod velit, a viverra lorem. Donec viverra mi id quam pellentesque pretium. 
            Etiam leo massa, auctor vel ultricies vel, porta id nibh. Ut eu elementum ipsum. Etiam sagittis turpis eu tristique mollis.
            </Text>

            <Text style={[styles.title, themeTextStyle]}>Ipsum?</Text>

           <Text style={[styles.text,themeTextStyle]}>
            Ut varius nisl et tempor convallis. Nunc lobortis quam vel tortor tincidunt molestie. Duis eu eleifend massa. 
            Cras libero nunc, euismod sit amet diam et, dapibus auctor lectus. Donec congue sapien nisi, tempor auctor purus consectetur vel. 
            Morbi sit amet gravida velit, quis maximus nisi. Quisque eu porta leo. In ut odio tempus, ultrices nulla et, tempor nunc. 
            Fusce egestas ultrices fringilla. Vestibulum mattis, nulla sed porta tincidunt, sem purus faucibus diam, nec fermentum neque sapien at eros. 
            Proin eget purus non leo tempor finibus.
            </Text>

           <Text style={[styles.text,themeTextStyle]}>
            Cras eros dolor, finibus non sodales ut, accumsan non orci. Etiam venenatis molestie tristique. 
            Suspendisse dapibus nulla id bibendum vestibulum. Donec sed vestibulum sapien. Duis ullamcorper vestibulum massa ut tempor. 
            Nam libero nisi, tincidunt eget lorem euismod, ornare iaculis eros. Sed blandit massa ac tellus auctor mollis. 
            In pretium, leo quis accumsan euismod, tortor mi pharetra erat, ac rutrum massa purus non est. Quisque pulvinar lobortis risus, ac molestie elit tempor elementum.
            </Text>

            <Text style={[styles.title, themeTextStyle]}>Dolor sit amet?</Text>

           <Text style={[styles.text,themeTextStyle]}>
            Ut eleifend odio felis, eu efficitur turpis vehicula sed. Quisque vulputate, lorem et ultrices hendrerit, magna ante venenatis orci, 
            vel mattis nisi sapien nec enim. Etiam justo purus, dignissim eu leo sed, congue dictum neque. Nam aliquet turpis vel sapien vulputate fringilla. 
            Sed ut augue arcu. Morbi in elit at urna porta tristique. Maecenas quis fermentum diam. Aliquam eu tincidunt ipsum, sit amet vehicula lacus. 
            Nunc pellentesque vehicula porttitor. Donec bibendum mi turpis, facilisis molestie nisl imperdiet eu. Pellentesque non auctor lacus. 
            Etiam pretium facilisis bibendum. Praesent vel massa a ante ornare iaculis at vel ipsum.
            </Text>

            <Text style={styles.refference}>Šaltinis:{'\n'}lipsum.com</Text>
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


