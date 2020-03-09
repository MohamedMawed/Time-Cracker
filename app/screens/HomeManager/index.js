import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Alert, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ModalDropdown from 'react-native-modal-dropdown'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import Modal from "react-native-modal"
import { OutlinedTextField } from 'react-native-material-textfield'
import metrics from 'app/config/metrics'
import * as NavActions from 'app/actions/navigationActions'
import NavigationService from 'app/navigation/NavigationService'
import { useDispatch, useSelector } from 'react-redux'
import * as noteActions from 'app/actions/noteActions'



const UserCard = ({ User, onDel, onEdit }) => {
    let color = 'black', type = 'regular user'
    if (User.is_user_manager) { color = 'blue', type = 'user manager' }
    if (User.is_staff) { color = 'blue', type = 'user manager' }

    return (
        <View style={styles.cardStyle}>
            <Text style={styles.headerText}>
                <MaterialCommunityIcons name="timetable" size={40} color="white" />
            </Text>
            <View>
                <Text style={styles.userTextStyle}>{User.username}</Text>
                <Text style={[styles.userTextStyle, { color: color }]}>{type}</Text>
            </View>
            <View style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Ionicons
                    onPress={() => onDel(Note.id)}
                    name="ios-close-circle"
                    size={30}
                    color="red" />
                <MaterialIcons onPress={() => onEdit(Note)} style={{ flex: 2 }} name="edit" size={25} color="green" />

            </View>

        </View>

    )
}
export default function HomeManager() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.noteReducer.notes)
    const [useresloading, setNotesloading] = useState(false)

    const loadUsers = () => dispatch(userActions.listUsers())
    useEffect(() => loadNotes(), []);
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
                <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 20, color: 'white', flex: 12 }}>Mohamed Mawed</Text>
                <FontAwesome5 onPress={() => setHideFilter(true)} style={{ flex: 2 }} name="add" size={25} color="white" />
            </View>

            {/* this is for the Note Card With Actions */}
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                data={users}
                refreshing={useresloading}
                onRefresh={loadUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <UserCard Note={item} onDel={deleteUser} onEdit={editUser} />}
            />

        </View>
    );
}
