import { StyleSheet } from 'react-native';
import metrics from 'app/config/metrics'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%', height: metrics.screenHeight,
    },
    input: {
        width: metrics.screenWidth * .3,
    },
    notesParent: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5,
        fontFamily: 'Sen-Bold'
    },
    notesContainer: {
        paddingLeft: 20,
        borderRadius: 4,
        elevation: 1,
        backgroundColor: 'lightgray',
    },
    dateText: {
        fontFamily: 'Sen-Bold',
        fontSize: 18
    },
    noteItem: {
        color: 'black',
        marginVertical: 5,
        fontSize: 16,
        fontFamily: 'Sen-Regular'
    },
    cardStyle: {
        width: metrics.screenWidth * .95,
        borderRadius: 4,
        borderColor: '#F1F2F3',
        borderWidth: 1.5,
        elevation: 1.5,
        padding: 10,
        marginTop: 10,
        flexDirection: 'row'
    },
    headerStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#6200EE',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        elevation: 5,
        height: metrics.screenHeight * .08
    },
    headerText: {
        fontFamily: 'Sen-Bold',
        fontSize: 20,
        color: 'white',
        flex: 12
    },
    loginBtn: {
        backgroundColor: 'green',
        borderRadius: 3,
        color: '#ffffff',
        width: metrics.screenWidth * .4,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    text: {
        fontFamily: 'Sen-Bold',
        fontSize: 20,
        color: 'white'
    },
});

export default styles;
