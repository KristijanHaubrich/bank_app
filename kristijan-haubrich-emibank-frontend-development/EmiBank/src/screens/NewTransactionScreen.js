import { StyleSheet,Text,ScrollView,TextInput,View,TouchableOpacity,Alert } from "react-native"
import { primaryColor } from "../globalConstants"
import { useState } from "react"
import { useSelector } from "react-redux"
import apiRequest from "../api/apiRequest"
import createTwoButtonAlert from "../utils/createTwoButtonAlert"
import currencyRequest from "../api/currencyRequest"
import { Dropdown } from "react-native-element-dropdown"
import { useEffect } from "react"
import _ from "lodash";

const NewTransactionScreen = ({route,navigation}) =>{
    const isBankManager = useSelector(state=>state.userType.isBankManager)
    const accessToken = useSelector(state => state.token.accessToken)

    const [currencyData,setCurrencyData] = useState()
    const transactionType = route.params?.transactionType
    const fromAccNum = route.params?.accNum
    const accCurrency = route.params?.currency
    const[toAccNum,setToAccNum] = useState("") 
    const[currency,setCurrency] = useState("")
    const[amount,setAmount] = useState()

    useEffect(() => {
        const getData = async() => {
            if(transactionType === "deposit"){
                const response = await currencyRequest()
                if(response.data){
                    setCurrencyData(Object.keys(response.data.symbols).map((item)=>{
                        return ({symbol: item, name: _.get(response.data.symbols,`${item}`)})
                   })) 
                }
            }
        }  
        getData()
    },[])

    const _renderCurrencyItem = (item) => {
        return(
            <View>
                <Text style={styles.currencyInput}> {item.symbol} {item.name}</Text>
            </View>
        )
    }

    const checkCurrencySymbol = () => {
        const symbols = currencyData.map((item) => item.symbol)

        return symbols.includes(currency)
    }

    const doTransaction = async () => {
        if(transactionType === "deposit"){
            if(toAccNum.length !== 15 || !toAccNum.startsWith("HR") || toAccNum === fromAccNum){
                createTwoButtonAlert("ERROR","Invalid account number")
            }else if(isNaN(+`${amount}`) || amount <= 0){
                createTwoButtonAlert("ERROR","Invalid amount")
            }else if(!checkCurrencySymbol()){
                createTwoButtonAlert("ERROR","Currency doesn't exist")
            }else{
                const response = await apiRequest(accessToken).post("/transactions/executeBetweenAccountsTransaction",{
                    fromAccNum: fromAccNum,
                    toAccNum: toAccNum,
                    transactionType: transactionType,
                    amount: amount,
                    currency: currency
                })

                setAmount("")
                setCurrency("")
                setToAccNum("")

                if(response.data.validation){
                    createTwoButtonAlert("SUCCESS","Transaction successfull")
                    if(isBankManager) navigation.navigate("BankManagerTabNavigation")
                    else{
                        navigation.navigate("ClientTabNavigation")
                    } 
                }else{
                    createTwoButtonAlert("ERROR","Transaction failed")
                }
            }
        }else if(transactionType === "top up balance"){
            if(isNaN(+`${amount}`) || amount <= 0){
                createTwoButtonAlert("ERROR","Invalid amount")
            }else{
                const response = await apiRequest(accessToken).post("/transactions/executeInternalAccountTransaction",{
                    fromAccNum: "null",
                    toAccNum: route.params?.accNum,
                    transactionType: transactionType,
                    amount: amount,
                    currency: accCurrency
                })

                setAmount("")

                if(response.data.validation){
                    createTwoButtonAlert("SUCCESS","Transaction successfull")
                    navigation.navigate("BankManagerTabNavigation")
                }else{
                    createTwoButtonAlert("ERROR","Transaction failed")
                }
            }
        }else{
            if(isNaN(+`${amount}`) || amount <= 0){
                createTwoButtonAlert("ERROR","Invalid amount")
            }else{
                const response = await apiRequest(accessToken).post("/transactions/executeInternalAccountTransaction",{
                    fromAccNum: "null",
                    toAccNum: route.params?.accNum,
                    transactionType: transactionType,
                    amount: amount,
                    currency: accCurrency
                })

                setAmount("")
                
                if(response.data.validation){
                    createTwoButtonAlert("SUCCESS","Transaction successfull")
                    if(isBankManager) navigation.navigate("BankManagerTabNavigation")
                    else navigation.navigate("ClientTabNavigation")
                }else{
                    createTwoButtonAlert("ERROR","Transaction failed")
                }
            }
        }
    }

    const askForProceedingTransaction = () => {
        Alert.alert('APPROVE', 'Procced to execute transaction?', [
            {
              text: 'Cancel',
            },
            {text: 'YES', onPress:() => {doTransaction()} },
          ]);
       
    }

    if(transactionType === "withdrawal"){
        return (
            <ScrollView>
           <Text style={styles.accountNameBanner}>New Transaction</Text>
            <Text style={styles.sectionTitle}>TRANSACTION TYPE:</Text>
            <Text style={styles.info}>{transactionType.toUpperCase()}</Text>
            <Text style={styles.sectionTitle}>FROM:</Text>
            <Text style={styles.info}>{fromAccNum}</Text>
            <Text style={styles.sectionTitle}>AMOUNT:</Text>
            <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholder="amount"
                    selectionColor={primaryColor}
                    cursorColor={primaryColor}
                    value={amount}
            />
             <Text style={styles.sectionTitle}>CURRENCY:</Text>
            <Text style = {styles.info}>{accCurrency}</Text>
            <TouchableOpacity
                    onPress={ askForProceedingTransaction }
                    style={styles.addButtonContainer}
                >
                    <Text
                        style={styles.addButtonText}
                    >Execute Transaction</Text>
                </TouchableOpacity>


        </ScrollView>
        )
    } else if(transactionType === "top up balance"){
        return (
            <ScrollView>
            <Text style={styles.accountNameBanner}>New Transaction</Text>
            <Text style={styles.sectionTitle}>TRANSACTION TYPE:</Text>
            <Text style={styles.info}>{transactionType.toUpperCase()}</Text>
            <Text style={styles.sectionTitle}>TO:</Text>
            <Text style={styles.info}>{fromAccNum}</Text>
            <Text style={styles.sectionTitle}>AMOUNT:</Text>
            <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholder="amount"
                    selectionColor={primaryColor}
                    cursorColor={primaryColor}
                    value={amount}
            />
             <Text style={styles.sectionTitle}>CURRENCY:</Text>
            <Text style = {styles.info}>{accCurrency}</Text>
            <TouchableOpacity
                    onPress={ askForProceedingTransaction }
                    style={styles.addButtonContainer}
                >
                    <Text
                        style={styles.addButtonText}
                    >Execute Transaction</Text>
                </TouchableOpacity>


        </ScrollView>
        )
           
    }else if(transactionType === "deposit" && currencyData){
        return(
            <ScrollView>
            <Text style={styles.accountNameBanner}>New Transaction</Text>
            <Text style={styles.sectionTitle}>TRANSACTION TYPE:</Text>
            <Text style={styles.info}>{transactionType.toUpperCase()}</Text>
            <Text style={styles.sectionTitle}>FROM:</Text>
            <Text style={styles.info}>{fromAccNum}</Text>
            <Text style={styles.sectionTitle}>TO:</Text>
            <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={setToAccNum}
                    placeholder="account number"
                    selectionColor={primaryColor}
                    cursorColor={primaryColor}
                    value={toAccNum}
            />
            
            <Text style={styles.sectionTitle}>AMOUNT:</Text>
            <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={setAmount}
                    placeholder="amount"
                    keyboardType="numeric"
                    selectionColor={primaryColor}
                    cursorColor={primaryColor}
                    value={amount}
            />
             <Text style={styles.sectionTitle}>CURRENCY:</Text>
            
            
            <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={setCurrency}
                    placeholder="currency"
                    selectionColor={primaryColor}
                    cursorColor={primaryColor}
                    value={currency}
            />
            <Dropdown
                            style={styles.currencyInput}
                            containerStyle={styles.currencies}
                            data={currencyData}
                            label="CURRENCY"
                            placeholder="AVAILABLE CURRENCIES"
                            value={currency}
                            onChange={item => {
                                setCurrency(item.symbol)}}
                            renderItem={_renderCurrencyItem}
                            textError="Error"
                        />

            <TouchableOpacity
                    onPress={ askForProceedingTransaction }
                    style={styles.addButtonContainer}
                >
                    <Text
                        style={styles.addButtonText}
                    >Execute Transaction</Text>
                </TouchableOpacity>


        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    accountNameBanner:{
        fontSize: 30,
        margin: 5,
        textTransform: 'uppercase',
        alignSelf:'center',
        padding: 5,
        color:'black'
    },
    currencies:{
        margin:12,
        padding: 10,
        height: 350
    },
    currencyInput:{
        margin: 12,
        borderWidth: 2,
        fontSize: 20,
        borderColor: primaryColor,
        borderRadius: 10,
        padding: 10,
    },
    input:{
        height: 60,
        margin: 12,
        borderWidth: 2,
        fontSize: 20,
        borderColor: primaryColor,
        borderRadius: 10,
        padding: 10,
    },
    sectionTitle:{
    	fontSize:20,
        marginTop:10,
        marginLeft:8,
        color:primaryColor
    },
    info:{
        fontSize: 20,
        marginBottom:10,
        alignSelf:'center',
        padding: 10,
        color:'black'
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
})

export default NewTransactionScreen