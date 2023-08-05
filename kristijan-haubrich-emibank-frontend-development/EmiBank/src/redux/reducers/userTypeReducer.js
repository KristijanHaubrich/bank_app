
const initialState = {
    isBankManager: false
}

function bankManagerChange() {
    return {
      type: 'BANK_MANAGER'
    }
  }

function clientChange() {
    return {
      type: 'CLIENT'
    }
  }  

export {clientChange,bankManagerChange}  

export const userTypeReducer = (state = initialState,action) => {
    switch(action.type){
        case "BANK_MANAGER":
            return{
                ...state,
                isBankManager: true
            }
        case "CLIENT":
            return{
                ...state,
                isBankManager: false
            }
        default: return state;        
    }
}