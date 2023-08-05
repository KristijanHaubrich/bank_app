import React,{useState} from "react";
import { StyleSheet,Text,TextInput,TouchableOpacity,SafeAreaView,ScrollView } from "react-native";
import CheckBox from 'expo-checkbox';
import { primaryColor } from "../globalConstants";
import apiRequest from "../api/apiRequest";
import createTwoButtonAlert from "../utils/createTwoButtonAlert"; 
import validateEmailInput from "../utils/validateEmailInput";

const RegisterScreen = ({navigation}) => {
    const [isBankManager,setIsBankManager] = useState(false);
    const [emailInput,setEmailInput] = useState("");
    const [passwordInput,setPasswordInput] = useState("");
    const [nameInput,setNameInput] = useState("");
    const [addressInput,setAddressInput] = useState("");
    const [bankManagerEmailInput,setBankManagerEmailInput]= useState("");
    
    const registerBankManager = async () => { 
        
        if(emailInput !== "" && passwordInput !== "" && nameInput !== ""){
            
                if(!validateEmailInput(emailInput)){
                    createTwoButtonAlert("ERROR","Invalid email");
                }
                else if(passwordInput.length < 3){
                    createTwoButtonAlert("ERROR","Short Password");
                }else{
                    setEmailInput("")
                    setPasswordInput("")
                    setNameInput("")
                    const body = {
                        name: nameInput,
                        email: emailInput,
                        password: passwordInput,
                        bankManagerRole: "ROLE_BANK_MANAGER"};
                    const response = await apiRequest("").post("/public/register/bankManager",body);

                    if(response?.data){
                        if(response.data.isSuccess){
                            createTwoButtonAlert("SUCCESS", "Bank manager is successfully registered")
                            navigation.navigate("Login")
                        }else if(response.data.bankManagerAlreadyExist){
                            createTwoButtonAlert("ERROR", "Bank manager already exists")
                        }else{
                            createTwoButtonAlert("ERROR", "Client fail to register")
                        }
                    }
                }
        }else{
            createTwoButtonAlert("ERROR","Fill all fields");
        }
    };

    const registerClient = async () => { 
        if(emailInput !== "" && passwordInput !== "" && nameInput !== "" && bankManagerEmailInput !== "" && addressInput !== ""){
                if(!validateEmailInput(emailInput)){
                    createTwoButtonAlert("ERROR","Invalid email");
                }else if(passwordInput.length < 3){
                    createTwoButtonAlert("ERROR","Short password");
                }else{
                    setEmailInput("")
                    setPasswordInput("")
                    setNameInput("")
                    setAddressInput("")
                    setBankManagerEmailInput("")
                    const body = {
                        name: nameInput,
                        email: emailInput,
                        password: passwordInput,
                        address: addressInput,
                        bankManagerEmail: bankManagerEmailInput};
                    const response = await apiRequest("").post("/public/register/client",body);

                    if(response?.data){
                        if(response.data.isSuccess){
                            createTwoButtonAlert("SUCCESS", "Client is successfully registered")
                            navigation.navigate("Login")
                        }else{
                            if(response.data.clientAlreadyExists){
                                createTwoButtonAlert("ERROR", "Client already exists")
                            }else if(!response.data.bankManagerExists){
                                createTwoButtonAlert("ERROR", "Bank manager doesn't exist")
                            }else{
                                createTwoButtonAlert("ERROR", "Client fail to register")
                            } 
                        } 
                    }
                }
        }else{
            createTwoButtonAlert("ERROR","Fill all fields");
        }
    };

    if(isBankManager){
        return(
            <ScrollView>
                <SafeAreaView>
                    <Text
                        style={styles.loginTitle}
                    >
                        REGISTER BANK MANAGER
                    </Text>
                    
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={setNameInput}
                        placeholder="enter name"
                        selectionColor={primaryColor}
                        cursorColor={primaryColor}
                        value={nameInput}
                    />
    
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={setEmailInput}
                        placeholder="enter email"
                        selectionColor={primaryColor}
                        cursorColor={primaryColor}
                        value={emailInput}
                    />
    
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={setPasswordInput}
                        secureTextEntry={true}
                        cursorColor={'black'}
                        placeholder="enter password"
                        value={passwordInput}
                    />
     
                    <TouchableOpacity
                        style={styles.loginButtonContainer}
                        onPress={registerBankManager}
                    > 
                        <Text
                            style={styles.loginButtonText}
                        >Register</Text>
                    </TouchableOpacity>
    
                    <Text style = {styles.checkBoxTitle}>Are you new Bank Manager?</Text>
                    <CheckBox 
                        style={styles.checkBox}
                        value={isBankManager}
                        onValueChange={setIsBankManager}
                    />
    
                     
                </SafeAreaView>
            </ScrollView>
        );
    }else{
        return(
            <ScrollView>
                <SafeAreaView>
                    <Text
                        style={styles.loginTitle}
                    >
                        REGISTER CLIENT
                    </Text>
    
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={setNameInput}
                        placeholder="enter name"
                        selectionColor={primaryColor}
                        cursorColor={primaryColor}
                        value={nameInput}
                    />
    
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={setEmailInput}
                        placeholder="enter email"
                        selectionColor={primaryColor}
                        cursorColor={primaryColor}
                        value={emailInput}
                    />
    
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={setPasswordInput}
                        secureTextEntry={true}
                        cursorColor={'black'}
                        placeholder="enter password"
                        value={passwordInput}
                    />

                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={setAddressInput}
                        cursorColor={'black'}
                        placeholder="enter home address"
                        value={addressInput}
                    />

                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={setBankManagerEmailInput}
                        cursorColor={'black'}
                        placeholder="enter bank manager email"
                        value={bankManagerEmailInput}
                    />

                    
     
                    <TouchableOpacity
                        style={styles.loginButtonContainer}
                        onPress={ registerClient }
                    >
                        <Text
                            style={styles.loginButtonText}
                        >Register</Text>
                    </TouchableOpacity>
    
                    <Text style = {styles.checkBoxTitle}>Are you new Bank Manager?</Text>
                    <CheckBox 
                        style={styles.checkBox}
                        value={isBankManager}
                        onValueChange={setIsBankManager}
                    />             
                </SafeAreaView>
            </ScrollView>
        );
    }

    
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

    checkBoxTitle:{
        fontSize: 15,
        marginLeft: 5,
        marginTop:5,
        color:primaryColor,
        alignSelf:'center',
        padding: 10,
    },

    checkBox:{
        height: 10,
        width:10,
        alignSelf:'center',
        padding: 10,
        borderColor: primaryColor
    },
    
    loginTitle:{
        fontSize: 30,
        margin: 12,
        color:primaryColor,
        alignSelf:'center',
        textAlign:"center",
        padding: 10,
    },

    loginButtonContainer:{
        backgroundColor:primaryColor,
        borderColor:'white',
        margin: 20,
        borderWidth: 2,
        borderRadius:10,
        alignSelf:'center',
        padding: 10,
    },
    loginButtonText:{
        color:'white',
        fontSize: 20,
        margin:6
    },
});

export default RegisterScreen;