import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableWithoutFeedback, Alert, Keyboard, Image } from 'react-native';
import NormalButton from '../components/normalButton';
import ConfirmButton from '../components/confirmButton';

export default function Register( {navigation}) {

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const pressHandlerBack = () => {
    navigation.navigate('Login');
  }

  const pressHandlerRegister = async () => {

    if(!name || !phoneNumber || !email || !password){ //validacia povinnych poli
      Alert.alert(
        "Neúspešná registrácia",
        "Prosím vyplnte všetky povinné polia",
        [
          { text: "OK", onPress: () => console.log("Nevyplnene polia") }
        ]
      );

      return;
    }

    const userCredentials = {
      name: name,
      phoneNumber: phoneNumber,
      email, email,
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

      const response = await fetch(`https://lansormtaa.herokuapp.com/Customers`, fetchObj);
      const userJsonRes = await response.json();
      console.log(userJsonRes.message);

      if(userJsonRes.name) {  //staci ked vrati menoa  viem, ze prebehla okej
        Alert.alert(
          "Registrácia úspešná",
          "Ste presmerovaný na úvodnú stránku",
          [
            { text: "OK", onPress: () => console.log("Zly register alert") }
          ]
        );
        navigation.navigate('Login', userJsonRes);
      } 
      if(userJsonRes.message){
        console.log("som tu")
        Alert.alert(
          "Neúspešná registrácia",
          userJsonRes.message,
          [
            { text: "OK", onPress: () => console.log("Zly register alert") }
          ]
        );
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../logo.png')} />
        <Text style={styles.name}> Vyplňte registráciu</Text>

        <TextInput style={styles.input} placeholder="Prihlasovacie meno*" onChangeText={(value) => setName(value)} />
        <TextInput style={styles.input} placeholder="Telefónne číslo*" keyboardType = 'numeric' onChangeText={(value) => setPhoneNumber(value)} />
        <TextInput style={styles.input} placeholder="Email*" onChangeText={(value) => setEmail(value)} />
        <TextInput style={styles.input} placeholder="Heslo*" onChangeText={(value) => setPassword(value)} secureTextEntry={true} />
        <ConfirmButton title={'Registrovať sa'} onPress={pressHandlerRegister}></ConfirmButton>
        <NormalButton title={'Späť na úvod'} onPress={pressHandlerBack}></NormalButton>
        
      </View>
    </TouchableWithoutFeedback>
  );
  }


  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#D5E2EB',
      alignItems: 'center',
      justifyContent: 'center',
    
    },
    name:{
      fontWeight: 'bold',
      fontSize: 25
    },
    input:{
      borderWidth: 1,
      borderColor: '#C9C8C7',
      backgroundColor: '#fff',
      padding: 8,
      marginTop: 15,
      width: 200,
    },
    logo:{
      height: 80,
      width: 90,
    },
  });
  


