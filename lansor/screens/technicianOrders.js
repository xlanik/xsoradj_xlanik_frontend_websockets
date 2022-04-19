import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import TechnicianOrderItem from '../components/technicianOrderItem';

export default function TechnicianOrders( {navigation} ) {
  
  const technicianOrders = navigation.getParam('');
  //console.log(technicianOrders);

  const updateRepairedStatus = async (id, description) => {

    const carUpdate = {
      state: "repaired",
      description: description,
    }
    
    console.log(carUpdate);

    const fetchObj= {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carUpdate)
    }

    try {

      const response = await fetch(`https://lansormtaa.herokuapp.com/Cars/${id}`, fetchObj);
      const updateCarJsonRes = await response.json();
      console.log(updateCarJsonRes);
     
    } catch (error) {
      console.error(error);
    }

    navigation.navigate('TechnicianProfile');
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
        { text: "Rozumiem", onPress: () => updateRepairedStatus(item._id, description) }
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