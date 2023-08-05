import { StyleSheet,View,Text,TouchableOpacity } from "react-native"
import { primaryColor } from "../globalConstants"
import { useSelector } from "react-redux"

const AccountFooterComponent = ({addNewTransaction,deleteBankAccount}) => {
    const isBankManager = useSelector(state=>state.userType.isBankManager) 

    if(isBankManager){
        return (
            <View>
            <TouchableOpacity style = {styles.buttonContainer} onPress={() => {addNewTransaction()}}>
            <Text style={styles.buttonText}>Make Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttonContainer} onPress={() => {deleteBankAccount()}}>
                     <Text style={styles.buttonText}>Delete Bank Account</Text>
            </TouchableOpacity>
         </View>
        )
    }else{
        return (
            <View>
            <TouchableOpacity style = {styles.buttonContainer} onPress={() => {addNewTransaction()}}>
            <Text style={styles.buttonText}>Make transaction</Text>
            </TouchableOpacity>
         </View>
        )
    }
   
}

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor:primaryColor,
        borderColor:'white',
        margin: 20,
        borderWidth: 2,
        borderRadius:10,
        alignSelf:'center',
        padding: 10,
    },
    buttonText:{
        color:'white',
        fontSize: 20,
        margin:6
    }
})

export default AccountFooterComponent