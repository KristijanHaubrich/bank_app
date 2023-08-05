import {View,Text,StyleSheet,TouchableOpacity,FlatList,ScrollView,Alert} from "react-native";
import { BackHandler } from "react-native";
import LoadingScreen from "./LoadingScreen";
import { useSelector } from "react-redux";
import { primaryColor } from "../globalConstants";
import BankManagerProfileHeaderComponent from "../components/BankManagerProfileHeaderComponent";
import BankManagerProfileFooterComponent from "../components/BankManagerProfileFooterComponent";
import BankManagerProfileListEmptyComponent from "../components/BankManagerProfileListEmptyComponent";
import { useState } from "react";

const BankManagerProfileScreen = ({navigation}) => {

    const accessToken = useSelector(state=>state.token.accessToken)
    const [data,changeData] = useState(useSelector(state=>state.bankManager.data))
    const [allClients,setAllClients] = useState(data.clients)
    const [clients,setClients] = useState(data.clients)
    const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        null, 
      );

    backHandler.remove();

    if(data === undefined){
        return(
            <LoadingScreen title="Bank Manager" />
        )
    }else{
        return(
               <FlatList
                    style = {styles.container}
                    ListHeaderComponent={<BankManagerProfileHeaderComponent
                     name = {data.name}
                     setClients = {setClients}
                     allClients = {allClients}/>}
                    ListFooterComponent={<BankManagerProfileFooterComponent
                         email = {data.email}
                         setAllClients = {setAllClients}
                         changeData = {changeData}
                         accessToken = {accessToken}
                         />}
                    ListEmptyComponent={<BankManagerProfileListEmptyComponent />}
                    vertical
                    showsVerticalScrollIndicator = {false}
                    data = {clients}
                    keyExtractor= {(item) => item}
                    renderItem={({item}) => {
                        return(
                            <View style={styles.itemContainer}>
                            <View style={styles.clientsItem}>
                                <TouchableOpacity onPress={() => {navigation.navigate("ClientScreen", {data:item} )}}>
                                    <Text style={styles.clientsText}>{item}</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        ); 
                    }}
               />
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:primaryColor,
        flex: 1
    },
    clientsItem:{
        alignSelf:'center',
        margin:3,
        backgroundColor:'white',
        borderRadius: 10,
        borderColor:'black',
        width: '100%',
    },
    clientsText:{
        alignSelf:'center',
        fontSize: 20,
        margin: 10,
        color:primaryColor,
    },
    itemContainer:{
        margin: 5,
    },
});

export default BankManagerProfileScreen;