import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import * as navigationAction from 'app/actions/navigationActions'
import NavigationService from 'app/navigation/NavigationService'


export default function Splash() {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.loginReducer.userData)
    useEffect(() => {
        console.log(userData)
        setTimeout(()=>{
            if (userData) {
                console.log('heu hey heu')
                let userType = userData.user.is_staff || userData.user.is_user_manager
                if (!userType)
                    NavigationService.navigate('Home')
                else 
                    NavigationService.navigate('HomeManager') // the only difference between the admin and 
            } else
                NavigationService.navigate('Login')
        },1000)
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                <MaterialCommunityIcons name="timetable" size={100} color="white" />
            </Text>
        </View>
    );
}
