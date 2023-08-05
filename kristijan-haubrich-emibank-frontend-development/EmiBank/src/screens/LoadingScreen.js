import React from "react";
import { Text,StyleSheet,View } from "react-native";
import { primaryColor } from "../globalConstants";

const LoadingScreen = ({title}) =>{
    return(
        <View style = {styles.container}>
            <Text style={styles.title}> {title} </Text>
            <Text style={styles.loading}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        backgroundColor:"white"
    },
    loading:{
        alignSelf:"center",
        color: primaryColor,
        fontSize:20
        
    },
    title:{
        alignSelf:"center",
        fontSize:25,
        color:"black",
        margin: 20
    }

})

export default LoadingScreen