import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CustomerCarDetailsItem from '../components/customerCarDetailsItem';

var ws = new WebSocket('ws://wslansormtaa.herokuapp.com/')   //trebalo to dat na klasu, inac to pri vyplnenych udajov neslo posielat ;)

export default function CustomerCarDetails( {navigation} ) {
  
  const customersCars = navigation.getParam('');
  
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
      const carData = JSON.parse(message);
      console.log(carData);

      if(carData.NewRepairedCar) navigation.navigate('CustomerProfile');
    }
  }


  const deleteCarAddToRepairedWS = async (car) => {

    const carUpdate = {
      id: car._id
    }

    ws.send(JSON.stringify({ 
      information: 'CarsID',
      method: 'DELETE',
      data: JSON.stringify(carUpdate)
    }));

    const repairedCar = {
      customer_id : car.customer_id,
      technician_id : car.technician_id,
      brand : car.brand,
      model : car.model,
      year : car.year,
      oilChange : car.oilChange,
      filterChange : car.filterChange,
      tireChange : car.tireChange,
      engineService : car.engineService,
      number_plate: car.number_plate,
      description : car.description,
      state : car.state,
      last_service: new Date(),
      image_url : car.image_url
    }

    ws.send(JSON.stringify({ 
      information: 'RepairedCars',
      method: 'POST',
      data: JSON.stringify(repairedCar)
    }));

    return;
  }

  const deleteCarAddToRepaired = async (car) => {

    try {

      const response = await fetch(`https://wslansormtaa.herokuapp.com/Cars/${car._id}`, {
        method: 'DELETE',
      });

      const updateCarJsonRes = await response.json();
      console.log(updateCarJsonRes);
     
    } catch (error) {
      console.error(error);
    }

    const repairedCar = {
      customer_id : car.customer_id,
      technician_id : car.technician_id,
      brand : car.brand,
      model : car.model,
      year : car.year,
      oilChange : car.oilChange,
      filterChange : car.filterChange,
      tireChange : car.tireChange,
      engineService : car.engineService,
      number_plate: car.number_plate,
      description : car.description,
      state : car.state,
      last_service: new Date(),
      image_url : car.image_url
    }

    //console.log(repairedCar);

    const postObj= {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(repairedCar)
    }

    //console.log(postObj);
    
    try {
      const response = await fetch(`https://wslansormtaa.herokuapp.com/RepairedCars`, postObj);
      const carJsonRes = await response.json();
      console.log(carJsonRes);
    } catch (error) {
      console.error(error);
    }

    navigation.navigate('CustomerProfile');
    
    return;
  }


  const pressHandlerConfirmCar = (item) => {
    //console.log(item._id);

    Alert.alert(
      "Potvrdenie prevzatia",
      "Vozidlo bude odstránené a pridané do histórie opravených aut.",
      [
        { text: "Zrušiť", onPress: () => console.log("Zrusenie potvrdenia prevzatia") },
        { text: "Potvrdiť prevzatie", onPress: () => deleteCarAddToRepairedWS(item) }
      ]
    );

    return;
  };

  return (
    
      <View style={styles.container}>
        <View style={styles.list}>
          <FlatList
            data={customersCars}
            renderItem={({item}) => <CustomerCarDetailsItem item={item} pressHandlerConfirmCar={pressHandlerConfirmCar}/>}
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
    paddingLeft: 10,
    maxWidth: 350,
  },
});