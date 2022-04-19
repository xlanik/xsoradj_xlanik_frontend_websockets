import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import TechnicianHistoryItem from '../components/technicianHistoryItem';

export default function TechnicianOrderHistory( {navigation} ) {
  
  const orderHistory = navigation.getParam('');

  return (
    
      <View style={styles.container}>
        <View style={styles.list}>
          <FlatList
            data={orderHistory}
            renderItem={({item}) => <TechnicianHistoryItem item={item}/>}
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