import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ClientProfileScreen from "../screens/ClientProfileScreen";
import BankManagerTabNavigator from "./BankManagerTabNavigator";
import AccountScreen from "../screens/AccountScreen";
import TransactionDetailsScreen from "../screens/TransactionDetailsScreen";
import AddCreditCardScreen from "../screens/AddCreditCardScreen";
import NewAccountScreen from "../screens/NewAccountScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ClientTabNavigator from "./ClientTabNavigator";
import ChooseTransactionScreen from "../screens/ChooseTransactionScreen";
import NewTransactionScreen from "../screens/NewTransactionScreen";

const BM = createStackNavigator()

const BankManagerNavigator = () => {
    return(
        <BM.Navigator>

                <BM.Screen
                    options={{headerShown: false}}
                    name="BankManagerTabNavigation"
                    component={BankManagerTabNavigator}
                />

                <BM.Screen
                    name="NewTransaction"
                    component={NewTransactionScreen}
                />

                <BM.Screen
                    name="ChooseTransaction"
                    component={ChooseTransactionScreen}
                />

                <BM.Screen
                    name="Login"
                    component={LoginScreen}
                />
                
                <BM.Screen
                name="Register"
                component={RegisterScreen}
                /> 

                <BM.Screen
                    options={{headerShown: false}}
                    name="ClientTabNavigation"
                    component={ClientTabNavigator}
                />
                <BM.Screen
                    name="Account"
                    component={AccountScreen}
                />

                <BM.Screen
                    name="TransactionDetails"
                    component={TransactionDetailsScreen}
                />

                <BM.Screen
                    name="AddCreditCard"
                    component={AddCreditCardScreen}
                /> 

                <BM.Screen
                    name="ClientScreen"
                    component={ClientProfileScreen}
                />

                <BM.Screen
                    name="NewAccount"
                    component={NewAccountScreen}
                />      

            </BM.Navigator>
    )
}


const styles = StyleSheet.create({
    
})

export default BankManagerNavigator