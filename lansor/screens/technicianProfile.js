import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image} from 'react-native';

var ws = new WebSocket('ws://192.168.0.109:3000/')   
export default function CustomerProfile({ navigation }) {

  const technician = navigation.getParam('loginTechnician')
  
  useEffect(() => {
    initiateSocketConnection()
  }, [])

  const initiateSocketConnection = () => {

    ws.onopen = () => {
      console.log("Soket otvoreny");
    }

    // Ran when teh app receives a message from the server
    ws.onmessage = (e) => {
      const message = (e.data)
      const techCarsData = JSON.parse(message);
      console.log(techCarsData.message);

      try {
        if(techCarsData.information == 'orders'){
         
          if(techCarsData.message){  //prisla error sprava, nema zakazky
         
            Alert.alert(
              "Žiadne aktívne zákazky",
              "Momentálne nemáte zákazku",
              [
                { text: "OK", onPress: () => console.log("Ziadne zakazky alert") }
              ]
            );

            return;
          }
          
          navigation.navigate('TechnicianOrders', {'': JSON.parse(techCarsData.data)});   //musi sa to zabalit do objektu....
        }

        if(techCarsData.information == 'history'){
          if(techCarsData.message){  //prisla error sprava, nema zakazky
            Alert.alert(
              "Prazdna historia",
              "Nie su evidovane ziadne opravene auta",
              [
                { text: "OK", onPress: () => console.log("Prazdna historia alert") }
              ]
            );
  
            return;
          }
          
          navigation.navigate('TechnicianOrderHistory', {'': JSON.parse(techCarsData.data)});   //musi sa to zabalit do objektu....

        }
  
      } catch (error) {
        console.error(error);
      }
    }
  }

  const pressHandlerOdrdersWS = async () => {
    
    ws.send(JSON.stringify({ 
      information: 'TechniciansCarsID',
      data: JSON.stringify(technician._id)
    }));
    return;
  }

  const pressHandlerHistoryWS = async () => {
    ws.send(JSON.stringify({ 
      information: 'RepairedCars',
      method: 'GET'
    }));
    return;
  }

  const pressHandlerLogout = () => {  //skuska na tie data
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require('../logo.png')} />
        <Text style={styles.name}> Vitajte {technician.name}</Text>
        <Text> Vaše identifikačné číslo: {technician._id.slice(-5)}</Text>
        
        <View style={styles.button}>
          <Button title='Moje zákazky' onPress={pressHandlerOdrdersWS} />
        </View>
        <View style={styles.button}>
          <Button title='História opravených áut' onPress={pressHandlerHistoryWS} />
        </View>

        <View style={styles.button}>
          <Button title='Odhlásiť sa' onPress={pressHandlerLogout} />
        </View>
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
  info:{
    padding: 8,
    flexDirection: "row",
  },
  name:{
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 15,
  },
  button:{
    marginTop: 50,
    width: 250,
  },
  logo:{
    height: 80,
    width: 90,
  },
});