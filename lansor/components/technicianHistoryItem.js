import React, {useState} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native';

export default function TechnicianHistoryItem({ item }) {
  

    var formatedDate = item.last_service.slice(0, 10);
    //console.log(formatedDate);
  
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.brand} {item.model}</Text>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.item}>Rok výroby: {item.year}</Text>
      <Text style={styles.item}>Ev. číslo: {item.number_plate}</Text>
      <Text style={styles.item}>Informácie: {item.description}</Text>
      <Text style={styles.item}>Posledný servis: {formatedDate}</Text>
      <Text style={styles.item}>Servis vykonal: {item.technician_id.slice(-5)}</Text>
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
    padding: 30,
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
  }
});