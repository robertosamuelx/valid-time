import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff3f0',
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    headerTextInput: {
        backgroundColor: '#fac4b6',
        marginBottom: 25,
        borderRadius: 8,
        fontSize: 16,
        height: 40,
        paddingLeft: 10,
        color: '#000',
        width: '90%'
    },
    pbox: {
        borderRadius: 15,
        backgroundColor: '#fac4b6',
        padding: 20,
        marginBottom: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    pboxRight: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pboxText: {
        color: '#fff',
        fontWeight: "bold"
    },
    plusButton: {
        borderWidth: 0, 
        position: 'absolute', 
        bottom: 25, 
        right: 20, 
        alignSelf: 'flex-end'
    },
    refreshButton: {
        borderWidth: 0, 
        position: 'absolute', 
        bottom: 25, 
        left: 20, 
        alignSelf: 'flex-end'
    }
})