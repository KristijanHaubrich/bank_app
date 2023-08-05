const initialState = {
    name: "client",
    data:{}
}
function setClientData({data}) {
    return {
      type: 'SET_DATA',
      payload: data
    }
  }

  function clearClientData() {
    return {
      type: 'CLEAR_DATA'
    }
  }

export {setClientData, clearClientData}

export const clientDataReducer = (state = initialState,action) => {
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