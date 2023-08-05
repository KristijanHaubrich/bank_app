
import LoadingScreen from "../screens/LoadingScreen";
import { useSelector } from "react-redux";
import ClientNavigator from "./ClientNavigator";
import BankManagerNavigator from "./BankManagerNavigator";

const UserNavigator = () => {
    const isBankManager = useSelector(state=>state.userType.isBankManager)

    if(isBankManager === null){
       return  <LoadingScreen title = "Users" />
    }else if(isBankManager){
        return (
            <BankManagerNavigator/>
        )
    }else{
        return (
           <ClientNavigator/>
        )
    }
}

export default UserNavigator