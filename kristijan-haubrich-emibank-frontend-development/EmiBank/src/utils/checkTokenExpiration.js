import jwtDecode from "jwt-decode"
import dayjs from "dayjs"

export default (token) => {
    const decodedToken = jwtDecode(token) 
    const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1 
    return isExpired   
}