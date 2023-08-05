import React,{useState} from "react";
import { Text,StyleSheet,ScrollView,TextInput,TouchableOpacity,Alert } from "react-native";
import {useSelector } from "react-redux";
import { primaryColor } from "../globalConstants";
import apiRequest from "../api/apiRequest";
import createTwoButtonAlert from "../utils/createTwoButtonAlert";

const AddCreditCardScreen = ({route,navigation}) =>{
    const clientEmail = route.params?.clientEmail
    const accountNum = route.params?.accountNum
    const accessToken = useSelector(state=>state.token.accessToken)

    const [creditCardNumber,setCreditCardNumber] = useState("");
    const [creditCardType,setCreditCardType] = useState("");
    const [creditCardLimit,setCreditCardLimit] = useState("");
    
    const askToProcced = () => {
        Alert.alert('APPROVE', 'Procced to create credit card?', [
            {
              text: 'Cancel',
            },
            {text: 'YES', onPress:() => {addCreditCard()} },
          ]);
       
    }

    const addCreditCard = async () => {
        
        if(creditCardNumber !== "" && creditCardType !== ""){
            const response = await apiRequest(accessToken).get(`/credit_cards/checkCreditCard/${creditCardNumber}`)
            if(!response.data.validation){
                if(isNaN(+`${creditCardLimit}`)){
                    createTwoButtonAlert("ERROR","Limit must be number")
                }else if(creditCardNumber.length !== 16 || isNaN(+`${creditCardNumber}`)){
                    createTwoButtonAlert("ERROR","Invalid card number")
                }else{
                    setCreditCardLimit("")
                    setCreditCardNumber("")
                    setCreditCardType("")
                    const body = {accountNum: accountNum,ccClientEmail: clientEmail,cardNum: creditCardNumber,cardType: creditCardType,limit:creditCardLimit}
                    const response = await apiRequest(accessToken).post("/credit_cards/",body)
                    if(response?.data){
                        if(response.data.validation){
                            createTwoButtonAlert("SUCCESS","Credit card created")
                            navigation.navigate("ClientScreen",{item:clientEmail})
                        }else{
                            createTwoButtonAlert("ERROR","Failed to create credit card")
                        }
                    }
                }
                
            }else{
                createTwoButtonAlert("ERROR","Credit card already exist")
            }
        }else{
            createTwoButtonAlert("ERROR","Fill all fields")
        }
    }

    return(
        <ScrollView>
             <Text style={styles.title}>
                    NEW CREDIT CARD
            </Text>
            <Text style={styles.sectionTitle}>ACCOUNT:</Text>
            <Text style={styles.info}>{accountNum}</Text>
            <Text style={styles.sectionTitle}>CLIENT EMAIL:</Text>
            <Text style={styles.info}> {clientEmail}</Text>
            

            <TextInput
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={setCreditCardNumber}
            placeholder="enter credit card number"
            selectionColor={primaryColor}
            cursorColor={primaryColor}
            value={creditCardNumber}
            />

            <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.input}
            onChangeText={setCreditCardType}
            cursorColor={'black'}
            placeholder="enter credit card type"
            value={creditCardType}
            />

            <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.input}
            onChangeText={setCreditCardLimit}
            cursorColor={'black'}
            keyboardType="numeric"
            placeholder="enter limit"
            value={creditCardLimit}
            />  

            <TouchableOpacity style = {styles.addButtonContainer} onPress={askToProcced}>
                        <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input:{
        height: 60,
        margin: 12,
        borderWidth: 2,
        fontSize: 20,
        borderColor: primaryColor,
        borderRadius: 10,
        padding: 10,
    },
    info:{
        fontSize: 20,
        marginBottom:10,
        alignSelf:'center',
        padding: 10,
        color:'black'
        },
    sectionTitle:{
    	fontSize:20,
        marginTop:10,
        marginLeft:8,
        color:primaryColor
   },
    title:{
        fontSize: 30,
        margin: 12,
        textAlign:"center",
        color:primaryColor,
        alignSelf:'center',
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
})

export default AddCreditCardScreen