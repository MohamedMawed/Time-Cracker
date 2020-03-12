import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Splash from 'app/screens/Splash'
import HomeManager from 'app/screens/HomeManager'


import Register from 'app/screens/Register'
import Login from 'app/screens/Login'
import Home from 'app/screens/Home'
import AddNote from 'app/screens/AddNote'
import EditNote from 'app/screens/EditNote'
import AddUser from 'app/screens/AddUser'
import EditUser from 'app/screens/EditUser'

const RNApp = createStackNavigator(
    {
        
        Splash: {
            screen: Splash,
        },
        HomeManager: {
            screen: HomeManager,
        },
        Register: {
            screen: Register,
        },
        Login: {
            screen: Login,
        },
        Home: {
            screen: Home,
        },
        AddNote: {
            screen: AddNote,
        },
        EditNote: {
            screen: EditNote,
        },
        AddUser: {
            screen: AddUser,
        },
        EditUser: {
            screen: EditUser,
        },
    },
    {
        initialRouteName: 'Register',
        headerMode: null
    },
);

export default createAppContainer(RNApp);
