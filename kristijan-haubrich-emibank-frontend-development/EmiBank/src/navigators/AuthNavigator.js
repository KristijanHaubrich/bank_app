import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen"
import ClientTabNavigator from "./ClientTabNavigator";
import AccountScreen from "../screens/AccountScreen";
import TransactionDetailsScreen from "../screens/TransactionDetailsScreen";
import AddCreditCardScreen from "../screens/AddCreditCardScreen";
import ClientProfileScreen from "../screens/ClientProfileScreen";
import NewAccountScreen from "../screens/NewAccountScreen";
import BankManagerTabNavigator
 from "./BankManagerTabNavigator";
import ChooseTransactionScreen from "../screens/ChooseTransactionScreen";
import NewTransactionScreen from "../screens/NewTransactionScreen";
const Auth = createStackNavigator()

const AuthNavigator = () => {
        return (
            <Auth.Navigator>

                <Auth.Screen
                    name="Login"
                    component={LoginScreen}
                />
                <Auth.Screen
                    name="NewTransaction"
                    component={NewTransactionScreen}
                />
                <Auth.Screen
                    name="ChooseTransaction"
                    component={ChooseTransactionScreen}
                />

                <Auth.Screen
                name="Register"
                component={RegisterScreen}
                /> 

                <Auth.Screen
                    options={{headerShown: false}}
                    name="ClientTabNavigation"
                    component={ClientTabNavigator}
                />

                <Auth.Screen
                    options={{headerShown: false}}
                    name="BankManagerTabNavigation"
                    component={BankManagerTabNavigator}
                />
                <Auth.Screen
                    name="Account"
                    component={AccountScreen}
                />

                <Auth.Screen
                    name="TransactionDetails"
                    component={TransactionDetailsScreen}
                />

                <Auth.Screen
                    name="AddCreditCard"
                    component={AddCreditCardScreen}
                /> 

                <Auth.Screen
                    name="ClientScreen"
                    component={ClientProfileScreen}
                />

                <Auth.Screen
                    name="NewAccount"
                    component={NewAccountScreen}
                />      

            </Auth.Navigator>
        ) 
}

export default AuthNavigator