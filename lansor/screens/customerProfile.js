import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert} from 'react-native';
import NormalButton from '../components/normalButton';
import ConfirmButton from '../components/confirmButton';

var ws = new WebSocket('ws://192.168.0.109:3000/')

export default function CustomerProfile({ navigation }) {
  const customer = navigation.getParam('loginCustomer')

  //https://blog.logrocket.com/how-to-implement-websockets-in-react-native/
  //https://reactnative.dev/docs/network
  //https://jaygould.co.uk/2021-02-25-using-websockets-react-native-node-js/
  useEffect(() => {
    initiateSocketConnection()
  }, [])

  const initiateSocketConnection = () => {

    ws.onopen = () => {
      console.log("Customer profile - soket otvoreny");
    }

    // Ran when teh app receives a message from the server
    ws.onmessage = (e) => {
      const message = (e.data)
      const customerCars = JSON.parse(message);
      console.log(customerCars);

      try {
        if(customerCars.message){  //prisla error sprava, nema zakazky
          Alert.alert(
            "Žiadne auto v servise",
            "Momentálne nemáte autá u nás servisované.",
            [
              { text: "OK", onPress: () => console.log("Ziadne zakazky alert") }
            ]
          );

          return;
        }
        
        navigation.navigate('CustomerCarDetails', {'': customerCars.customerCars});   //musi sa to zabalit do objektu....
  
      } 
      catch (error) {
        console.error(error);
      }
    }
  }

  const pressHandlerCarDetailsWS = async () => {
    ws.send(JSON.stringify({ 
      information: 'customerCars',
      data: JSON.stringify(customer._id)
    }));
    return;
  }

  //vytvorenie objektu, kedze ako parameter sa daju posielat iba objekty
  const cust_id ={
    customer_id:customer._id,
  }

  const pressHandlerInitOrder = () => {
    navigation.navigate('CustomerInitOrder',cust_id);
  }

  const pressHandlerLogout = () => {  
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
        <Text style={styles.name}> Vitajte {customer.name}</Text>
        <View style={styles.info}>
          <Text>Meno a priezvisko: </Text>
          <Text style={styles.baseText}>{customer.name}</Text>
        </View>

        <View style={styles.info}>
          <Text>Telefónne číslo: </Text>
          <Text style={styles.baseText}>{customer.phoneNumber}</Text>
        </View>

        <View style={styles.info}>
          <Text>Email: </Text>
          <Text style={styles.baseText}>{customer.email}</Text>
        </View>

        <View style={styles.info}>
          <Text>Vaše heslo: </Text>
          <Text style={styles.baseText}>{customer.password}</Text>
        </View>

        <ConfirmButton title={'Objednávka do servisu'} onPress={pressHandlerInitOrder}></ConfirmButton>
        <NormalButton title={'Stav vozidiel v servise'} onPress={pressHandlerCarDetailsWS}></NormalButton>
        <NormalButton title={'Odhlásiť sa'} onPress={pressHandlerLogout}></NormalButton>
      
      </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#D5E2EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText:{
    fontWeight: "bold",
  },
  info:{
    padding: 8,
    flexDirection: "row",
    marginTop: 10,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 1,
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
  },
  name:{
    fontWeight: 'bold',
    fontSize: 35,
    paddingBottom: 20
  },
  button:{
    marginTop: 30,
    width: 250,
  },
});