import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BankManagerSettingsScreen from "../screens/SettingsScreen";
import BankManagerProfileScreen from "../screens/BankManagerProfileScreen";
import { focusedProfileIcon, focusedSettingIcon, profileIcon, settingIcon } from "../globalConstants";

const profile = "Profile"
const settings = "Settings"

const Tab = createBottomTabNavigator()

const BankManagerTabNavigator = () => {
    return(
            <Tab.Navigator
                initialRouteName={profile}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused}) => {
                        if(route.name === profile){
                            if(focused){
                                return focusedProfileIcon
                            }else return profileIcon
                        }else if(route.name === settings){
                           if(focused){
                                return focusedSettingIcon
                           }else return settingIcon
                        }
                    },     
                })}
            >
                <Tab.Screen
                    name={profile}
                    component={BankManagerProfileScreen}
                />
                <Tab.Screen
                    name={settings}
                    component={BankManagerSettingsScreen}
                />
            </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    
})

export default BankManagerTabNavigator