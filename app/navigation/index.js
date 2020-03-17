import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from 'app/screens/Splash'
import HomeManager from 'app/screens/HomeManager'
import Register from 'app/screens/Register'
import Login from 'app/screens/Login'
import Home from 'app/screens/Home'
import Note from 'app/screens/Note'
import User from 'app/screens/User'

const Stack = createStackNavigator()

export default function RootStack() {
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="AddNote"
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
                component={Note}
            />
            <Stack.Screen
                name="EditUser"
                component={User}
            />

        </Stack.Navigator>
    )
}