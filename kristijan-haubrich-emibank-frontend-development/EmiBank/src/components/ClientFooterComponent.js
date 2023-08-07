import { Text,TouchableOpacity,StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { primaryColor } from "../globalConstants"
import logout from "../utils/logout"
import { View } from "react-native"
import { Alert } from "react-native"
import apiRequest from "../api/apiRequest"
import { setClientData } from "../redux/reducers/clientDataReducer"

const ClientFooterComponent = ({clientEmail,navigation,changeClientData})=>{
   const accessToken = useSelector(state=>state.token.accessToken)
   const isBankManager = useSelector(state=>state.userType.isBankManager)
   const dispatch = useDispatch() 

   const deleteAction = async ()=>{
        const response = await apiRequest(accessToken).delete(`/clients/${clientEmail}`)
        if(response.data.validation){
            createTwoButtonAlert("Success","Client Account Deleted")
            navigation.navigate("BankManagerTabNavigation")
        }else{
            createTwoButtonAlert("ERROR","Deletion failed")
        }
   }

const deleteAccount = () => {
        Alert.alert('DELETING ACCOUNT', 'Proceed?', [
            {
              text: 'Cancel',
            },
            {text: 'YES', onPress: deleteAction},
          ]);
}

const askForDataRefresh = () => {
    Alert.alert('REFRESH', 'Refresh data?', [
        {
          text: 'Cancel',
        },
        {text: 'YES', onPress:() => {getData()} },
      ]);
   
}

const getData = async() => {
    const response = await apiRequest(accessToken).get(`/clients/${clientEmail}`)
    if(response?.data){
        if(response.data.isFound){
            changeClientData(response.data.clientData) 
            dispatch(setClientData({data:response.data.clientData}))
        }
    }
}          

    if(!isBankManager){
        return(
            <View>
                <TouchableOpacity style = {styles.buttonContainer} onPress={askForDataRefresh} >
                    <Text style={styles.buttonText}>Refresh Data</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.buttonContainer} onPress={() => {logout({dispatch})}}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }else{
        return(
            <View>
                <Text style={styles.sectionTitle}>Delete  client account:</Text>
                <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={ deleteAccount }>
                            <Text
                                style={styles.buttonText}
                            >Delete account</Text>
                </TouchableOpacity>        
            </View>
        )        
    }
}

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor:'white',
        borderColor:primaryColor,
        margin: 20,
        borderWidth: 2,
        borderRadius:10,
        alignSelf:'center',
        padding: 10,
    },
    buttonText:{
        color:primaryColor,
        fontSize: 20,
        margin:6
    },
    sectionTitle:{
    	fontSize:20,
        marginTop:10,
        marginLeft:8,
        color:primaryColor
   },
})

export default ClientFooterComponent