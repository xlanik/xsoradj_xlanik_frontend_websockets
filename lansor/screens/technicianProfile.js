import React from 'react';
import { StyleSheet, View, Text, Button, Alert, Image} from 'react-native';

export default function CustomerProfile({ navigation }) {

  const technician = navigation.getParam('loginTechnician')
  

  const pressHandlerOdrders = async () => {
    try {

        const response = await fetch(`https://lansormtaa.herokuapp.com/TechnicianCars/${technician._id}`);
        const ordersJsonRes = await response.json();
        //console.log(ordersJsonRes);
        
  
        if(ordersJsonRes.message){  //prisla error sprava, nema zakazky
          Alert.alert(
            "Žiadne aktívne zákazky",
            "Momentálne nemáte zákazku",
            [
              { text: "OK", onPress: () => console.log("Ziadne zakazky alert") }
            ]
          );

          return;
        }
        
        navigation.navigate('TechnicianOrders', {'': ordersJsonRes});   //musi sa to zabalit do objektu....
  
      } catch (error) {
        console.error(error);
      }
  }

  const pressHandlerHistory = async () => {
    try {

        const response = await fetch(`https://lansormtaa.herokuapp.com/RepairedCars`);
        const oderHistoryJsonRes = await response.json();
        //console.log(oderHistoryJsonRes);
       
  
        if(oderHistoryJsonRes.message){  //prisla error sprava, nema zakazky
          Alert.alert(
            "Žiadne aktívne zákazky",
            "Momentálne nemáte zákazku",
            [
              { text: "OK", onPress: () => console.log("Ziadne zakazky alert") }
            ]
          );

          return;
        }

        navigation.navigate('TechnicianOrderHistory', {'': oderHistoryJsonRes});
  
      } catch (error) {
        console.error(error);
      }
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
          <Button title='Moje zákazky' onPress={pressHandlerOdrders} />
        </View>
        <View style={styles.button}>
          <Button title='História opravených áut' onPress={pressHandlerHistory} />
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