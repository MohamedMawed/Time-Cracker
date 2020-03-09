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
    userTextStyle: {

    },
    cardStyle:{
        width: metrics.screenWidth * .95,
        borderRadius: 4,
        borderColor: '#F1F2F3',
        borderWidth: 1.5,
        elevation: 1.5,
        padding: 10,
        marginTop:10,
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 40,
        color: 'white',
        fontWeight: '200',
        backgroundColor: '#1967D2',
        borderRadius: 20,
        padding: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: metrics.screenWidth * .3,
        height: metrics.screenWidth * .3,
    },
    headerStyle:{
        width: '100%',
        height: 50,
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
        width: metrics.screenWidth * .4,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
});

export default styles;
