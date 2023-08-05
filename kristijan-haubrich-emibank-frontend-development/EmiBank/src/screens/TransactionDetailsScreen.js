import React from "react";
import { Text,StyleSheet,ScrollView } from "react-native";
import { primaryColor } from "../globalConstants";

const TransactionDetailsScreen = ({route}) =>{
    const accNum = route.params?.accNum
    const data = route.params?.data
    let transactionType
    if(data.transactionType === "top up balance") transactionType = data.transactionType
    else if(data.transactionType === "withdrawal") transactionType = data.transactionType
    else if (accNum === data.fromAccNum) transactionType = "Deposit to account: "
    else transactionType = "Deposit from account: "

    if(transactionType === "Deposit to account: " || transactionType === "Deposit from account: "){
        return (
            <ScrollView>
                    <Text style={styles.transactionNameBanner}>TRANSACTION FOR {accNum}</Text>
                    <Text style={styles.sectionTitle}>TRANSACTION DATE:</Text>
                    <Text style={styles.info}>{data.date}</Text>
                    <Text style={styles.sectionTitle}>TRANSACTION TYPE:</Text>
                    <Text style={styles.info}>{transactionType} {data.toAccNum}</Text>
                    <Text style={styles.sectionTitle}>AMOUNT:</Text>
                    <Text style={styles.info}>{data.amount} {data.currency}</Text>
            </ScrollView>
        )
    }else{
        return(
            <ScrollView>
            <Text style={styles.transactionNameBanner}>TRANSACTION FOR {accNum}</Text>
            <Text style={styles.sectionTitle}>TRANSACTION DATE:</Text>
            <Text style={styles.info}>{data.date}</Text>
            <Text style={styles.sectionTitle}>TRANSACTION TYPE:</Text>
            <Text style={styles.info}>{transactionType}</Text>
            <Text style={styles.sectionTitle}>AMOUNT:</Text>
            <Text style={styles.info}>{data.amount} {data.currency}</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    transactionNameBanner:{
        fontSize: 30,
        margin: 5,
        textTransform: 'uppercase',
        alignSelf:'center',
        textAlign: "center",
        padding: 5,
        color:'black'
    },
    sectionTitle:{
    	fontSize:20,
        marginTop:10,
        marginLeft:8,
        color:primaryColor
   },
   info:{
    fontSize: 20,
    marginBottom:10,
    alignSelf:'center',
    textAlign:"center",
    padding: 10,
    color:'black'
    }

})

export default TransactionDetailsScreen