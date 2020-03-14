import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Text, Button } from 'react-native'
import styles from './styles'
import { OutlinedTextField } from 'react-native-material-textfield'
import metrics from 'app/config/metrics'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as noteActions from 'app/actions/noteActions'
import { useDispatch } from 'react-redux'
import Toast from 'react-native-root-toast'




export default function AddNote(props) {

    const [note, setNote] = useState({ note: '', date: new Date().toISOString().split('T')[0], hours: 1 })
    const [start, setStart] = useState(note.date)
    const [hours, setHours] = useState(note.hours)



    // validate the note before saving it
    const validate = () => {
        let temp = note;
        if(!hours || hours <= 0 || hours > 24){
            Toast.show("please enter a valid number of hours worked")
            return false            
        }
        if (temp.note.length == 0) {
            Toast.show("you can't leave the note empty")
            return false
        }
        setNote({...note , hours: hours , date: start})
        return true
    }
    // data for the datetime picker
    const [date, setDate] = useState(new Date("2015-03-25T12:00:00Z"));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()

    const onChange = (event, selectedDate) => {
        if (!selectedDate) return // if the user click cancel for the date time picker
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setStart(selectedDate.toISOString().split('T')[0].toString())
        setNote({ ...note, date: selectedDate.toISOString().split('T')[0].toString() })

    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={'handled'} >
                {/* this is the header compontent */}
                <View style={styles.headerStyle}>
                    <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 25, color: 'white' }}>Add Note</Text>
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
                        onChangeText={(text) => {
                            setNote({ ...note, note: text })
                        }}
                        value={note.note}

                    />
                    <View style={styles.seperator} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        width: metrics.screenWidth * .9,
                        marginBottom: 10
                    }}>
                        <Text style={{ fontSize: 18, textAlign: 'center', flex: 1 }}>Date</Text>
                        <Text style={{ fontSize: 18, textAlign: 'center', flex: 1 }}>Number Of Hours</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: metrics.screenWidth * .9,
                        justifyContent: 'space-evenly',
                    }}>
                        <TouchableOpacity
                            style={{
                                width:metrics.screenWidth*.4,
                                height:55,
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'orange'
                            }}
                            onPress={() => {
                                setDate(new Date(start))
                                showDatepicker()
                            }}
                        >
                            <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>{start}</Text>
                        </TouchableOpacity>
                        <OutlinedTextField
                            containerStyle={{width:metrics.screenWidth*.4}}
                            // inputContainerStyle={styles.input}
                            label='# of hours'
                            onChangeText={(text) => {
                                setNote({ ...note, hours: text })
                            }}
                            value={hours}
                        />

                    </View>

                    <View style={styles.seperator1} />
                    <TouchableOpacity onPress={() => {
                        if (validate())
                            dispatch(noteActions.addNote(note))

                    }} style={styles.loginBtn}>
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
