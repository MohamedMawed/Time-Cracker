import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from 'app/screens/Splash'
import HomeManager from 'app/screens/HomeManager'
import Register from 'app/screens/Register'
import Login from 'app/screens/Login'
import Home from 'app/screens/Home'
import AddNote from 'app/screens/AddNote'
import EditNote from 'app/screens/EditNote'
import AddUser from 'app/screens/AddUser'
import EditUser from 'app/screens/EditUser'

const Stack = createStackNavigator()

export default function RootStack() {
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="Splash"
            screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="HomeManager"
                component={HomeManager}
            />
            <Stack.Screen
                name="Splash"
                component={Splash}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Register"
                component={Register}
            />
            <Stack.Screen
                name="AddNote"
                component={AddNote}
            />
            <Stack.Screen
                name="EditNote"
                component={EditNote}
            />
            <Stack.Screen
                name="EditUser"
                component={EditUser}
            />

        </Stack.Navigator>
    )
}