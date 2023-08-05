import { StyleSheet,View,Text,TouchableOpacity } from "react-native"
import { primaryColor } from "../globalConstants"
import logout from "../utils/logout"
import { useDispatch,useSelector } from "react-redux"
import apiRequest from "../api/apiRequest"
import { Alert } from "react-native"
import { setBankManagerData } from "../redux/reducers/bankManagerDataReducer"

const BankManagerProfileFooterComponent = ({email,setAllClients,changeData}) => {
    const dispatch = useDispatch()
    const accessToken = useSelector(state=>state.token.accessToken)

    const getData = async() => {
        const response = await apiRequest(accessToken).get(`/bank_managers/${email}`)
        if(response?.data){
                dispatch(setBankManagerData({data:response.data}))
                setAllClients(response.data.clients)
                changeData(response.data)
        }
    }  

    const askForProceedingTransaction = () => {
        Alert.alert('REFRESH', 'Refresh data?', [
            {
              text: 'Cancel',
            },
            {text: 'YES', onPress:() => {getData()} },
          ]);
       
    }

    return (
        <View>
             <TouchableOpacity
                style={styles.logoutButtonContainer}
                onPress={askForProceedingTransaction}
            >
                <Text style={styles.logoutButtonText}>Refresh data</Text>
            </TouchableOpacity>   
            <TouchableOpacity
                style={styles.logoutButtonContainer}
                onPress={() => {logout({dispatch})}}
            >
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>   
        </View>   
    )
}

const styles = StyleSheet.create({
    logoutButtonContainer:{
        backgroundColor:'white',
        borderColor:primaryColor,
        margin: 20,
        borderWidth: 2,
        borderRadius:10,
        alignSelf:'center',
        padding: 10,
    },
    logoutButtonText:{
        color:primaryColor,
        fontSize: 20,
        margin:6
    },
})

export default BankManagerProfileFooterComponent