import { StyleSheet } from 'react-native';
import metrics from 'app/config/metrics'
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default styles;
