import { StyleSheet } from 'react-native';
import metrics from 'app/config/metrics'
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
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
        backgroundColor: 'green',
        borderRadius: 3,
        color: '#ffffff',
        width: metrics.screenWidth * .5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    createAtext: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10,
        backgroundColor: 'lightgray',
        padding: 5,
        borderRadius: 4,
        fontSize: 16,
        fontWeight: '200',
    },
    headerText: {
        fontSize: 25,
        color: 'white',
        fontWeight: '200',
        backgroundColor: '#1967D2',
        borderRadius: 150,
        padding: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: metrics.screenWidth * .35,
        height: metrics.screenWidth * .35,
    },
    seperator: {
        height: 10,
    },
    seperator1: {
        height: 20,
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    input: {
        width: metrics.screenWidth * .7,
        height: 50,
    }
});

export default styles;
