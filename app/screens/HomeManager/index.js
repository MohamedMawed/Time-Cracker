import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Alert, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as loginActions from 'app/actions/loginActions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import NavigationService from 'app/navigation/NavigationService'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from 'app/actions/userActions'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



const UserCard = ({ User, onDel, onEdit }) => {
    let color = 'black', type = 'regular user'
    if (User.is_user_manager) { color = 'blue', type = 'user manager' }

    return (
        <View style={styles.cardStyle}>
            <Text style={styles.headerText}>
                <MaterialCommunityIcons name="timetable" size={40} color="white" />
            </Text>
            <View style={{ flex: 14, paddingHorizontal: 5 }}>
                <Text style={styles.userTextStyle}>UserName: {User.username}</Text>
                <Text style={styles.userTextStyle}>Email: {User.email}</Text>
                <Text style={[styles.userTextStyle, { color: color }]}>User Type: {type}</Text>
                <Text style={[styles.userTextStyle, { color: 'red' }]}>Password: {User.password_unhashed}</Text>
            </View>
            <View style={{
                flex: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Ionicons
                    onPress={() => onDel(User.user_id)}
                    name="ios-close-circle"
                    size={30}
                    color="red" />
                <MaterialIcons onPress={() => onEdit(User)} style={{ flex: 2 }} name="edit" size={25} color="green" />

            </View>

        </View>

    )
}
export default function HomeManager() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.userReducer.users)
    const [useresloading, setNotesloading] = useState(false)

    const loadUsers = () => dispatch(userActions.listUsers())
    useEffect(() => {
        loadUsers()
    }, []);
    const deleteUser = (UserId) => {
        Alert.alert(
            'Delete User',
            'Are you sure to delete this User ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => dispatch(userActions.delUser(UserId)) },
            ]
        );

    }

    const editUser = (user) => {
        NavigationService.navigate("EditUser", { user })
    }

    return (
        <View style={styles.container}>
            {/* this is the header compontent */}
            <View style={styles.headerStyle}>
                <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 20, color: 'white', flex: 18 }}>Mohamed Mawed</Text>
                <AntDesign onPress={() => {
                    dispatch(loginActions.Logout())
                    NavigationService.reset('Login')
                }} style={{ flex: 3 }} name="logout" size={28} color="white" />
                <FontAwesome5 onPress={() => NavigationService.navigate('AddUser')} style={{ flex: 2 }} name="plus" size={25} color="white" />
            </View>

            {/* this is for the User Card With Actions */}
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                data={users ? users : []}
                refreshing={useresloading}
                // onRefresh={loadUsers}
                keyExtractor={(item) => item.user_id.toString()}
                renderItem={({ item }) => <UserCard User={item} onDel={deleteUser} onEdit={editUser} />}
            />

        </View>
    );
}
