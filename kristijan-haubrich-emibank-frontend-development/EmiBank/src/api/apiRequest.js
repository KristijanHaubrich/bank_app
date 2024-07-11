import axios from "axios";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setAccessToken } from "../redux/reducers/tokenReducer";
import checkTokenExpiration from "../utils/checkTokenExpiration";
import logout from "../utils/logout";

let baseUrl = "http://192.168.32.82:8080"

let  axiosInstance = axios.create({
    baseURL: `${baseUrl}/api`,
});

const apiRequest = (token) => {
    if(token){
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }else{
        axiosInstance.defaults.headers.common['Authorization'] = ""
    }
    return axiosInstance
}


const ApiInterceptor = ({ children }) => {
    let email
    const dispatch = useDispatch()
    const accessToken = useSelector(state=>state.token.accessToken)
    const refreshToken =  useSelector(state=>state.token.refreshToken)
    const isBankManager = useSelector(state=>state.userType.isBankManager)
    if (isBankManager) email = useSelector(state=>state.bankManager.data.email)
    else email = useSelector(state=>state.client.data.email)
    
    useEffect(() => {

        const action = async () => {
            const interceptor = axiosInstance.interceptors.request.use(async (config)=> {
                if(accessToken && refreshToken){
                    const accessExpired = checkTokenExpiration(accessToken)
                    const refreshExpired = checkTokenExpiration(refreshToken)
                    if(refreshExpired){
                        logout({dispatch})
                    }else if(accessExpired && !refreshExpired){
                        let accessTokenAxiosInstance
                        if(isBankManager){
                            accessTokenAxiosInstance =  axios.create({
                                baseURL: `${baseUrl}/api/bank_managers/getAccessToken/${email}`,
                            });
                        }else{
                            accessTokenAxiosInstance =  axios.create({
                                baseURL: `${baseUrl}/api/clients/getAccessToken/${email}`,
                            });
                        }
                        accessTokenAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`
                        const accessResponse = await accessTokenAxiosInstance.get()
                        if(accessResponse?.data){
                            dispatch(setAccessToken({token: accessResponse.data.token}))
                            if(config.headers.Authorization){
                                config.headers.Authorization = `Bearer ${accessResponse.data.token}`
                            }
                        }  
                    }
                } 
                
                return config
        
            }, function (error) {
                return Promise.reject(error);
              });
        
            axios.interceptors.request.eject(interceptor);  
        } 
        action()
        },[isBankManager,accessToken,refreshToken,email])

        return children
}
    
export default apiRequest
export {ApiInterceptor}