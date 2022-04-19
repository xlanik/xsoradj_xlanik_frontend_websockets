import React, {useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function TechnicianAvailableItem({pressHandleTechChoice, item }) {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => pressHandleTechChoice(item)}>
        <Text style={styles.item}>{item.name} - ID: {item._id.slice(-5)}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D5E2EB',
    padding: 10,
  },
  item: {
    padding: 15,
    marginTop: 1,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 1,
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
  },
});