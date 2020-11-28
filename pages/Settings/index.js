import React, { useState } from 'react'
import { Text, View, TextInput , Alert, Platform , Vibration} from 'react-native';
import styles from './styles'
import { useRoute , useNavigation} from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { nanoid } from 'nanoid/async/index.native'
import * as Notifications from 'expo-notifications'

export default function Settings() {
  const { params } = useRoute()
  const [date, setDate] = useState(new Date(Date.now()))
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState('');
  const navigation = useNavigation()
  const [altertedAt, setAltertedAt] = useState(date)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setAltertedAt(currentDate)
  };

  const showDatepicker = () => {
    if(!params)
      setShow(true);
  };

  const showDelAlert = () => {
    Alert.alert(
      "Deseja excluir este alerta?",
      "Esta ação não poderá ser desfeita",
      [
        {
        text: "Não",
        onPress: () => {}
        },
        {
          text: "Sim",
          onPress: async () => {
            const id = params.item.id;
            const notificationId = params.item.notificationId
            await Notifications.cancelAllScheduledNotificationsAsync(notificationId)
            AsyncStorage.removeItem(id).then( () =>  {
              Alert.alert('Excluído com sucesso!')
              navigation.navigate('Lista', {refresh: true})
            })
          }
        }
      ])
  }

  const showSaveAlert = async () => {
    Alert.alert(
      "Deseja salvar este alerta?",
      "Certifique-se de ter preenchido tudo corretamente",
      [
        {
        text: "Não",
        onPress: () => {}
        },
        {
          text: "Sim",
          onPress: async () => {
            const id = await nanoid(5)
            const title = 'Alimento próximo ao vencimento!'
            const body = `Atenção, o alimento ${product} vencerá em ${date.toLocaleDateString("pt-br")}`
            scheduleNotification(title, body, altertedAt).then( notificationId => {
              const item = {
                data: date.toLocaleDateString("pt-br"),
                name: product,
                id,
                altertedAt: altertedAt.toLocaleDateString("pt-br"),
                notificationId
              }
              AsyncStorage.setItem(id, JSON.stringify(item)).then( () => {
                Alert.alert('Salvo com sucesso!')
                navigation.navigate('Lista', {refresh: true})
              })
            }).catch( err => {
              Alert.alert("Erro",err)
            })
          }
        }
      ])
  }

    return (
      <View style={styles.container}>

        <View style={styles.box}>
          <Text style={styles.product}>Produto: </Text>
          <TextInput style={styles.input} editable={params ? false : true} value={params ? params.item.name : product} onChangeText={text => {setProduct(text)}}/>
        </View>

        <View style={styles.box}>
          <Text style={styles.product}>Validade: </Text>
          <Text style={styles.input} onPress={showDatepicker}>{params ? params.item.data : date.toLocaleDateString("pt-br")}</Text>
          {show && (<DateTimePicker 
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
          />)}
        </View>

        <View style={styles.boxAlertDate}>
          <Text style={styles.boxAlertDateText}>Você receberá o alerta em</Text>
          <Text style={{...styles.boxAlertDateText, fontStyle:"italic"}}>{params ? params.item.altertedAt : altertedAt.toLocaleDateString("pt-br")}</Text>
          </View>

        {!params && 
          <View style={styles.boxSetAlertDate}>
            <Text style={styles.boxSetAlertDateText}>Com quantos dias de antecedência você deseja receber o alerta ?</Text>
            <TextInput
            onChangeText={value => {
              if(value){
                let dateAux = new Date()
                dateAux.setDate(altertedAt.getDate() - Number(value))
                setAltertedAt( dateAux )
              }
              else
                setAltertedAt(date)
            } }
            style={styles.boxSetAlertDateInput}
            keyboardType="number-pad"/>
          </View>
        }

        {params && <View style={styles.boxTrash}>
          <TouchableOpacity onPress={showDelAlert}>
            <FontAwesome5 name="trash" size={35} color="black"/>
          </TouchableOpacity>
        </View>}

        {!params && <View style={styles.boxTrash}>
          <TouchableOpacity onPress={showSaveAlert}>
            <FontAwesome5 name="save" size={45} color="black" />
          </TouchableOpacity>
        </View>}
      </View>
    );
  }

async function scheduleNotification(title, body, date){
  if(date.getDate() === new Date(Date.now()).getDate())
    date = date.getTime() + 5000
  return await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body
    },
    trigger: {
      date
    }
  })
}