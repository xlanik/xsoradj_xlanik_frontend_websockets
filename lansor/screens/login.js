import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import NormalButton from '../components/normalButton';
import ConfirmButton from '../components/confirmButton';



// Add URL to the server which will contain the server side setup
//const ws = new WebSocket('wss://wslansormtaa.herokuapp.com')   //trebalo to dat na klasu, inac to pri vyplnenych udajov neslo posielat ;)
var ws = React.useRef(new WebSocket('wss://wslansormtaa.herokuapp.com')).current;

export default function Login({ navigation }) {

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

    // When a connection is made to the server, send the user ID so we can track which
    // socket belongs to which user
    ws.onopen = () => {
      console.log("Login - soket otvoreny");
    }

    // Ran when teh app receives a message from the server
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

  const pressLoginHandle = async () => {

    const userCredentials = {
      name: name,
      password: password
    }

    const fetchObj= {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials)
    }

  
    try {
      const response = await fetch(`https://lansormtaa.herokuapp.com/login`, fetchObj);
      const userJsonRes = await response.json();
      console.log(userJsonRes);
     
      //Zistenie podla udajov, ci pokracujeme ako customer alebo technik, alebo boli nespravne udaje
      if(userJsonRes.loginCustomer) navigation.navigate('CustomerProfile', userJsonRes);
      if(userJsonRes.loginTechnician) navigation.navigate('TechnicianProfile', userJsonRes);
      if(userJsonRes.message){
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

    return;
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../logo.png')} />
        <Text style={styles.name}> Autoservis LanSor</Text>

        <TextInput style={styles.input} placeholder="Prihlasovacie meno"  onChangeText={(value) => setName(value)} />
        <TextInput style={styles.input} placeholder="Heslo"   onChangeText={(value) => setPassword(value)} secureTextEntry={true} />
        <ConfirmButton title={'Prihlásiť sa'} onPress={pressLoginHandle}></ConfirmButton>
        <ConfirmButton title={'Prihlásiť sa WEBSOKET'} onPress={pressLoginHandleWS}></ConfirmButton>
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
