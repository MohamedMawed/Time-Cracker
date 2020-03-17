import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Text, FlatList } from 'react-native'
import styles from './styles'
import { OutlinedTextField } from 'react-native-material-textfield'
import metrics from 'app/config/metrics'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as workingDayActions from 'app/actions/workingDayActions'
import { useDispatch } from 'react-redux'
import Toast from 'react-native-root-toast'
import Feather from 'react-native-vector-icons/Feather'

let gId = 1

export default function AddNote({ route }) {

    const dispatch = useDispatch()
    const [note, setNote] = useState(
        route.params ? route.params.Note
            :
            {
                date: new Date().toISOString().split('T')[0],
                hours: 1,
                preferredWorkingHours: 0,
                dayNotes: [{ 'note': '', id: gId++ }]
            })
    const [start, setStart] = useState(note.date)
    const [preferredWorkingHours, setPreferredWorkingHours] = useState(note.preferredWorkingHours)
    const [notes, setNotes] = useState(note.dayNotes)
    const [hours, setHours] = useState(note.hours)

    // validate the note before saving it
    const validate = () => {
        let temp = note;
        if (!hours || hours <= 0 || hours > 24) {
            Toast.show("please enter a valid number of hours worked")
            return false
        }
        if (preferredWorkingHours < 0 || preferredWorkingHours > 24) {
            Toast.show("please enter a valid preffered working hours")
            return false
        }
        let dayNotes=[]
        notes.forEach(element => {
            if(element.note.length > 0)dayNotes.push({note:element.note})
        })
        
        setNote({ ...note, hours: hours, date: start, preferredWorkingHours: preferredWorkingHours, dayNotes: dayNotes })
        return true
    }
    // data for the datetime picker
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false)

    const onChange = (event, selectedDate) => {
        if (!selectedDate) return // if the user click cancel for the date time picker
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setStart(selectedDate.toISOString().split('T')[0].toString())
        setNote({ ...note, date: selectedDate.toISOString().split('T')[0].toString() })
    }
    const showDatepicker = () => {
        setShow(true)
    }
    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={'handled'} >
                {/* this is the header compontent */}
                <View style={styles.headerStyle}>
                    <Text style={styles.headerText}>{route.params ? 'Edit Note' : 'Add Note'}</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.seperator1} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        width: metrics.screenWidth * .9,
                        marginBottom: 10
                    }}>
                        <Text style={styles.titleText}>*Date</Text>
                        <Text style={styles.titleText}>*Number Of Hours</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: metrics.screenWidth * .9,
                        justifyContent: 'space-evenly',
                    }}>
                        <TouchableOpacity
                            style={styles.dateField}
                            onPress={() => {
                                setDate(new Date(start))
                                showDatepicker()
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{start}</Text>
                        </TouchableOpacity>
                        <OutlinedTextField
                            containerStyle={{ width: metrics.screenWidth * .4 }}
                            keyboardType='numeric'
                            label='# of hours'
                            onChangeText={(text) => {
                                setNote({ ...note, hours: text })
                            }}
                            value={hours + ''}
                        />
                    </View>
                    <View style={styles.seperator1} />
                    <View>
                        <Text style={{
                            fontFamily: 'Sen-Regular',
                            fontSize:14
                        }}>Preffered Working Hours on this day</Text>
                    <View style={styles.seperator} />
                        <OutlinedTextField
                            containerStyle={{ width: metrics.screenWidth * .843 }}
                            keyboardType='numeric'
                            label='Preffered Working Hours'
                            onChangeText={(text) => {
                                setNote({ ...note, preferredWorkingHours: text })
                            }}
                            value={preferredWorkingHours + ''}
                        />
                    </View>
                    <View style={styles.seperator1} />
                    <View style={styles.notesContainer}>
                        <Text style={styles.parentText}>*Notes</Text>
                        <TouchableOpacity
                            onPress={() => {
                                let temp = notes
                                temp.push({ note: '', id: gId++ })
                                setNotes(temp)
                                setNote({ ...note, dayNotes: temp })
                            }}
                            style={styles.parentBtn}>
                            <Feather color='white' name='plus' size={40} />
                        </TouchableOpacity>
                    </View>
                    {notes.map((item, index) => {
                        return (
                            <View key={item.id} style={styles.noteContainer}>
                                <OutlinedTextField
                                    multiline
                                    containerStyle={{
                                        flex: 10
                                    }}
                                    labelTextStyle={{
                                        fontFamily: 'Sen-Bold',
                                        fontSize: 18,
                                    }}
                                    label='*Note'
                                    onChangeText={(text) => {
                                        let temp = notes
                                        temp[index].note = text
                                        setNotes(temp)
                                        setNote({ ...note, dayNotes: temp })
                                    }}
                                    value={item.note}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        let temp = notes
                                        temp.splice(index, 1)
                                        setNotes(temp)
                                        setNote({ ...note, dayNotes: temp })
                                    }}
                                    activeOpacity={.7}
                                    style={styles.parentRemoveBtn}>
                                    <Feather color='white' name='x' size={30} />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                    <TouchableOpacity onPress={() => {
                        if (validate())
                            route.params ? dispatch(workingDayActions.editNote(note.id, note))
                                :
                                dispatch(workingDayActions.addNote(note))
                    }} style={styles.saveBtn}>
                        <Text style={styles.text}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
}
