import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import * as authActions from 'app/actions/authActions'
import styles from './styles';
import { OutlinedTextField } from 'react-native-material-textfield'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import NavigationService from 'app/navigation/NavigationService'
import Toast from 'react-native-root-toast';


export default function Login() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const onLogin = () => dispatch(authActions.requestLogin(name,password))

    const validate = () => {
        if( name.length == 0 || password.length == 0 ){
            Toast.show('Please complete the required fields')
            return false
        }
        return true
    }
    return (
        <View style={styles.container}>
            {/* MaterialCommunityIcons */}
                    
            <Text style={styles.headerText}>
                <MaterialCommunityIcons name="timetable" size={100} color="white" />
            </Text>
            <View style={styles.seperator1} />
            <OutlinedTextField
                containerStyle={styles.input}
                inputContainerStyle={styles.input}      
                maxLength={30}          
                label='User Name*'
                onChangeText={(text)=>setName(text)}
            />
            <View style={styles.seperator} />
            <OutlinedTextField
                containerStyle={styles.input}
                inputContainerStyle={styles.input}                
                maxLength={30}          
                label='Password*'
                secureTextEntry
                onChangeText={(text)=>setPassword(text)}
            />
            <View style={styles.seperator1} />
            <TouchableOpacity style={styles.loginBtn} onPress={()=>{
                if(validate())
                    onLogin()
            }}>
                <Text style={styles.text}>login</Text>
            </TouchableOpacity>
            <Text 
                onPress={()=>NavigationService.navigate('Register')}
                style={styles.createAtext}>
                    Create A New Account
            </Text>

        </View>
    );
}
