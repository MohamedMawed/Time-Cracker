import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { navigateToHome } from '../../actions/navigationActions';


export default function Splash() {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.loginReducer.userData)
    useEffect(() => {
        console.log(userData)
        setTimeout(()=>{
           navigateToHome(userData)
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
