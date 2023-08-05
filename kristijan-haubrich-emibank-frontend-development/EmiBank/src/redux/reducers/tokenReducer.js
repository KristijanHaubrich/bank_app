const initialState = {
    refreshToken: "",
    accessToken:""
}

function setRefreshToken({token}) {
    return {
      type: 'refreshToken',
      payload: token
    }
  }

  function setAccessToken({token}) {
    return {
      type: 'accessToken',
      payload:token
    }
  }

  function resetTokens() {
    return {
      type: 'resetTokens',
    }
  }

export {setRefreshToken, setAccessToken, resetTokens}

export const tokenReducer = (state = initialState,action) => {
    switch(action.type){
        case "accessToken":
            return{
                ...state,
                accessToken: action.payload
            }
        case "refreshToken":
            return{
                ...state,
                refreshToken: action.payload
            }
        case "resetTokens":
            return{
                ...state,
                refreshToken: "",
                accessToken: ""
            }    
        default: return state;        
    }
}