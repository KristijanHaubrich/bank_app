import React, { useState } from "react";
import { Text,StyleSheet,View,TextInput,TouchableOpacity,Alert } from "react-native";
import LoadingScreen from "./LoadingScreen";
import { useSelector,useDispatch } from "react-redux";
import { primaryColor } from "../globalConstants";
import apiRequest from "../api/apiRequest";
import createTwoButtonAlert from "../utils/createTwoButtonAlert";
import logout from "../utils/logout";
import { ScrollView } from "react-native-gesture-handler";

const SettingsScreen = () =>{
    const isBankManager = useSelector(state=>state.userType.isBankManager)
    const data = useSelector(state=>state.bankManager.data)
    const accessToken = useSelector(state=>state.token.accessToken)
    const [newPassword,setNewPassword] = useState("")
    const [oldPassword,setOldPassword] = useState("")
    const dispatch = useDispatch()
   

    const changePassword = async () => {
        if(oldPassword === "" || newPassword === ""){
            createTwoButtonAlert("ERROR","Enter old and new password",null)
        }else if(oldPassword === newPassword){
            createTwoButtonAlert("ERROR","Old password is same as new password",null)
        }else{
            let checkPasswordresponse
            if(isBankManager){
                checkPasswordresponse = await apiRequest(accessToken).post("/bank_managers/checkPassword",{password: oldPassword, email: data.email})
            }else{
                checkPasswordresponse = await apiRequest(accessToken).post("/clients/checkPassword",{password: oldPassword, email: data.email})
            }
           
            if(checkPasswordresponse?.data){
                const validation = checkPasswordresponse.data.validation
                if(validation){
                    if(isBankManager){
                        await apiRequest(accessToken).patch("/bank_managers/changePassword",{password: newPassword, email: data.email}).catch(e =>{
                            createTwoButtonAlert("SERVER ERROR","Changing password failed")
                        })
                    }else{
                        await apiRequest(accessToken).patch("/clients/changePassword",{password: newPassword, email: data.email})
                            .catch(e =>{
                                createTwoButtonAlert("SERVER ERROR","Changing password failed")
                        })
                    }
                   
                    createTwoButtonAlert("SUCCESS","Password changed successfully",null)
                }else{
                    createTwoButtonAlert("ERROR","Wrong old password",null)
                }
            }else{
                createTwoButtonAlert("ERROR","Changing password failed",null)
            }
        }
    }
        
    const deleteAction = async ()=>{
        const response =  await apiRequest(accessToken).delete(`/bank_managers/${data.email}`)
        if(response.data.validation){
            createTwoButtonAlert("SUCCESS","Account deleted")
            logout({dispatch})
        }else{
            createTwoButtonAlert("ERROR","First delete your clients accounts")
        }
        
    }

    const deleteAccount = () => {
        Alert.alert('DELETING ACCOUNT', 'Procced?', [
            {
              text: 'Cancel',
            },
            {text: 'YES', onPress: deleteAction},
          ]);
    
    }

    if(data === undefined){
        <LoadingScreen title = "Settings" />
    }else if(isBankManager){
        return(
            <View style={styles.container}>
               <Text style={styles.name}>{data.name}</Text>
               <Text style={styles.sectionTitle}>Change Password:</Text>
               <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChangeText={setNewPassword}
               />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChangeText={setOldPassword}
               />
                 <TouchableOpacity
                    style={styles.ButtonContainer}
                    onPress={ changePassword }
                >
                    <Text
                        style={styles.ButtonText}
                    >Change password</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Delete account:</Text>
                <TouchableOpacity
                    style={styles.ButtonContainer}
                    onPress={ deleteAccount }
                >
                    <Text
                        style={styles.ButtonText}
                    >Delete account</Text>
                </TouchableOpacity>
            </View>
         )
    }else{
        return(
            <ScrollView style={styles.container}>
               <Text style={styles.name}>{data.name}</Text>
               <Text style={styles.sectionTitle}>Change password:</Text>
               <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChangeText={setNewPassword}
               />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChangeText={setOldPassword}
               />
                 <TouchableOpacity
                    style={styles.ButtonContainer}
                    onPress={ changePassword }
                >
                    <Text
                        style={styles.ButtonText}
                    >Change Password</Text>
                </TouchableOpacity>
            </ScrollView>
         )
    }

}

const styles = StyleSheet.create({
   container:{
        flex:1,
        backgroundColor: "white"
   },   
   name:{
      fontSize:30,
      alignSelf:"center",
      textAlign: "center",
      margin:10
   },
   sectionTitle:{
    	fontSize:20,
        marginTop:10,
        marginLeft:8,
        color:primaryColor
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
   ButtonContainer:{
    backgroundColor:primaryColor,
    borderColor:'white',
    margin: 20,
    borderWidth: 2,
    borderRadius:10,
    alignSelf:'center',
    padding: 10,
    },
   ButtonText:{
        color:'white',
        fontSize: 20,
        margin:6
    },  
})

export default SettingsScreen