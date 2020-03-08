import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ModalDropdown from 'react-native-modal-dropdown'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from './styles'
import Modal from "react-native-modal"
import { OutlinedTextField } from 'react-native-material-textfield'
import metrics from 'app/config/metrics'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function EditNote(props) {
    const [note, setloading] = useState(props.navigation.getParam('Note'))

    // data for the datetime picker
    const [date, setDate] = useState(new Date("2015-03-25T12:00:00Z"));
    const [mode, setMode] = useState('date');
    const [fromORto, setfromORto] = useState(0);
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        console.log(currentDate.toISOString())
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={'handled'} >
                {/* this is the header compontent */}
                <View style={styles.headerStyle}>
                    <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 20, color: 'white', flex: 12 }}>Edit Note</Text>
                </View>



                <View style={{
                    justifyContent: 'center',
                    width: metrics.screenWidth,
                    alignItems: 'center'
                }}>
                    <View style={styles.seperator1} />
                    <OutlinedTextField
                        multiline
                        containerStyle={styles.input}
                        label='*Note'
                        value={note.note}

                    />
                    <View style={styles.seperator} />
                    <View style={{
                flexDirection: 'row',
                justifyContent:'space-evenly',
                alignItems:'center',
                width:metrics.screenWidth*.9,
                marginBottom:10
            }}>
                <Text style={{fontSize:18 , textAlign:'center', flex:1}}>From</Text>
                <Text style={{fontSize:18, textAlign:'center',  flex:1}}>To</Text>
            </View>
                    <View style={{
                        flexDirection: 'row',
                        width: metrics.screenWidth * .9,
                        justifyContent: 'space-evenly',
                    }}>
                        <OutlinedTextField
                            containerStyle={styles.dateTime}
                            label='*Date'
                            onFocus={()=>{
                                setfromORto(0)
                                setDate(new Date(note.start))
                                showDatepicker()
                            }}
                            value={note.start.split("T")[0]}
                        />
                        <OutlinedTextField
                            containerStyle={styles.dateTime}
                            label='*Date'
                            onFocus={()=>{
                                setfromORto(1)
                                setDate(new Date(note.end))
                                showDatepicker()
                            }}
                            value={note.end.split("T")[0]}
                        />
                        
                    </View>

                    <View style={styles.seperator} />
                    <View style={{
                        flexDirection: 'row',
                        width: metrics.screenWidth * .9,
                        justifyContent: 'space-evenly',
                    }}>
                        <OutlinedTextField
                            containerStyle={styles.dateTime}
                            label='*Time'
                            onFocus={()=>{
                                setfromORto(0)
                                setDate(new Date(note.start))
                                showTimepicker()
                            }}
                            value={note.start.split("T")[1]}
                        />
                        <OutlinedTextField
                            containerStyle={styles.dateTime}
                            label='*Time'
                            onFocus={()=>{
                                setfromORto(1)
                                setDate(new Date(note.end))
                                showTimepicker()
                            }}
                            value={note.end.split("T")[1]}
                        />
                        
                    </View>
                    <View style={styles.seperator1} />
                    <TouchableOpacity style={styles.loginBtn}>
                        <Text style={styles.text}>Save</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
}
