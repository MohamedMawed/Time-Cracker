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

    const [note, setNote] = useState({ note: '', start: new Date().toISOString().split('.')[0], end: new Date().toISOString().split('.')[0] })
    const [start, setStart] = useState(note.start)
    const [end, setEnd] = useState(note.end)



    // validate the note before saving it
    const validate = () => {
        let temp = note;
        if (temp.note.length == 0) {
            Toast.show("you can't leave the note empty")
            return false
        }
        if (new Date(start + 'Z') >= new Date(end + 'Z')) {
            Toast.show("the start date can't be after the end date")
            return false
        } else {
            temp.start = start + 'Z'
            temp.end = end + 'Z'
            setNote(temp)
        }
        return true
    }
    // data for the datetime picker
    const [date, setDate] = useState(new Date("2015-03-25T12:00:00Z"));
    const [mode, setMode] = useState('date');
    const [fromORto, setfromORto] = useState(0);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()

    const onChange = (event, selectedDate) => {
        if (!selectedDate) return // if the user click cancel for the date time picker
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (fromORto == 1) {
            console.log('I am Here ', fromORto, selectedDate.toISOString())
            setStart(selectedDate.toISOString().split('.')[0].toString())
        } else {
            setEnd(selectedDate.toISOString().split('.')[0].toString())
        }
        setfromORto(100)

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
                    <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 20, color: 'white', flex: 12 }}>Add Note</Text>
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
                        <Text style={{ fontSize: 18, textAlign: 'center', flex: 1 }}>From</Text>
                        <Text style={{ fontSize: 18, textAlign: 'center', flex: 1 }}>To</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: metrics.screenWidth * .9,
                        justifyContent: 'space-evenly',
                    }}>
                        <Button
                            // style={styles.dateTime}
                            label='*Date'
                            onPress={() => {
                                setfromORto(1)
                                setDate(new Date(start))
                                showDatepicker()
                            }}
                            title={start.split("T")[0]}
                        />
                        <Button
                            style={styles.dateTime}
                            label='*Date'
                            onPress={() => {
                                setfromORto(2)
                                setDate(new Date(end))
                                showDatepicker()
                            }}
                            title={end.split("T")[0]}
                        />

                    </View>

                    <View style={styles.seperator} />
                    <View style={{
                        flexDirection: 'row',
                        width: metrics.screenWidth * .9,
                        justifyContent: 'space-evenly',
                    }}>
                        <Button
                            style={styles.dateTime}
                            label='*Time'
                            onPress={() => {
                                setfromORto(1)
                                setDate(new Date(start))
                                showTimepicker()
                            }}
                            title={start.split("T")[1]}
                        />
                        <Button
                            style={styles.dateTime}
                            label='*Time'
                            onPress={() => {
                                setfromORto(2)
                                setDate(new Date(end))
                                showTimepicker()
                            }}
                            title={end.split("T")[1]}
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
