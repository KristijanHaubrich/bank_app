import React, { useState } from "react";
import { Text,StyleSheet,View} from "react-native";
import LoadingScreen from "./LoadingScreen";
import { FlatList,TouchableOpacity } from "react-native-gesture-handler";
import {  useSelector } from "react-redux";
import { primaryColor } from "../globalConstants";
import ClientProfileHeaderComponent from "../components/ClientProfileHeaderComponent";
import ClientProfileListEmptyComponent from "../components/ClientProfileListEmptyComponent";
import ClientFooterComponent from "../components/ClientFooterComponent";

const LoggedClientProfileScreen = ({navigation}) =>{
    const [clientData, changeClientData] = useState(useSelector(state=>state.client.data))

    if(!clientData){
           return <LoadingScreen title="Client" />
    }else{
        return(
                <FlatList
                    ListHeaderComponent={<ClientProfileHeaderComponent
                         name = {clientData.name}
                         email = {clientData.email}
                         address = {clientData.address}
                         navigation= {navigation}
                        />}
                    ListFooterComponent={<ClientFooterComponent
                         clientEmail = {clientData.email}
                         changeClientData = {changeClientData}/>}    
                    ListEmptyComponent={<ClientProfileListEmptyComponent />}
                    vertical
                    showsVerticalScrollIndicator = {false}
                    data = {clientData.accounts}
                    keyExtractor= {(item) => item.accNum}
                    renderItem={({item}) => {
                        return(
                            <View style={styles.itemContainer}>
                            <View style={styles.clientsItem}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("Account",{accNum:item.accNum, clientEmail: clientData.email})
                                    }}>
                                    <Text style={styles.clientsText}>{item.accNum}</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        ); 
                    }}
               />
            
         )
    }

  
}

const styles = StyleSheet.create({
    clientsItem:{
    alignSelf:'center',
    margin:3,
    backgroundColor:'white',
    borderRadius: 10,
    borderColor:'black',
    width: '100%',
    },
    itemContainer:{
        margin: 5,
    },
      clientsText:{
        alignSelf:'center',
        fontSize: 20,
        margin: 10,
        color:primaryColor,
    },
})

export default LoggedClientProfileScreen