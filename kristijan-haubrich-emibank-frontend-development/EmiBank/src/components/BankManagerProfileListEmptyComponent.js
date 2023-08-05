
import { StyleSheet,Text } from "react-native"

const BankManagerProfileListEmptyComponent = () => {
    return (
        <Text style = {styles.textStyle}>No clients</Text>
    )
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize: 25,
        margin: 12,
        color:'white',
        alignSelf:'center',
        textAlign:"center",
        padding: 10,
    },
})

export default BankManagerProfileListEmptyComponent