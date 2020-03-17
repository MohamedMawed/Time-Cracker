import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from 'app/actions/userActions';
import styles from './styles';
import { OutlinedTextField } from 'react-native-material-textfield'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import NavigationService from 'app/navigation/NavigationService'
import ModalDropdown from 'react-native-modal-dropdown'
import Toast from 'react-native-root-toast'
import { ValidateEmail } from '../../utils/stringUtils';


const userTypes = ["Regular User", "Users Manager"]

export default function UserAddOrEdit({route}) {
    const dispatch = useDispatch()
    const [user, setUser] = useState(route.params ? route.params.user : { username: '', email: '', is_user_manager: 0 })
    const [name, setName] = useState(user.username)
    const [mail, setMail] = useState(user.email)
    const [IsUserManager, setIsUserManager] = useState(user.is_user_manager)

    const onEditUser = () => dispatch(userActions.editUser(user.user_id,{
        'username': name,
        'email': mail,
        'is_user_manager': IsUserManager
    }))
    const onAddUser = () => dispatch(userActions.addUser({
        'username': name,
        'email': mail,
        'is_user_manager': IsUserManager
    }))

    // validate the user data
    const validate = () => {
        if (name == '' || mail == '') {
            Toast.show('Please complete the missing fields')
            return false
        }
        if (!ValidateEmail(mail)) {
            Toast.show("Please enter a valid email")
            return false
        }
        if (name.length < 8) {
            Toast.show("the username must be at least 8 chars with no trailing numbers")
            return false
        }
        return true
    }

    return (

        <View style={styles.container}>
            <View style={styles.headerStyle}>
                <Text style={{
                    fontFamily: 'sans-serif-medium',
                    fontSize: 24,
                    color: 'white',
                    flex: 1,
                    textAlign: 'center'
                }}>{route.params ? "Edit User" : "Add User"}</Text>
            </View>
            <View style={styles.seperator1} />
            <View style={styles.seperator1} />
            <View style={styles.seperator1} />
            <OutlinedTextField
                containerStyle={styles.input}
                inputContainerStyle={styles.input}
                label='User Name'
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <View style={styles.seperator1} />
            <OutlinedTextField
                containerStyle={styles.input}
                inputContainerStyle={styles.input}
                label='Email'
                value={mail}
                onChangeText={(text) => setMail(text)}
            />
            <View style={styles.seperator1} />
            <ModalDropdown
                defaultValue={IsUserManager?userTypes[1]:userTypes[0]}
                style={[styles.input, { backgroundColor: 'lightgray', justifyContent: 'center', }]}
                textStyle={{ fontSize: 18, color: 'white', width: '100%', padding: 10 }}
                dropdownStyle={[styles.input, { height: 72 }]}
                options={userTypes}
                onSelect={(index, value) => {
                    if (index == 0) setIsUserManager(0)
                    else setIsUserManager(1)
                }}
            />
            <View style={styles.seperator1} />
            <TouchableOpacity style={styles.loginBtn} onPress={() => {
                if (validate())
                    route.params ? onEditUser() : onAddUser()
            }}>
                <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}
