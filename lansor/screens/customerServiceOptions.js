import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Switch, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';


export default function CustomerServiceOptions({ navigation }) {

    const [oilChange, setOilChange] = useState(false);
    const [filterChange, setFilterChange] = useState(false);
    const [tyreChange, setTyreChange] = useState(false);
    const [motorService, setMotorService] = useState(false);
    const [description, setDescription] = useState('nevyplnene');

    const toggleSwitchOil = () => setOilChange(previousState => !previousState);
    const toggleSwitchFilter = () => setFilterChange(previousState => !previousState);
    const toggleSwitchTyre = () => setTyreChange(previousState => !previousState);
    const toggleSwitchMotor = () => setMotorService(previousState => !previousState);


    const pressHandlerOrders = () => {

        if(!oilChange && !filterChange && !motorService && !tyreChange){
          Alert.alert(
            "Vyberte aspoň jeden úkon",
            "V opačnom prípade vozidlo netreba servisovať.",
            [
              { text: "Rozumiem", onPress: () => console.log("Nevybral ukon ziadny") }
            ]
          );

          return;
        }

        const car = {
            customer_id : navigation.getParam("customer_id"),
            technician_id : navigation.getParam("technician_id"),
            brand : navigation.getParam("brand"),
            model : navigation.getParam("model"),
            year : navigation.getParam("year"),
            number_plate : navigation.getParam("number_plate"),
            oilChange : oilChange,
            filterChange : filterChange,
            tireChange : tyreChange,
            motorService : motorService,
            description: description
        }

        //console.log(car);

        navigation.navigate('CustomerImageUpload',car);
    }

    

    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <View style={styles.container}>
         <View style={styles.checkboxContainer}>
           <View style={styles.option}>
            <Text style={styles.label}>Výmena oleja</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={oilChange ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchOil}
              value={oilChange}
              />
          </View>
          
          <View style={styles.option}>
            <Text style={styles.label}>Výmena filtrov</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={filterChange ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchFilter}
              value={filterChange}
              />
          </View>

          <View style={styles.option}>
            <Text style={styles.label}>Výmena pneumatík</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={tyreChange ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchTyre}
              value={tyreChange}
              />
          </View>

          <View style={styles.option}>
            <Text style={styles.label}>Servis motora</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={motorService ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchMotor}
              value={motorService}
              />
          </View>

          <TextInput
            multiline 
            placeholder='Doplňujúce informácie...' 
            style={styles.input}
            onChangeText={(value) => setDescription(value)} />

            <View style={styles.button}>
              <Button title='Pokračuj na upload obrázku' onPress={pressHandlerOrders} />
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>

          
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#D5E2EB",
    },
    option:{
      flexDirection: "row",
    },
    checkboxContainer: {
      flexDirection: "column",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: '#777',
      padding: 15,
      margin: 10,
      width: 280,
      height: 100,
      backgroundColor: "#fff",
      borderRadius: 20,
    },
    label: {
      margin: 15,
      paddingRight: 35,
      fontSize: 20
    },
    button:{
      marginTop: 50,
      width: 280,
    }
  });
  