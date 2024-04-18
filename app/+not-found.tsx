import { Link } from 'expo-router';
import { StyleSheet, useColorScheme, Image} from 'react-native';

import { Text, View } from '@/components/Themed';
import { commonStyles } from '../components/commonStyles';

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const themeBackground = colorScheme === 'light' ? commonStyles.lightBackground : commonStyles.darkBackground;
  const themeContainer = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
  const themeTextStyle = colorScheme === 'light' ? commonStyles.lightThemeText : commonStyles.darkThemeText;
  const themeSvg = colorScheme === 'light' ? '#ffffff' : '#003049';
  return (
    <View style={[themeBackground, styles.container]}>
      <View style={[commonStyles.mainStatsContainer, themeContainer, styles.contentContainer]}>
        <Text style={[styles.title, themeTextStyle]}>Šis puslapis neegzistuoja.</Text>
        <Image 
            source={require('../assets/images/nutrivis_hmm.png')}
            style={[{width:150, height:167, marginBottom:20}]}
          />
        <Link href="/">
          <Text style={themeTextStyle}>Grįžti atgal!</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    marginRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    fontWeight: "500",
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
    borderWidth: 1,
    borderRadius: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '',
  },
});
