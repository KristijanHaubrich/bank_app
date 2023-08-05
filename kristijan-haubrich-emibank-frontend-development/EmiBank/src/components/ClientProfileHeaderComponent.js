import { StyleSheet,View,Text,TouchableOpacity } from "react-native"
import { primaryColor } from "../globalConstants"
import { useSelector } from "react-redux"

const ClientProfileHeaderComponent = ({name,email,address,navigation}) => {
    const isBankManager = useSelector(state=>state.userType.isBankManager)

    if(isBankManager){
        return (
            <View>
                    <Text style={styles.usernameBanner}> {name} </Text>
                    <Text style={styles.sectionTitle}> Email: </Text>
                    <Text style={styles.info}>{email}</Text>
                    <Text style={styles.sectionTitle}> Address: </Text>
                    <Text style={styles.info}>{address}</Text>
                    <Text style={styles.sectionTitle}> Bank Accounts:</Text>
    
                    <TouchableOpacity style = {styles.addButtonContainer} onPress={() => {
                        navigation.navigate("NewAccount", {clientEmail: email, clientName: name} )}}>
                            <Text style={styles.addButtonText}>Create Bank Account</Text>
                    </TouchableOpacity>
                    <Text style={styles.accountsBanner}> Bank Account List</Text>
            </View>       
        )
    }else{
       return(
        <View>
        <Text style={styles.usernameBanner}> {name} </Text>
        <Text style={styles.sectionTitle}> Email: </Text>
        <Text style={styles.info}>{email}</Text>
        <Text style={styles.sectionTitle}> Address: </Text>
        <Text style={styles.info}>{address}</Text>
        <Text style={styles.sectionTitle}> Accounts:</Text>
        <Text style={styles.accountsBanner}> Account list</Text>
        </View> 


       )
    }
    
}

const styles = StyleSheet.create({
    usernameBanner:{
        fontSize: 30,
        margin: 5,
        textTransform: 'uppercase',
        alignSelf:'center',
        padding: 5,
        color:'black'
    },
    clientsBanner:{
        fontSize: 25,
        margin: 12,
        color:'white',
        alignSelf:'center',
        padding: 10,
    },
    info:{
        fontSize: 20,
        marginBottom:10,
        alignSelf:'center',
        padding: 10,
        color:primaryColor
    },
    sectionTitle:{
    	fontSize:20,
        marginTop:10,
        marginLeft:8,
        color:primaryColor
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
accountsBanner:{
    fontSize: 25,
    margin: 12,
    color:'black',
    alignSelf:'center',
    padding: 10,
}
})

export default ClientProfileHeaderComponent