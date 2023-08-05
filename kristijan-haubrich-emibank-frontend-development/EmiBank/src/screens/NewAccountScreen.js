import React from "react";
import { useState,useEffect } from "react";
import { Text,StyleSheet,ScrollView,TextInput,TouchableOpacity,Alert } from "react-native";
import { useSelector } from "react-redux";
import { primaryColor } from "../globalConstants";
import apiRequest from "../api/apiRequest";
import createTwoButtonAlert from "../utils/createTwoButtonAlert";
import LoadingScreen from "./LoadingScreen";
import { View } from "react-native";
import currencyRequest from "../api/currencyRequest";
import { Dropdown } from "react-native-element-dropdown";
import _ from "lodash";


const NewAccountScreen = ({route,navigation}) =>{
    const clientEmail = route.params?.clientEmail
    const clientName = route.params?.clientName
    const accessToken = useSelector(state=>state.token.accessToken)
    const [currencyData,setCurrencyData] = useState()
    const [accNum,setAccNum] = useState("")
    const [accType,setAccType] = useState("")
    const [balance,setBalance] = useState("")
    const [currency,setCurrency] = useState("")

    useEffect(() => {
        const getData = async() => {
            const response = await currencyRequest()
            if(response.data){
                setCurrencyData(Object.keys(response.data.symbols).map((item)=>{
                    return ({symbol: item, name: _.get(response.data.symbols,`${item}`)})
               })) 
            }
        }  
        getData()
    },[])

    const checkCurrencySymbol = () => {
        const symbols = currencyData.map((item) => item.symbol)

        return symbols.includes(currency)
    }

    const askToProcced = () => {
        Alert.alert('APPROVE', 'Procced to create account?', [
            {
              text: 'Cancel',
            },
            {text: 'YES', onPress:() => {addAcc()} },
          ]);
       
    }

    const validNumberOfDecimals = ()=> {
        if(balance.toString().includes(".")){
            return balance.toString().split('.')[1].length <= 2
        }
        return true
    }

    const addAcc = async() => {
        if(accNum !== "" && accType !== "" && balance !== "" && currency !== "" && clientEmail !== undefined){
            const existResponse = await apiRequest(accessToken).get(`/accounts/checkAccount/${accNum}`)
            if(existResponse.data.validation){
                createTwoButtonAlert("ERROR","Account already exist")
            }else if(accNum.length !== 15 || !accNum.startsWith("HR")){
                createTwoButtonAlert("ERROR","Invalid account number")
            }
            else if(isNaN(+`${balance}`) || !validNumberOfDecimals()){
                createTwoButtonAlert("ERROR","Invalid balance")    
            }else if(!checkCurrencySymbol()){
                createTwoButtonAlert("ERROR","Currency doesn't exist") 
            }else{   
                setAccNum("")
                setAccType("")
                setBalance("")
                setCurrency("")
                const response = await apiRequest(accessToken).post("/accounts/",{accNum: accNum, accType: accType, balance: balance, currency: currency, clientEmail: clientEmail })
                if(response?.data){
                    if(response.data.validation){
                        createTwoButtonAlert("SUCCESS","Account created")  
                        navigation.navigate("BankManagerTabNavigation")
                    }
                }
            }
        }else{
            createTwoButtonAlert("ERROR","Fill all fields")     
        }
    }

    const _renderItem = (item) => {
        return(
            <View>
                <Text style={styles.input}> {item.symbol} {item.name}</Text>
            </View>
        )
    }

    if(!currencyData) return(<LoadingScreen title = "New account" />)
    else{
        return(
            <ScrollView>
                        <Text
                            style={styles.title}
                        >
                            CREATE ACCOUNT FOR {clientName.toUpperCase()}
                        </Text>
        
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={setAccNum}
                            placeholder="enter account number"
                            selectionColor={primaryColor}
                            cursorColor={primaryColor}
                            value={accNum}
                        />
        
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={setAccType}
                            placeholder="enter account type"
                            selectionColor={primaryColor}
                            cursorColor={primaryColor}
                            value={accType}
                        />
        
                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType="numeric"
                            style={styles.input}
                            onChangeText={setBalance}
                            cursorColor={'black'}
                            placeholder="enter balance"
                            value={balance}
                        />
    
                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={styles.input}
                            onChangeText={setCurrency}
                            cursorColor={'black'}
                            placeholder="enter currency"
                            value={currency}
                        />
    
                        <Dropdown
                            style={styles.input}
                            containerStyle={styles.currencies}
                            data={currencyData}
                            label="CURRENCY"
                            placeholder="AVAILABLE CURRENCIES"
                            value={currency}
                            onChange={item => {
                                setCurrency(item.symbol);
                            }}
                            renderItem={item => _renderItem(item)}
                            textError="Error"
                        />
         
                        <TouchableOpacity
                            style={styles.addButtonContainer}
                            onPress={askToProcced}
                        > 
                            <Text
                                style={styles.addButtonText}
                            >Create Account</Text>
                        </TouchableOpacity>
                         
                    </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        margin: 12,
        borderWidth: 2,
        fontSize: 20,
        borderColor: primaryColor,
        borderRadius: 10,
        padding: 10,
    },

    title:{
        fontSize: 25,
        margin: 12,
        color:primaryColor,
        alignSelf:'center',
        textAlign:"center",
        padding: 10,
    },

    addButtonContainer:{
        backgroundColor:primaryColor,
        borderColor:'white',
        margin: 20,
        borderWidth: 2,
        borderRadius:10,
        alignSelf:'center',
        padding: 10,
    },
    addButtonText:{
        color:'white',
        fontSize: 20,
        margin:6
    },
    currencies:{
        margin:12,
        padding: 10
    }
})

export default NewAccountScreen
