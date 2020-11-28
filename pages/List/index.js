import React, { useState, useEffect, useRef } from 'react'
import { Text, View, TouchableOpacity , FlatList, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Foundation } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowAlert: true
  })
})

export default function List() {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const notificationListener = useRef()
  const responseListener = useRef()
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)

  async function loadProducts(){
    const keys = await AsyncStorage.getAllKeys()
    if(keys != undefined){
      keys[0].length
      let values = []
      keys.forEach(async (key) => {
        const value = JSON.parse(await AsyncStorage.getItem(key))
        values.push(value)
        setProducts(values)
      })
    }
    else {
      setProducts([])
    }
  }

  function filterProducts(filter=''){
    if(filter.length > 0)
      setProducts( products.filter(p => p.name.startsWith(filter) ) )
    else
      loadProducts()
    }

    useEffect(() => {
      loadProducts()

      registerNotifications().then ( token => setExpoPushToken(token))
      notificationListener.current = Notifications.addNotificationReceivedListener( notification => { setNotification(notification)})
      responseListener.current = Notifications.addNotificationResponseReceivedListener (response => { console.log(response) })

    }, [route.params?.refresh])

    function invertOrderProducts(){
      let newProductsList = products.reverse()
      setProducts(newProductsList)
    }


    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <TextInput
          onChangeText={ text => filterProducts(text)}
          style={styles.headerTextInput}/>
          <Entypo name="select-arrows" onPress={() => invertOrderProducts()} style={{bottom: 10}} size={20} color="#000" />
        </View>
        <FlatList
          data={products}
          onEndReachedThreshold={0.2}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {navigation.navigate('Configurações', { item })}}>
              <View style={styles.pbox}>
                <Text style={styles.pboxText}>{item.name}</Text>
                <View style={styles.pboxRight}>
                  <Text style={styles.pboxText}>{item.data}</Text>
                  <AntDesign name="right" size={18} color="#fff"/>
                </View>
              </View>
            </TouchableOpacity>
          )}/>
          <View style={styles.plusButton}>
              <AntDesign style={{backgroundColor: '#fab09d', padding: 5, borderRadius: 25}} name="plus" size={40} color="#fff" onPress={() => {navigation.navigate('Configurações')}}/>
          </View>

          <View style={styles.refreshButton}>
              <Foundation style={{backgroundColor: '#fab09d', padding: 7, borderRadius: 35}} name="refresh" size={40} color="#fff" onPress={() => loadProducts()}/>
          </View>
      </View>
    );
  }

async function registerNotifications(){
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } 
  else {
    Alert.alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}