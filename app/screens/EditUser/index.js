import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from 'app/actions/loginActions';
import styles from './styles';
import { OutlinedTextField } from 'react-native-material-textfield'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import NavigationService from 'app/navigation/NavigationService'
import ModalDropdown from 'react-native-modal-dropdown'


export default function Register() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const onLogin = () => dispatch(loginActions.requestLogin('test', '1234'))

    return (

        <View style={styles.container}>
            <Text style={styles.headerText}><MaterialCommunityIcons name="timetable" size={100} color="white" /></Text>
            <View style={styles.seperator} />
            <OutlinedTextField
                containerStyle={styles.input}
                inputContainerStyle={styles.input}
                label='User Name'
            />
            <View style={styles.seperator} />
            <OutlinedTextField
                containerStyle={styles.input}
                inputContainerStyle={styles.input}
                label='Password'
            />
            <View style={styles.seperator} />
            <OutlinedTextField
                containerStyle={styles.input}
                label='Confirm Password'
                inputContainerStyle={styles.input}
            />
            <View style={styles.seperator} />
            <ModalDropdown
                defaultValue={"User Type"}
                style={[styles.input, { backgroundColor: 'lightgray', justifyContent: 'center', }]}
                textStyle={{ fontSize: 18, color: 'white', width: '100%', padding: 10 }}
                dropdownStyle={[styles.input, { height: 72 }]}
                options={["Regular User", "Users Manager"]}
                onSelect={(index, value) => {
                    switch (index) {
                        case '0':
                            return
                        case '1':
                            return
                        case '2':
                            return 'Final Step'
                        default:
                            return 'foo';
                    }
                }}
            />
            <View style={styles.seperator} />
            <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
                <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
            <Text onPress={() => NavigationService.navigate('Login')} style={styles.createAtext}>Have An Account ? Login</Text>

        </View>
    );
}
