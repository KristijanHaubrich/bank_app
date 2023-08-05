import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/SettingsScreen";
import LoggedClientProfileScreen from "../screens/LoggedClientProfileScreen";
import { focusedProfileIcon, focusedSettingIcon, profileIcon, settingIcon } from "../globalConstants";

const profile = "Profile"
const settings = "Settings"

const Tab = createBottomTabNavigator()

const ClientTabNavigator = () => {
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
                    component={LoggedClientProfileScreen}
                />
                <Tab.Screen
                    name={settings}
                    component={SettingsScreen}
                />



            </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    
})

export default ClientTabNavigator