import React, { useState} from "react";
import {View,Text,StyleSheet,TextInput,SafeAreaView,TouchableOpacity,Alert} from "react-native";
import CheckBox from 'expo-checkbox';
import { setAccessToken,setRefreshToken } from "../redux/reducers/tokenReducer";
import { setBankManagerData } from "../redux/reducers/bankManagerDataReducer";
import { loginChange } from "../redux/reducers/loginReducer";
import { bankManagerChange,clientChange } from "../redux/reducers/userTypeReducer";
import { useDispatch } from "react-redux";
import { primaryColor } from "../globalConstants";
import apiRequest from "../api/apiRequest";
import { setClientData } from "../redux/reducers/clientDataReducer";
import createTwoButtonAlert from "../utils/createTwoButtonAlert";
import { hardNavigate } from "../utils/hardNavigate";
import validateEmailInput from "../utils/validateEmailInput";

const LoginScreen = ({navigation}) => {
    const [isBankManager,setIsBankManager] = useState(false);
    const [emailInput,setEmailInput] = useState("");
    const [passwordInput,setPasswordInput] = useState("");
    const dispatch = useDispatch()

    const login = async ()=>{
         if(emailInput!=="" && passwordInput !== ""){
            if(!validateEmailInput(emailInput)){
                createTwoButtonAlert("ERROR","Invalid email")
            }
            else if(passwordInput.length < 3){
                createTwoButtonAlert("ERROR","Short Password")
            }else{
                let response
                if(isBankManager){
                    response = await apiRequest("").post("/public/authenticateBankManager",{password: passwordInput, email: emailInput})
                }else{
                    response = await apiRequest("").post("/public/authenticateClient",{password: passwordInput, email: emailInput})
                }

                if(response?.data){
                    const accessToken = response.data.accessToken
                    const refreshToken = response.data.refreshToken
    
                    dispatch(setAccessToken({token:accessToken}))
                    dispatch(setRefreshToken({token:refreshToken}))

                    setEmailInput("")
                    setPasswordInput("")
                    dispatch(loginChange())

                    if(isBankManager){
                        dispatch(bankManagerChange())
                        dispatch(setBankManagerData({data:response.data.bankManagerDetailsResponseDto}))
                        hardNavigate("BankManagerTabNavigation")
                    }
                    else{
                        dispatch(clientChange())
                        dispatch(setClientData({data:response.data.clientDetailsResponseDto}))
                        hardNavigate("ClientTabNavigation")
                    }
                }else{
                    createTwoButtonAlert("ERROR","Fail to login")
                }
            }
           
         }else{
            createTwoButtonAlert("ERROR","Fill all fields")
         }
    }

    return(
        <View>
            <SafeAreaView>
                <Text
                    style={styles.loginTitle}
                >
                    LOGIN
                </Text>

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
                    onPress={ login }
                >
                    <Text
                        style={styles.loginButtonText}
                    >Login</Text>
                </TouchableOpacity>

                <Text style = {styles.checkBoxTitle}>Are you Bank Manager?</Text>
                <CheckBox 
                    style={styles.checkBox}
                    value={isBankManager}
                    onValueChange={setIsBankManager}
                />

                <TouchableOpacity
                    onPress={ () => {navigation.navigate("Register")} }
                    style={styles.registerContainer}
                >
                    <Text
                        style={styles.registerButton}
                    >Register</Text>
                </TouchableOpacity>


                 
            </SafeAreaView>
        </View>
    );
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
    registerButton:{
        color: primaryColor,
        alignSelf:"center",
        fontSize: 20,
        margin: 10,
        padding:10
    },
    registerContainer:{
        alignSelf: "center"
    }
});

export default LoginScreen;