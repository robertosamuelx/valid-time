import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Settings from './pages/Settings'
import List from './pages/List'

const Stack = createStackNavigator()

const styles = {
    headerStyle: {
        backgroundColor: '#fab09d'
    }, 
    headerTintColor: '#fff'
}

export default function Router(){
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={styles}>
                <Stack.Screen name="Lista" component={List} />
                <Stack.Screen name="Configurações" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}