import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ClientProfileScreen from "../screens/ClientProfileScreen";
import BankManagerTabNavigator from "./BankManagerTabNavigator";
import AccountScreen from "../screens/AccountScreen";
import TransactionDetailsScreen from "../screens/TransactionDetailsScreen";
import AddCreditCardScreen from "../screens/AddCreditCardScreen";
import NewAccountScreen from "../screens/NewAccountScreen";
import ClientTabNavigator from "./ClientTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ChooseTransactionScreen from "../screens/ChooseTransactionScreen";
import NewTransactionScreen from "../screens/NewTransactionScreen";

const Client = createStackNavigator()

const ClientNavigator = () => {
    return(
        <Client.Navigator>
                <Client.Screen
                    options={{headerShown: false}}
                    name="ClientTabNavigation"
                    component={ClientTabNavigator}
                />

                <Client.Screen
                    name="Login"
                    component={LoginScreen}
                />

                <Client.Screen
                    name="ChooseTransaction"
                    component={ChooseTransactionScreen}
                />

                <Client.Screen
                    name="NewTransaction"
                    component={NewTransactionScreen}
                />  
                
                <Client.Screen
                name="Register"
                component={RegisterScreen}
                /> 

                <Client.Screen
                    options={{headerShown: false}}
                    name="BankManagerTabNavigation"
                    component={BankManagerTabNavigator}
                />
                <Client.Screen
                    name="Account"
                    component={AccountScreen}
                />

                <Client.Screen
                    name="TransactionDetails"
                    component={TransactionDetailsScreen}
                />

                <Client.Screen
                    name="AddCreditCard"
                    component={AddCreditCardScreen}
                /> 

                <Client.Screen
                    name="ClientScreen"
                    component={ClientProfileScreen}
                />

                <Client.Screen
                    name="NewAccount"
                    component={NewAccountScreen}
                />      

        </Client.Navigator>
    )
}


const styles = StyleSheet.create({
    
})

export default ClientNavigator