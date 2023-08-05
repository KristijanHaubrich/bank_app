
const initialState = {
    data:{}
}
function setBankManagerData({data}) {
    return {
      type: 'SET_DATA',
      payload: data
    }
  }

  function clearBankManagerData() {
    return {
      type: 'CLEAR_DATA'
    }
  }

export {setBankManagerData, clearBankManagerData}

export const bankManagerDataReducer = (state = initialState,action) => {
    switch(action.type){
        case "SET_DATA":
            return{
                ...state,
                data: action.payload
            }
        case "CLEAR_DATA":
            return{
                ...state,
                data: {}
            }
        default: return state;        
    }
}