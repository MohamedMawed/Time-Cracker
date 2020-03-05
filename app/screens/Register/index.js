import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from 'app/actions/loginActions';
import styles from './styles';
import { OutlinedTextField } from 'react-native-material-textfield'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


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
                label='User Name'
            />
            <View style={styles.seperator} />
            <OutlinedTextField
                containerStyle={styles.input}
                label='Password'
            />
            <View style={styles.seperator} />
            <OutlinedTextField
                containerStyle={styles.input}
                label='Confirm Password'
            />
            <View style={styles.seperator1} />
            <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
                <Text style={styles.text}>Register</Text>
            </TouchableOpacity>

        </View>
    );
}
