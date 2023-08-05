import { loginReducer } from "./reducers/loginReducer";
import { userTypeReducer } from "./reducers/userTypeReducer";
import {clientDataReducer} from "./reducers/clientDataReducer"
import { tokenReducer } from "./reducers/tokenReducer";
import { bankManagerDataReducer } from "./reducers/bankManagerDataReducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  }

const rootReducer = combineReducers({
  login: loginReducer,
  userType: userTypeReducer,
  token: tokenReducer,
  client: clientDataReducer,
  bankManager:bankManagerDataReducer
});  
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
  export default () => {
    let store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    })
    let persistor = persistStore(store)
    return { store, persistor }
  }