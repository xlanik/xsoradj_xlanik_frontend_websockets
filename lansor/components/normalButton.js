import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function NormalButton({ onPress, title }) {

  return (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#2C2C2C",
      borderRadius: 15,
      paddingVertical: 5,
      paddingHorizontal: 5,
      marginTop: 20,
      width: 200,
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
      
    }
  });