import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import configureStore from "./src/redux/configureStore"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LoadingScreen from "./src/screens/LoadingScreen";
import NavigationComponent from "./src/components/NavigationComponent";
import { ApiInterceptor } from "./src/api/apiRequest";
import { navigationRef } from "./src/utils/hardNavigate";

const {store,persistor} = configureStore()

export default function App() {  
    return (
      <>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen title="EmiBank"/>} persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <ApiInterceptor> 
                <NavigationComponent />
            </ApiInterceptor>        
          </NavigationContainer>
        </PersistGate>
      </Provider>
      </>
    );

  }