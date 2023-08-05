import axios from "axios"
const currencyRequest = async () => {
    return axios.get("https://api.apilayer.com/exchangerates_data/symbols",{
                headers: {
                'Content-Type': 'application/json',
                'apikey': '5zm5QV1NWCY4tdDUgHPfYVh6VHrVktxl'
                }})         
}

export default currencyRequest