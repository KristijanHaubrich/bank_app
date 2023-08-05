import React, { useState } from "react";
import { Alert,FlatList,StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import checkTokenExpiration from "../utils/checkTokenExpiration";
import { useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import apiRequest from "../api/apiRequest";
import AccountHeaderComponent from "../components/AccountHeaderComponent";
import AccountFooterComponent from "../components/AccountFooterComponent";
import AccountEmptyListComponent from "../components/AccountEmptyListComponent";
import TranasactionItemComponent from "../components/TransactionItemComponent";
import createTwoButtonAlert from "../utils/createTwoButtonAlert";
import _ from "lodash";
import { primaryColor } from "../globalConstants";
import { View,Text } from "react-native";

const AccountScreen = ({route,navigation}) =>{
    const accNum = route.params?.accNum
    const clientEmail = route.params?.clientEmail
    const accessToken = useSelector(state=>state.token.accessToken)
    const [data,setData] = useState()
    const refreshToken = useSelector(state=>state.token.accessToken)
    const [creditCard,setCreditCard] = useState("")
    const [transactions,setTransactions] = useState()
    const [allTransactions,setAllTransactions] = useState() 
    
    useEffect(() => {
        const getData = async() => {
                const response = await apiRequest(accessToken).get(`/accounts/${accNum}`)
                if(response?.data){
                    if(response.data.isFound){
                        if(response.data.accountData.transactions.length !== 0){
                            if(_.first(response.data.accountData.transactions).id < _.last(response.data.accountData.transactions).id)
                                response.data.accountData.transactions.reverse()
                            setTransactions(response.data.accountData.transactions)
                            setAllTransactions(response.data.accountData.transactions)
                        }
                        if(response.data.accountData?.creditCard) setCreditCard(response.data.accountData.creditCard)
                            setData(response.data.accountData) 
                    }else{
                        setData("false")
                    }
                }else{
                    setData("false")
                }
        }  
        getData()
    },[])

    const addCreditCard = () => {
        navigation.navigate("AddCreditCard",{clientEmail: clientEmail, accountNum:data.accNum})
    }

    const chooseTransaction = () => {
        navigation.navigate("ChooseTransaction",{accNum: data.accNum, currency: data.currency})
    }

    const deleteAccount = async () => {
        const response = await apiRequest(accessToken).delete(`/accounts/${data.accNum}`)
        if(response.data.validation){
            createTwoButtonAlert("SUCCESS","Account successfully deleted")
            navigation.navigate("BankManagerTabNavigation")
        } else createTwoButtonAlert("ERROR","Deleting account failed")
    }

    const deleteBankAccount =  () => {
        if(checkTokenExpiration(refreshToken)){
            logout()
        }else{
            Alert.alert('DELETING ACCOUNT', 'Do you want to delete this account?', [
                {
                  text: 'Cancel',
                },
                {text: 'YES', onPress:() => {deleteAccount()} },
              ]);
        }
    }

    if(!data){
        return <LoadingScreen title = "Account" />
    }else if(data === "false"){
        return(
            <View style = {styles.container}>
                <Text style={styles.title}> Account no longer exists </Text>
            </View>
        )
    } else {
        return(
            <FlatList
               ListHeaderComponent={<AccountHeaderComponent
                   setTransactions = {setTransactions}
                   allTransactions = {allTransactions}
                   accNum = {data.accNum}
                   accType = {data.accType} 
                   balance = {data.balance} 
                   currency = {data.currency}
                   cardNum = {creditCard.cardNum}
                   cardLimit = {creditCard.cardLimit}
                   cardType = {creditCard.cardType}
                   addCreditCard={addCreditCard}
                   isCreditCard={creditCard !== ""}
               /> }
               ListFooterComponent={<AccountFooterComponent
                    addNewTransaction = {chooseTransaction}
                    deleteBankAccount = {deleteBankAccount}
                    navigation = {navigation}
                /> }
               ListEmptyComponent={<AccountEmptyListComponent /> }

               vertical
               showsVerticalScrollIndicator = {false}
               data = {transactions}
               keyExtractor= {(item) => item.id}
               renderItem={({item}) => {
                return(
                    <TranasactionItemComponent item={item} accNum={data.accNum} navigation = {navigation} />
                )
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
})


export default AccountScreen