import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, Text, View, Image, TextInput} from 'react-native';

export default function TechnicianOrderItem({ pressHandlerRepaired, item }) {
  
  const [desc, setDesc] = useState('');

  var serviceActions = 'Potrebné úkony: ';
  var carState = "Potvrdiť dokončenie servisu";
  if(item.oilChange) serviceActions = serviceActions + '| výmena oleja |';
  if(item.filterChange) serviceActions = serviceActions + '| výmena filtrov |';
  if(item.tireChange) serviceActions = serviceActions + '| prezutie pneu |';
  if(item.engineService) serviceActions = serviceActions + '| servis motora |';
  if(item.state == "repaired") carState = "Vyservisované, čaká sa na potvrdenie zákazníka"
  const base64Image = item.image_url;
  //console.log(base64Image);

  return (
  
    <View style={styles.container}>
      <Text style={styles.name}>{item.brand} {item.model}</Text>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.item}>Rok výroby: {item.year}</Text>
      <Text style={styles.item}>Ev. číslo: {item.number_plate}</Text>
      <Text style={styles.item}>Info: {item.description}</Text>
      <Text style={styles.item}>{serviceActions}</Text>
      <TextInput
        multiline 
        placeholder='Doplňte informácie servise...' 
        style={styles.input}
        onChangeText={(value) => setDesc(value)} />
      <TouchableOpacity onPress={() => pressHandlerRepaired(item, desc)}>
        <Text style={styles.itemConfirm}>{carState}</Text>
      </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 15
  },
  name:{
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 5,
  },
});