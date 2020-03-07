import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator
} from 'react-native'
import { useSelector } from 'react-redux'
import metrics from 'app/config/metrics'
import styles from 'app/config/styles'


export default function Loader() {
    const showLoader = useSelector(state => state.loadingReducer.isLoginLoading)
    if (showLoader)
        return (
            <View style={{ width: '100%', height: metrics.screenHeight, position: 'absolute', zIndex: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,.6)' }}>
                <ActivityIndicator size="large" color={styles.color.COLOR_PRIMARY} />
            </View>
        )
        return null

}