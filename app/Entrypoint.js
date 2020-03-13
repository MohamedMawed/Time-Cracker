
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import RootStack from 'app/navigation'
import configureStore from 'app/store/configureStore'
import Loader from './components/loader'
const { persistor, store } = configureStore()
import NavigationService from 'app/navigation/NavigationService'
import { NavigationContainer } from '@react-navigation/native'

export default function Entrypoint() {
    return (
        <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
                <NavigationContainer ref={(navigatorRef) => NavigationService.setTopLevelNavigator(navigatorRef)}>
                    <RootStack/>
                </NavigationContainer>
                <Loader/>
            </PersistGate>
        </Provider>
    )
}
