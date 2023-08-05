import React from "react";
import { Text,StyleSheet,View} from "react-native";
import { useState,useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import { FlatList,TouchableOpacity } from "react-native-gesture-handler";
import { useSelector} from "react-redux";
import { primaryColor } from "../globalConstants";
import apiRequest from "../api/apiRequest";
import ClientProfileHeaderComponent from "../components/ClientProfileHeaderComponent";
import ClientProfileListEmptyComponent from "../components/ClientProfileListEmptyComponent";
import ClientFooterComponent from "../components/ClientFooterComponent";

const ClientProfileScreen = ({navigation,route}) =>{
    const clientEmail = route.params?.data
    const accessToken = useSelector(state=>state.token.accessToken)
    const [clientData,setClientsData] = useState(null)

   
    useEffect(() => {
        const getData = async() => {
                const response = await apiRequest(accessToken).get(`/clients/${clientEmail}`)
                if(response?.data){
                    if(response.data.isFound) setClientsData(response.data.clientData)
                    else{setClientsData("false")}
                }
                else{setClientsData("false")}
        }  
        getData()
    },[])

    if(clientData === null){
           return <LoadingScreen title="Client" />
    }else if(clientData === "false"){
        return(
            <View style = {styles.container}>
                <Text style={styles.title}> Client no longer exists </Text>
            </View>
        )
    }else{
        return(
                <FlatList
                    ListHeaderComponent={<ClientProfileHeaderComponent
                         name = {clientData.name}
                         email = {clientData.email}
                         address = {clientData.address}
                         navigation= {navigation}
                        />}
                    ListFooterComponent={<ClientFooterComponent clientEmail = {clientData.email} navigation = {navigation}/>}    
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
                                    navigation.navigate("Account",{accNum:item.accNum, clientEmail: clientEmail}
                                )}}>
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
    container: {
        flex: 1,
        justifyContent:"center",
        backgroundColor:"white"
    },title:{
        alignSelf:"center",
        color: primaryColor,
        fontSize:20
    },
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
    }
})

export default ClientProfileScreen

