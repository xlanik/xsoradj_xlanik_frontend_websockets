import React, {isValidElement, useState} from 'react'
import {StyleSheet, TouchableOpacity, Text, View, Image, Button} from 'react-native';

export default function CustomerCarDetailsItem({ pressHandlerConfirmCar, item }) {

  return (
  
    <View style={styles.container}>
      <Text style={styles.name}>{item.brand} {item.model}</Text>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.item}>Rok výroby: {item.year}</Text>
      <Text style={styles.item}>Ev. číslo: {item.number_plate}</Text>
      <Text style={styles.item}>Popis zákazky: {item.description}</Text>
      <Text style={styles.item}>Identifikačné číslo technika: {item.technician_id.slice(-5)}</Text>

      {item.state == "repaired" ? 
      <TouchableOpacity onPress={() => pressHandlerConfirmCar(item)}>
        <Text style={styles.itemConfirm}>Vozidlo opravené - potvrdiť prevzatie</Text>
      </TouchableOpacity> : 
      <Text style={styles.itemConfirmNotReady}>Vozidlo sa momentálne servisuje</Text>}
    </View>
     
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#D5E2EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#bbb',
    borderWidth: 1,
    padding: 20,
  },
  name:{
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 5,
  },
  item: {
    padding: 16,
    marginTop: 5,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 1,
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    
  },
  image: {
    width: 200, 
    height: 150,
    resizeMode: "contain",
    borderRadius: 5,
  },
  itemConfirm:{
    padding: 16,
    marginTop: 5,
    borderColor: '#434942',
    borderWidth: 1,
    borderRadius: 2,
    borderRadius: 10,
    backgroundColor: '#B7E3AE'
  },
  itemConfirmNotReady:{
    padding: 16,
    marginTop: 5,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 2,
    borderRadius: 10,
    backgroundColor: '#FBF9C4'
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
  button:{
    marginTop: 5,
    width: 180,
  }
});