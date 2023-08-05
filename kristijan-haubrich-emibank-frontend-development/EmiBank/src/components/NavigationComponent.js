import AuthNavigator from "../navigators/AuthNavigator";
import UserNavigator from "../navigators/UserNavigator";
import { useSelector } from "react-redux";
import LoadingScreen from "../screens/LoadingScreen";
const NavigationComponent = () => {
    const isLoggedIn = useSelector(state=>state.login.isLoggedIn)
    if(isLoggedIn === null){
        <LoadingScreen title = "EmiBank"/>
    }
    if(isLoggedIn){
        return <UserNavigator/>
    }else{
        return <AuthNavigator />
    }
}

export default NavigationComponent