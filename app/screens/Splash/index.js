import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { navigateToHome, checkUserType } from '../../actions/navigationActions';
import NavigationService from '../../navigation/NavigationService';


export default function Splash(props) {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.authReducer.userData)
    useEffect(() => {
        setTimeout(()=>{
           NavigationService.reset(checkUserType(userData))
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
