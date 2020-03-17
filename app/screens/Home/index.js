import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, FlatList, Alert, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ModalDropdown from 'react-native-modal-dropdown'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import Modal from "react-native-modal"
import { OutlinedTextField } from 'react-native-material-textfield'
import metrics from 'app/config/metrics'
import * as authActions from 'app/actions/authActions'
import NavigationService from 'app/navigation/NavigationService'
import { useDispatch, useSelector } from 'react-redux'
import * as noteActions from 'app/actions/noteActions'
import { Switch } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'




const NoteCard = ({ workingDay, onDel, onEdit }) => {
    let color = 'white'
    if (workingDay.preferredWorkingHours && workingDay.preferredWorkingHours > workingDay.hours)
        color = '#ffdbdd'
    return (
        <View style={[styles.cardStyle, { backgroundColor: color }]}>
            <View style={{ flex: 17 }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={styles.dateText}>Date : {workingDay.date}</Text>
                    <Text style={styles.dateText}>  # of hours : {workingDay.hours}</Text>
                </View>
                <View style={{ height: 2, width: '100%', backgroundColor: 'lightgray', marginVertical: 5 }} />
                <Text style={styles.notesParent}>Notes :-</Text>
                <View style={styles.notesContainer}>
                    {
                        workingDay.dayNotes.map((note, index) => {
                            return (
                                <View key={index} style={{
                                    flexDirection: 'row',
                                }}>
                                    <Text style={[styles.noteItem, { flex: 2 }]}>
                                        {index + 1} :-
                                </Text>
                                    <Text style={[styles.noteItem, { flex: 18 }]}>
                                        {note.note}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <View style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Ionicons
                    onPress={() => onDel(workingDay.id)}
                    name="ios-close-circle"
                    size={30}
                    color="red" />
                <MaterialIcons onPress={() => onEdit(workingDay)} style={{ flex: 2 }} name="edit" size={25} color="green" />

            </View>
        </View>

    )
}
export default function Home(props) {
    const dispatch = useDispatch()
    const data = [
        'Add Note',
        'Settings',
        'Send A Report',
        'Logout']
    const notes = useSelector(state => state.noteReducer.notes)
    const pwh = useSelector(state => state.noteReducer.underPWH)
    const user = useSelector(state => state.authReducer.userData)
    const [hideFilter, setHideFilter] = useState(false)
    const [HidePWH, setHidePWH] = useState(false)
    const [notesloading, setNotesloading] = useState(false)
    const [preferredWorkingHours, setPreferredWorkingHours] = useState(pwh)
    const loadNotes = () => dispatch(noteActions.listNotes())


    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    const [fromOrTo, setFromOrTo] = useState(0)
    const [from, setFrom] = useState('from')
    const [to, setTo] = useState('to')

    useEffect(() => {
        loadNotes()
    }, [])
    const deleteWorkingDay = (NoteId) => {
        Alert.alert(
            'Delete Working Day',
            'Are you sure to delete that day ?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => dispatch(noteActions.delNote(NoteId)) },
            ]
        )

    }

    const editWorkingDay = (Note) => {
        NavigationService.navigate("AddNote", { Note })
    }

    const onChange = (event, selectedDate) => {
        if (!selectedDate) return // if the user click cancel for the date time picker
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
        if (fromOrTo) setFrom(selectedDate.toISOString().split('T')[0].toString())
        else setTo(selectedDate.toISOString().split('T')[0].toString())
    }


    const showDatepicker = () => {
        setShow(true)
    }

    return (
        <View style={styles.container}>
            {/* this is the header compontent */}
            <View style={styles.headerStyle}>
                <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 20, color: 'white', flex: 12 }}>{user ? user.user.username : ''}</Text>
                <FontAwesome5 onPress={() => setHideFilter(true)} style={{ flex: 2 }} name="filter" size={25} color="white" />
                <ModalDropdown
                    textStyle={{ fontSize: 50, color: 'white', textAlignVertical: 'top', width: '100%', height: 100 }}
                    Style={{ flex: 2 }}
                    dropdownStyle={{ height: 'auto' }}
                    animated={false}
                    options={data}
                    onSelect={(index, value) => {
                        switch (index) {
                            case '0':
                                NavigationService.navigate('AddNote')
                                return
                            case '1':
                                setHidePWH(true)
                                return
                            case '2':
                                dispatch(noteActions.sendReport(
                                    from.length == 4 ? undefined : from,
                                    to.length == 2 ? undefined : to
                                ))
                                return
                            case '3':
                                NavigationService.reset('Login')
                                dispatch(authActions.Logout())
                                return
                        }
                    }}
                >
                    <Entypo name="dots-three-vertical" size={25} color="white" />
                </ModalDropdown>
            </View>

            {/* this is for the Note Card With Actions */}
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                data={notes}
                refreshing={notesloading}
                onRefresh={loadNotes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <NoteCard workingDay={item} onDel={deleteWorkingDay} onEdit={editWorkingDay} />}
            />

            {/* adding prefered working hours modal (by date) */}
            <Modal isVisible={HidePWH}>
                <View style={{ height: metrics.screenHeight * .25, alignItems: 'flex-end', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 4, padding: 10 }}>
                    <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 25, color: 'blue', }}>Settings</Text>
                        <Ionicons
                            onPress={() => setHidePWH(false)}
                            name="ios-close-circle"
                            size={30}
                            color="red" />
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                        <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 20 }}>Today Preferred Working Hours</Text>
                        <Switch value={preferredWorkingHours} onValueChange={(value) => setPreferredWorkingHours(value)} />
                    </View>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => {
                        dispatch(noteActions.changePWH(preferredWorkingHours))
                        setHidePWH(false)
                    }}>
                        <Text style={styles.text}>Save</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* filter data modal (by date) */}
            <Modal isVisible={hideFilter}>
                <View style={{ height: metrics.screenHeight * .25, alignItems: 'flex-end', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 4, padding: 10 }}>
                    <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 25, color: 'blue', }}>Filter By Date</Text>
                        <Ionicons
                            onPress={() => setHideFilter(false)}
                            name="ios-close-circle"
                            size={30}
                            color="red" />
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity
                            activeOpacity={.7}
                            style={{
                                width: '40%',
                                height: 50,
                                backgroundColor: 'orange',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} onPress={() => {
                                setFromOrTo(1)
                                showDatepicker()
                            }}>
                            <Text style={styles.text}>{from}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.7}
                            style={{
                                width: '40%',
                                height: 50,
                                backgroundColor: 'orange',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} onPress={() => {
                                setFromOrTo(0)
                                showDatepicker()
                            }}>
                            <Text style={styles.text}>{to}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => {
                            setFrom('from')
                            setTo('to')
                            setHideFilter(false)
                            dispatch(noteActions.listNotes())
                        }}>
                            <Text style={styles.text}>Clear Filter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => {
                            setHideFilter(false)
                            dispatch(noteActions.
                                listNotes(
                                    from.length == 4 ? undefined : from,
                                    to.length == 2 ? undefined : to
                                )
                            )
                        }}>
                            <Text style={styles.text}>Apply Filter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    )



}
