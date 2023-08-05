
import { StyleSheet,Text } from "react-native"

const AccountEmptyListComponent = () => {
    return (
        <Text style = {styles.textStyle}>No transactions</Text>
    )
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize: 25,
        margin: 12,
        color:'black',
        alignSelf:'center',
        textAlign:"center",
        padding: 10,
    },
})

export default AccountEmptyListComponent