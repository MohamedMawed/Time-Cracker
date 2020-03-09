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
        height : 60
    },
    headerStyle:{
        width: '100%',
        height: metrics.screenHeight*.1,
        backgroundColor: '#6200EE',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        elevation: 5
    },
    loginBtn: {
        marginTop:metrics.screenHeight*.1,
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
});

export default styles;
