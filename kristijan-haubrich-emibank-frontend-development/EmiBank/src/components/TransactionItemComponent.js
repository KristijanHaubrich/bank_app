import { StyleSheet,Text,View,TouchableOpacity } from "react-native"
import { greenColor,redColor } from "../globalConstants";

const TranasactionItemComponent = ({item,accNum,navigation}) => {
    if(item.transactionType === "top up balance" || (item.transactionType === "deposit" && item.toAccNum === accNum)){
        return(
            <View style={styles.itemContainer}>
            <View style={styles.transactionPlusItem}>
                <TouchableOpacity onPress={() => {navigation.navigate("TransactionDetails",{data:item, accNum: accNum})}}>
                    <Text style={styles.transactionPlusText}>{item.date}</Text>
                    <Text style={styles.transactionPlusText}>+{item.amount} {item.currency}</Text>
                </TouchableOpacity>
            </View>
            </View>
        ); 
    }else{
        return(
            <View style={styles.itemContainer}>
            <View style={styles.transactionMinusItem}>
            <TouchableOpacity onPress={() => {navigation.navigate("TransactionDetails",{data:item,accNum: accNum})}}>
                <Text style={styles.transactionMinusText}>{item.date}</Text>
                <Text style={styles.transactionMinusText}>-{item.amount} {item.currency}</Text>
            </TouchableOpacity>
        </View>
        </View>
        )
    }
   
}

const styles = StyleSheet.create({
    transactionPlusItem:{
        alignSelf:'center',
        margin:3,
        backgroundColor:'white',
        borderRadius: 10,
        borderWidth:2,
        borderColor:greenColor,
        width: '100%',
    },
    itemContainer:{
        margin: 5,
    },
    transactionPlusText:{
        alignSelf:'center',
        fontSize: 20,
        margin: 10,
        color:greenColor,
    },
    transactionMinusText:{
        alignSelf:'center',
        fontSize: 20,
        margin: 10,
        color:redColor,
    }, 
    transactionMinusItem:{
        alignSelf:'center',
        margin:3,
        backgroundColor:'white',
        borderRadius: 10,
        borderWidth:2,
        borderColor:redColor,
        width: '100%',
    },
})

export default TranasactionItemComponent