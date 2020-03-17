import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, FlatList, Alert, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import * as workingDayActions from 'app/actions/workingDayActions'




const WorkingDay = ({ workingDay, onDel, }) => {

    return (
        <View style={[styles.cardStyle, { backgroundColor: 'white' }]}>
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
            </View>
        </View>

    )
}
export default function Home({route}) {
    const dispatch = useDispatch()
    const [user, setUser] = useState(route.params ? route.params.user : {})
    const notes = useSelector(state => state.workingDayReducer.userWorkingDays)
   
    const [notesloading, setNotesloading] = useState(false)
    const loadWorkingDays = () => dispatch(workingDayActions.listWorkingDaysForUser(user.user_id))

    useEffect(() => {
        loadWorkingDays()
        // loadSettings()
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
                { text: 'OK', onPress: () => dispatch(workingDayActions.delNote(NoteId)) },
            ]
        )
    }



    return (
        <View style={styles.container}>
            {/* this is the header compontent */}
            <View style={styles.headerStyle}>
                <Text style={styles.headerText}>{user ? user.username : 'Home'}</Text>
            </View>

            {/* this is for the Note Card With Actions */}
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                data={notes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <WorkingDay workingDay={item} onDel={deleteWorkingDay} />}
            />

        </View>
    )



}
