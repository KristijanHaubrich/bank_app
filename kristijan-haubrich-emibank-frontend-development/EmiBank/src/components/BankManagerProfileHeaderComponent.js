import { StyleSheet,View,Text } from "react-native"
import { SearchBar } from "@rneui/themed"
import { useState } from "react";

const BankManagerProfileHeaderComponent = ({name,setClients,allClients}) => {
    const [search, setSearch] = useState("");
    
    const updateSearch = (search) => {
        setSearch(search);
        if(search === ""){
            setClients(allClients)
        }else{
            var filter = allClients.filter(item => {
                return item.toLowerCase().includes(search.toLowerCase());
            })
            setClients(filter)
        }
    };

    return (
        <View>
        <Text style={styles.usernameBanner}> {name} </Text>
        <Text style={styles.clientsBanner}>CLIENTS </Text>
        <SearchBar
            placeholder="Search clients..."
            onChangeText={updateSearch}
            value={search}
        />
        </View>       
    )
}

const styles = StyleSheet.create({
    usernameBanner:{
        fontSize: 30,
        margin: 12,
        textTransform: 'uppercase',
        alignSelf:'center',
        padding: 10,
        color:"white"
    },
    clientsBanner:{
        fontSize: 25,
        margin: 12,
        color:'white',
        alignSelf:'center',
        padding: 10,
    },

})

export default BankManagerProfileHeaderComponent