import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from 'app/actions/loginActions';
import styles from './styles';
import { OutlinedTextField } from 'react-native-material-textfield'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import NavigationService from 'app/navigation/NavigationService'
import ModalDropdown from 'react-native-modal-dropdown'
import Toast from 'react-native-root-toast'
import { ValidateEmail } from '../../utils/stringUtils';


export default function Register() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [IsUserManager, setIsUserManager] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPass, setconfirmPass] = useState("")
    const onRegister = () => dispatch(loginActions.requestRegister(name, mail, password, IsUserManager))

    // validate the user data
    const validate = () => {
        if (name == '' || password == '' || confirmPass == ''|| mail == '') {
            Toast.show('Please complete the missing fields')
            return false
        }
        if(!ValidateEmail(mail)){
            Toast.show("Please enter a valid email")
            return false
        }
        if (name.length < 8) {
            Toast.show("the username must be at least 8 chars with no trailing numbers")
            return false
        }
        if (password !== confirmPass) {
            Toast.show("passwords doesn't match")
            return false
        }
        return true
    }

    return (

        <View style={styles.container}>
            <Text style={styles.headerText}><MaterialCommunityIcons name="timetable" size={80} color="white" /></Text>
            <View style={styles.seperator} />
            <OutlinedTextField
                containerStyle={styles.input}
                inputContainerStyle={styles.input}
                label='User Name'
                value={name}
                onChangeText={(text)=>setName(text)}
            />
            <View style={styles.seperator} />
            <OutlinedTextField
                containerStyle={styles.input}
                inputContainerStyle={styles.input}
                label='Email'
                value={mail}
                onChangeText={(text)=>setMail(text)}
            />
            <View style={styles.seperator} />
            <OutlinedTextField
                containerStyle={styles.input}
                inputContainerStyle={styles.input}
                label='Password'
                value={password}
                secureTextEntry
                onChangeText={(text)=>setPassword(text)}
            />
            <View style={styles.seperator} />
            <OutlinedTextField
                containerStyle={styles.input}
                label='Confirm Password'
                inputContainerStyle={styles.input}
                secureTextEntry
                value={confirmPass}
                onChangeText={(text)=>setconfirmPass(text)}
            />
            <View style={styles.seperator} />
            <ModalDropdown
                defaultValue={"User Type"}
                style={[styles.input, { backgroundColor: 'lightgray', justifyContent: 'center', }]}
                textStyle={{ fontSize: 18, color: 'white', width: '100%', padding: 10 }}
                dropdownStyle={[styles.input, { height: 72 }]}
                options={["Regular User", "Users Manager"]}
                onSelect={(index, value) => {
                    if (index == 0) setIsUserManager(0)
                    else setIsUserManager(1)
                }}
            />
            <View style={styles.seperator} />
            <TouchableOpacity style={styles.loginBtn} onPress={()=>{
                if(validate())
                    onRegister()
                }}>
                <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
            <Text onPress={() => NavigationService.navigate('Login')} style={styles.createAtext}>Have An Account ? Login</Text>

        </View>
    );
}
