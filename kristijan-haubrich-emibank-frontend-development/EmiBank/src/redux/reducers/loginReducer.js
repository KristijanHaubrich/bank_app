
const initialState = {
    isLoggedIn: undefined
}
function loginChange() {
    return {
      type: 'LOGIN'
    }
  }

  function logoutChange() {
    return {
      type: 'LOGOUT'
    }
  }

export {loginChange, logoutChange}

export const loginReducer = (state = initialState,action) => {
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                isLoggedIn: true
            }
        case "LOGOUT":
            return{
                ...state,
                isLoggedIn: false
            }
        default: return state;        
    }
}