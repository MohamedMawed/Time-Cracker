import { StyleSheet } from 'react-native';
import metrics from 'app/config/metrics'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%', height: '100%',
    },
    input: {
        width: metrics.screenWidth * .835,
    },
    dateTime: {
        width: metrics.screenWidth * .4,
    },
    formContainer: {
        justifyContent: 'center',
        width: metrics.screenWidth,
        alignItems: 'center'
    },
    dateField: {
        width: metrics.screenWidth * .4,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange'
    },
    headerStyle: {
        width: '100%',
        height: metrics.screenHeight * .08,
        backgroundColor: '#6200EE',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Sen-Bold',
        fontSize: 25,
        color: 'white'
    },
    saveBtn: {
        marginTop: metrics.screenHeight * .05,
        backgroundColor: 'green',
        borderRadius: 3,
        color: '#ffffff',
        width: metrics.screenWidth * .4,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    seperator: {
        height: 10,
    },
    seperator1: {
        height: 20,
    },
    notesContainer: {
        width: metrics.screenWidth * .835,
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'blue',
        flexDirection: 'row',
    },
    parentText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Sen-Bold',
        marginLeft: 5
    },
    parentBtn: {
        width: 60,
        height: 60,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noteContainer: {
        width: metrics.screenWidth * .835,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 10,
    },
    parentRemoveBtn: {
        width: 55,
        height: 55,
        marginBottom: 8,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontFamily: 'Sen-Bold',
        fontSize: 18,
        textAlign: 'center',
        flex: 1
    },
});

export default styles;
