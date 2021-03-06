import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Alert, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as authActions from 'app/actions/authActions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import NavigationService from 'app/navigation/NavigationService'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from 'app/actions/userActions'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



const UserCard = ({ User, isStaff, onDel, onEdit }) => {
    let color = 'black', type = 'regular user'
    if (User.is_user_manager) { color = 'blue', type = 'user manager' }

    return (
        <TouchableOpacity activeOpacity={.8} onPress={()=>{
            isStaff ? NavigationService.navigate('UserWorkingDays',{user:User}):null
        }} style={styles.cardStyle}>
            <Text style={styles.photoContainer}>
                <MaterialCommunityIcons name="timetable" size={40} color="white" />
            </Text>
            <View style={{ flex: 14, paddingHorizontal: 5 }}>
                <Text style={styles.userTextStyle}>UserName: {User.username}</Text>
                <Text style={styles.userTextStyle}>Email: {User.email}</Text>
                <Text style={[styles.userTextStyle, { color: color }]}>User Type: {type}</Text>
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

        </TouchableOpacity>

    )
}
export default function HomeManager() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.userReducer.users)
    const [useresloading, setNotesloading] = useState(false)
    const user = useSelector(state => state.authReducer.userData)

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
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => dispatch(userActions.delUser(UserId)) },
            ]
        );

    }
    const editUser = (user) => NavigationService.navigate("EditUser", { user })
    

    return (
        <View style={styles.container}>
            {/* this is the header compontent */}
            <View style={styles.headerStyle}>
                <Text style={styles.headerText}>{user ? user.user.username:''}</Text>
                <AntDesign onPress={() => {
                    dispatch(authActions.Logout())
                    NavigationService.reset('Login')
                }} style={{ flex: 1 }} name="logout" size={28} color="white" />
            </View>

            {/* this is for the User Card With Actions */}
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                data={users ? users : []}
                refreshing={useresloading}
                onRefresh={loadUsers}
                keyExtractor={(item) => item.user_id.toString()}
                renderItem={({ item }) => <UserCard User={item} isStaff={user? user.user.is_staff&&(!item.is_user_manager) : false} onDel={deleteUser} onEdit={editUser} />}
            />

        </View>
    );
}
