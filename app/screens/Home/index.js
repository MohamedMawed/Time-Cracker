import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, ScrollView, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ModalDropdown from 'react-native-modal-dropdown'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import Modal from "react-native-modal"
import { OutlinedTextField } from 'react-native-material-textfield'
import metrics from 'app/config/metrics'
import * as NavActions from 'app/actions/navigationActions'
import NavigationService from 'app/navigation/NavigationService'
import { useDispatch, useSelector } from 'react-redux'

const NoteCard = ({ Note, onDel, onEdit }) => {
    return (
        <View style={styles.cardStyle}>
            <View style={{ flex: 17 }}>
                <Text>
                    {Note.note}
            </Text>
                <View style={{ height: 2, width: '100%', backgroundColor: 'lightgray', marginVertical: 5 }} />
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text> from : {Note.from}</Text>
                    <Text> ▶ to : {Note.to}</Text>
                </View>
            </View>
            <View style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Ionicons
                    onPress={() => onDel(Note.id)}
                    name="ios-close-circle"
                    size={30}
                    color="red" />
                <MaterialIcons onPress={() => onEdit(Note)} style={{ flex: 2 }} name="edit" size={25} color="green" />

            </View>
        </View>

    )
}
export default function Home() {
    const dispatch = useDispatch()
    let data = [
        'Add Note',
        'Prefered Working Hours',
        'Export View'];
    const [hideFilter, setHideFilter] = useState(false)
    const [HidePWH, setHidePWH] = useState(false)

    const deleteNote=(NoteId)=>{
        // show in the delete alert before deleting the item
        // if yes 
        // dispatch the delete Note action

    }

    const editNote=(Note)=>{
        // got to the edit page to edit this note and them come back
        NavigationService.navigate("EditNote" , {Note} )
        // dispatch the edit Note action
    }

    return (
            <View style={styles.container}>
                {/* this is the header compontent */}
                <View style={styles.headerStyle}>
                    <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 20, color: 'white', flex: 12 }}>Mohamed Mawed</Text>
                    <FontAwesome5 onPress={() => setHideFilter(true)} style={{ flex: 2 }} name="filter" size={25} color="white" />
                    <ModalDropdown
                        defaultValue={"..."}
                        textStyle={{ fontSize: 50, color: 'white', textAlignVertical: 'top', width: '100%', height: 100 }}
                        renderButtonText={() => '...'}
                        Style={{ flex: 2 }}
                        dropdownStyle={{ height: 'auto' }}
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
                                    return 'Final Step'
                                default:
                                    return 'foo';
                            }
                        }}
                    >
                        <Entypo name="dots-three-vertical" size={25} color="white" />
                    </ModalDropdown>
                </View>

                {/* this is for the Note Card With Actions */}
                <FlatList
                contentContainerStyle={{alignItems:'center'}}
                    data={[
                        {
                            id: 1,
                            note: "I am a note for you my friendI am a note for you my friendI am a note for you my friend",
                            from: '03/01/2020',
                            to: '03/07/2020',
                        },
                        {
                            id: 2,
                            note: "I am a note for you my friendI am a note for you my friendI am a note for you my friend",
                            from: '03/01/2020',
                            to: '03/07/2020',
                        },
                        {
                            id: 3,
                            note: "I am a note for you my friendI am a note for you my friendI am a note for you my friend",
                            from: '03/01/2020',
                            to: '03/07/2020',
                        },
                        {
                            id: 4,
                            note: "I am a note for you my friendI am a note for you my friendI am a note for you my friend",
                            from: '03/01/2020',
                            to: '03/07/2020',
                        },
                        {
                            id: 5,
                            note: "I am a note for you my friendI am a note for you my friendI am a note for you my friend",
                            from: '03/01/2020',
                            to: '03/07/2020',
                        },
                        {
                            id: 6,
                            note: "I am a note for you my friendI am a note for you my friendI am a note for you my friend",
                            from: '03/01/2020',
                            to: '03/07/2020',
                        },
                        {
                            id: 7,
                            note: "I am a note for you my friendI am a note for you my friendI am a note for you my friend",
                            from: '03/01/2020',
                            to: '03/07/2020',
                        },
                    ]}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <NoteCard Note={item} onDel={deleteNote} onEdit={editNote} />}
                />

                {/* adding prefered working hours modal (by date) */}
                <Modal isVisible={HidePWH}>
                    <View style={{ height: metrics.screenHeight * .35, alignItems: 'flex-end', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 4, padding: 10 }}>
                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 16, color: 'blue', }}>Today Preferred Working Hours</Text>
                            <Ionicons
                                onPress={() => setHidePWH(false)}
                                name="ios-close-circle"
                                size={30}
                                color="red" />
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                            <OutlinedTextField
                                containerStyle={styles.input}
                                label='From Hour'
                            />
                            <OutlinedTextField
                                containerStyle={styles.input}
                                label='To Hour'
                            />
                        </View>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => alert('save')}>
                            <Text style={styles.text}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* filter data modal (by date) */}
                <Modal isVisible={hideFilter}>
                    <View style={{ height: metrics.screenHeight * .35, alignItems: 'flex-end', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 4, padding: 10 }}>
                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 16, color: 'blue', }}>Filter By Date</Text>
                            <Ionicons
                                onPress={() => setHideFilter(false)}
                                name="ios-close-circle"
                                size={30}
                                color="red" />
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                            <OutlinedTextField
                                containerStyle={styles.input}
                                label='Date From'
                            />
                            <OutlinedTextField
                                containerStyle={styles.input}
                                label='Date To'
                            />
                        </View>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => alert('save')}>
                            <Text style={styles.text}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
    );
}
