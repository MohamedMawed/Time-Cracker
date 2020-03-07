import { StyleSheet } from 'react-native';
import metrics from 'app/config/metrics'
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 40,
        color: 'white',
        fontWeight: '200',
        backgroundColor: '#1967D2',
        borderRadius: 150,
        padding: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: metrics.screenWidth * .5,
        height: metrics.screenWidth * .5,
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
