import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native'
import styles from './styles'
import { OutlinedTextField } from 'react-native-material-textfield'
import metrics from 'app/config/metrics'

export default function AddNote() {

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={'handled'} >
                {/* this is the header compontent */}
                <View style={styles.headerStyle}>
                    <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 20, color: 'white', flex: 12 }}>Add Note</Text>
                </View>


                <View style={{ 
                    justifyContent: 'center',
                     width: metrics.screenWidth,
                     alignItems:'center'
                     }}>
                    <View style={styles.seperator1} />
                    <OutlinedTextField
                        multiline
                        containerStyle={styles.input}
                        label='*Note'

                    />
                    <View style={styles.seperator} />
                    <View style={{
                        flexDirection: 'row',
                        width : metrics.screenWidth*.9,
                        justifyContent:'space-evenly',
                    }}>
                    <OutlinedTextField
                        containerStyle={styles.dateTime}
                        label='*From'
                    />
                    <OutlinedTextField
                        containerStyle={styles.dateTime}
                        label='*To'
                    />
                    </View>
                    <View style={styles.seperator1} />
                    <TouchableOpacity style={styles.loginBtn}>
                        <Text style={styles.text}>Save</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
}
