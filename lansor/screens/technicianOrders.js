import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import TechnicianOrderItem from '../components/technicianOrderItem';

var ws = new WebSocket('ws://wslansormtaa.herokuapp.com/')   //trebalo to dat na klasu, inac to pri vyplnenych udajov neslo posielat ;)
export default function TechnicianOrders( {navigation} ) {
  
  const technicianOrders = navigation.getParam('');
  //console.log(technicianOrders);
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
      const userData = JSON.parse(message);
      console.log(userData);

      navigation.navigate('TechnicianProfile');
    }
  }

  const updateRepairedStatusWS = async (id, description) => {
    const carUpdate = {
      state: "repaired",
      description: description,
      id: id
    }
    
    console.log(carUpdate);

    ws.send(JSON.stringify({ 
      information: 'CarsID',
      method: 'PATCH',
      data: JSON.stringify(carUpdate)
    }));

  }


  const pressHandlerRepaired = (item, description) => {

    if(description == "") description = `Technik ${item.name} nevyplnil údaje o aute`;
    //console.log(item._id);

    if(item.state == "repaired"){
      Alert.alert(
        "Upozornenie",
        "Toto vozidlo už je vyservisované...",
        [
          { text: "Rozumiem"}
        ])
        
        return;
    }

    Alert.alert(
      "Je vozidlo naozaj servisované?",
      "Vozidlo sa zákazníkovi označí ako pripravené. Po jeho potvrdení bude toto vozidlo v histórii opravených áut.",
      [
        {
          text: "Zrušiť",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Rozumiem", onPress: () => updateRepairedStatusWS(item._id, description) }
      ])

    return;
  };

  return (
    
      <View style={styles.container}>
        <View style={styles.list}>
          <FlatList
            data={technicianOrders}
            renderItem={({item}) => <TechnicianOrderItem item={item} pressHandlerRepaired={pressHandlerRepaired}/>}
            keyExtractor={(item, index) => index.toString()}
          />
          
        </View>
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5E2EB',
  },
  list: {
    marginTop: 20,
    maxWidth: 350,
    paddingLeft: 10
  },
});