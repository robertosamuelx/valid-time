import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff3f0',
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 10,
        marginBottom: 25
    },
    input: {
        backgroundColor: '#fac4b6',
        height: 40,
        width: '65%',
        fontSize: 20,
        padding: 5,
        borderRadius: 8
    },
    product: {
        fontSize: 24
    },
    boxTrash: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: '10%'
    },

    boxAlertDate : {
        alignItems: 'center',
        marginTop: 30
    },
    boxAlertDateText: {
        fontSize: 20,
        fontWeight: "bold"
    },

    boxSetAlertDate: {
        alignItems: 'center',
        marginTop: 30,
    },
    boxSetAlertDateText: {
        padding: 5,
        fontSize: 20,
        textAlign: 'center'
    },
    boxSetAlertDateInput: {
        backgroundColor: '#fac4b6',
        width: '50%',
        height: 40,
        marginTop: 10
    }
})