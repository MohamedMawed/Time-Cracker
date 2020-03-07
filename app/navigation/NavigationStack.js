import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Register from 'app/screens/Register'
import Login from 'app/screens/Login'
import Home from 'app/screens/Home'
import AddNote from 'app/screens/AddNote'
import EditNote from 'app/screens/EditNote'

const RNApp = createStackNavigator(
    {
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
    },
    {
        initialRouteName: 'Login',
        headerMode: null
    },
);

export default createAppContainer(RNApp);
