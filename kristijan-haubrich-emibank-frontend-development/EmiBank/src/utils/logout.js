import { logoutChange } from "../redux/reducers/loginReducer";
import { clearClientData } from "../redux/reducers/clientDataReducer";
import { clearBankManagerData } from "../redux/reducers/bankManagerDataReducer";
import { resetTokens } from "../redux/reducers/tokenReducer";
import { hardNavigate } from "./hardNavigate";


export default ({dispatch}) => {
    dispatch(logoutChange())
    dispatch(clearClientData())
    dispatch(clearBankManagerData())
    dispatch(resetTokens())
    hardNavigate("Login",{})
};
