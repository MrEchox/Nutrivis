import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    lightBackground:{
      backgroundColor: '#ffffff',
    },
    darkBackground:{
      backgroundColor: '#2b2d31',
    },
    mainStatsContainer: {
        width: '90%',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    lightContainer:{
      backgroundColor: "#70b577"
    },
    darkContainer:{
      backgroundColor: '#70b577',
    },
    lightThemeText:{
      color: "#000000",
      borderColor: '#003049'
    },
    darkThemeText:{
      color: "#ffffff",
      borderColor: "white",
    },
    lightProgress:{
      backgroundColor: "#ffffff",
      height: 10,
      width: 100,
    },
    darkProgress:{
      backgroundColor: "#ffffff",
      height: 10,
      width: 100,
    },

});
