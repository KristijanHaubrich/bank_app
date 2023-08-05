import React from "react";
import { Text,StyleSheet,View,TouchableOpacity } from "react-native";
import { primaryColor } from "../globalConstants";
import { useSelector } from "react-redux";
import LoadingScreen from "./LoadingScreen";

const ChooseTransactionScreen = ({route,navigation}) =>{
    const isBankManager = useSelector(state=>state.userType.isBankManager)
    const fromAccNum = route.params?.accNum
    const accCurrency = route.params?.currency

    if(isBankManager === undefined){
        <LoadingScreen title = "Choose Transaction" />
    }else if(isBankManager){
        return (
            <View style = {styles.container}>
                <TouchableOpacity
                style={styles.buttonContainer}
                onPress={ () => {navigation.navigate("NewTransaction",{transactionType: "withdrawal",accNum: fromAccNum, currency: accCurrency})}}
                >
                <Text style={styles.buttonText}>Withdrawal</Text>
                </TouchableOpacity>   
                <TouchableOpacity
                style={styles.buttonContainer}
                onPress={ () => {navigation.navigate("NewTransaction",{transactionType: "top up balance",accNum: fromAccNum, currency: accCurrency})}}
                >
                <Text style={styles.buttonText}>Top up balance</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.buttonContainer}
                onPress={ () => {navigation.navigate("NewTransaction",{transactionType: "deposit",accNum: fromAccNum, currency: accCurrency})}}
            >
                <Text style={styles.buttonText}>Payment to another account</Text>
            </TouchableOpacity>      
            </View>   
        )
    }else if(!isBankManager){
        return(
            <View style = {styles.container}>
            <TouchableOpacity
            style={styles.buttonContainer}
            onPress={ () => {navigation.navigate("NewTransaction",{transactionType: "withdrawal",accNum: fromAccNum, currency: accCurrency})}}
            >
            <Text style={styles.buttonText}>Withdrawal</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.buttonContainer}
            onPress={ () => {navigation.navigate("NewTransaction",{transactionType: "deposit",accNum: fromAccNum, currency: accCurrency})}}
            >
            <Text style={styles.buttonText}>Payment to another account</Text>
            </TouchableOpacity>
        </View>    
        )
    }
    
}

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor:'white',
        borderColor:primaryColor,
        margin: 20,
        borderWidth: 2,
        borderRadius:10,
        alignSelf:'center',
        padding: 10,
    },
    buttonText:{
        color:primaryColor,
        fontSize: 20,
        margin:6
    },
    container:{
        flex: 1,
        justifyContent:"center",
        backgroundColor:"white"
    }
})

export default ChooseTransactionScreen