import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import NormalButton from '../components/normalButton';
import ConfirmButton from '../components/confirmButton';



// Add URL to the server which will contain the server side setup
//var ws = new WebSocket('wss://wslansormtaa.herokuapp.com')   //trebalo to dat na klasu, inac to pri vyplnenych udajov neslo posielat ;)
//var ws = React.useRef(new WebSocket('wss://wslansormtaa.herokuapp.com')).current;

//NA XIAMO A1 trebalo v nastaveniach mobilu -> v aplikacie Expo nastavit, ze sa to da zobrazit aj cez ine aplikacie
//var ws = new WebSocket('ws://wslansormtaa.herokuapp.com/')   //trebalo to dat na klasu, inac to pri vyplnenych udajov neslo posielat ;)
var ws = new WebSocket('ws://192.168.0.109:3000/')
export default function Login({ navigation }) {
  //var ws = new WebSocket('wss://wslansormtaa.herokuapp.com')   //trebalo to dat na klasu, inac to pri vyplnenych udajov neslo posielat ;)
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const pressHandlerRegister = () => {
    navigation.navigate('Register');
  }

  //https://blog.logrocket.com/how-to-implement-websockets-in-react-native/
  //https://reactnative.dev/docs/network
  //https://jaygould.co.uk/2021-02-25-using-websockets-react-native-node-js/
  useEffect(() => {
    initiateSocketConnection()
  }, [])

  const initiateSocketConnection = () => {

    
    ws.onopen = () => {
      //console.log(ws);
      console.log("Soket otvoreny");
    }

    // ak pride sprava z backendu
    ws.onmessage = (e) => {
      const message = (e.data)
      const userData = JSON.parse(message);
      console.log(userData);

      try {
        //Zistenie podla udajov, ci pokracujeme ako customer alebo technik, alebo boli nespravne udaje
        if(userData.loginCustomer) navigation.navigate('CustomerProfile', userData);
        if(userData.loginTechnician) navigation.navigate('TechnicianProfile', userData);
        if(userData.message){
          Alert.alert(
            "Nesprávne prihlasovacie údaje",
            "Prosím skontrolujte správnosť mena a hesla",
            [
              { text: "OK", onPress: () => console.log("Zly login alert") }
            ]
          );
        }
      } catch (error) {
          console.error(error);
      }
    }
  }

  const pressLoginHandleWS = async () => {
    const userCredentials = {
      name: name,
      password: password
    }
    ws.send(JSON.stringify({ 
      information: 'loginCustomer',
      data: JSON.stringify(userCredentials)
    }));
    return;
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../logo.png')} />
        <Text style={styles.name}> Autoservis LanSor</Text>

        <TextInput style={styles.input} placeholder="Prihlasovacie meno"  onChangeText={(value) => setName(value)} />
        <TextInput style={styles.input} placeholder="Heslo"   onChangeText={(value) => setPassword(value)} secureTextEntry={true} />
        <ConfirmButton title={'Prihlásiť sa'} onPress={pressLoginHandleWS}></ConfirmButton>
        <NormalButton title={'Registrácia'} onPress={pressHandlerRegister}></NormalButton>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:    '#D5E2EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name:{
    fontWeight: 'bold',
    fontSize: 30
  },
  input:{
    borderWidth: 1,
    borderColor: '#C9C8C7',
    backgroundColor: '#fff',
    padding: 8,
    marginTop: 30,
    width: 200,
  },
  logo:{
    height: 120,
    width: 140,
  },
});
