import { StyleSheet,Text,View,TouchableOpacity } from "react-native"
import { primaryColor } from "../globalConstants"
import { useSelector } from "react-redux"
import { SearchBar } from "@rneui/themed"
import { useState } from "react"
const AccountHeaderComponent = ({
    accNum,
    accType,
    balance,
    currency,
    cardNum,
    cardLimit,
    cardType,
    isCreditCard,
    addCreditCard,
    setTransactions,
    allTransactions
    }) => {
    const isBankManager = useSelector(state=>state.userType.isBankManager)
    const [search, setSearch] = useState("");
    const searchPlaceholder = "Search transactions by date and time"

    const updateSearch = (search) => {
        setSearch(search);
        if(search === ""){
            setTransactions(allTransactions)
        }else{
            var filter = allTransactions.filter(item => {
                return item.date.toLowerCase().includes(search.toLowerCase());
            })
            setTransactions(filter)
        }
    };


    if(isCreditCard){
        return (
            <View>
                <Text style={styles.accountNameBanner}>{accNum}</Text>
                <Text style={styles.sectionTitle}>ACCOUNT TYPE:</Text>
                <Text style={styles.info}>{accType}</Text>
                <Text style={styles.sectionTitle}>ACCOUNT BALANCE:</Text>
                <Text style={styles.info}>{balance} {currency}</Text>
                <Text style={styles.sectionTitle}>CREDIT CARD:</Text>
                <Text style={styles.sectionTitle}>Card number:</Text>
                <Text style={styles.info}>{cardNum}</Text>
                <Text style={styles.sectionTitle}>Card limit:</Text>
                <Text style={styles.info}>{cardLimit} {currency}</Text>
                <Text style={styles.sectionTitle}>Card type:</Text>
                <Text style={styles.info}>{cardType}</Text>
                <Text style={styles.sectionTitle}>TRANSACTIONS:</Text>
                <SearchBar
                    placeholder={searchPlaceholder}
                    onChangeText={updateSearch}
                    value={search}
                />
            </View>
        )
    }else{
        if(isBankManager){
            return(
                <View>
                <Text style={styles.accountNameBanner}>{accNum}</Text>
                        <Text style={styles.sectionTitle}>ACCOUNT TYPE:</Text>
                        <Text style={styles.info}>{accType}</Text>
                        <Text style={styles.sectionTitle}>ACCOUNT BALANCE:</Text>
                        <Text style={styles.info}>{balance} {currency}</Text>
                        <Text style={styles.sectionTitle}>CREDIT CARD:</Text>
                        <TouchableOpacity style = {styles.addButtonContainer} onPress={() => {addCreditCard()}}>
                               <Text style={styles.addButtonText}>Add Credit Card</Text>
                       </TouchableOpacity>
                        <Text style={styles.sectionTitle}>TRANSACTIONS:</Text>
                        <SearchBar
                            placeholder={searchPlaceholder}
                            onChangeText={updateSearch}
                            value={search}
                        />        
                </View>
               )
        }else{
            return(
                <View>
                <Text style={styles.accountNameBanner}>{accNum}</Text>
                        <Text style={styles.sectionTitle}>ACCOUNT TYPE:</Text>
                        <Text style={styles.info}>{accType}</Text>
                        <Text style={styles.sectionTitle}>ACCOUNT BALANCE:</Text>
                        <Text style={styles.info}>{balance} {currency}</Text>
                        <Text style={styles.sectionTitle}>CREDIT CARD:</Text>
                        <Text style={styles.info}>No credit card</Text>
                        <Text style={styles.sectionTitle}>TRANSACTIONS:</Text>
                        <SearchBar
                            placeholder={searchPlaceholder}
                            onChangeText={updateSearch}
                            value={search}
                        />         
                </View>
               )
        }
       
    }
    
}

const styles = StyleSheet.create({
    accountNameBanner:{
        fontSize: 30,
        margin: 5,
        textTransform: 'uppercase',
        alignSelf:'center',
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
    padding: 10,
    color:'black'
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
})

export default AccountHeaderComponent