import { StyleSheet,Text } from "react-native"

const ClientProfileListEmptyComponent = () => {
    return (
        <Text style = {styles.textStyle}>No bank accounts</Text>
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

export default ClientProfileListEmptyComponent