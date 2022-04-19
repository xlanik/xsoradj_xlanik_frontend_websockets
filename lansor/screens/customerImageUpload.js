import React,{useState} from 'react';
import { StyleSheet, View, Text, Button, Alert,Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CustomerImageUpload({ navigation }) {

  const [image, setImage] = useState(null);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(`data:image/jpeg;base64,${result.base64}`)
    }
  }


  const pressHandlerOrders = async () => {

    if(!image){
      Alert.alert(
        "Nahrajte fotogragiu auta",
        "Je to povinná položka pri objednávke",
        [
          { text: "Rozumiem", onPress: () => console.log("Nedal fotografiu") }
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
      oilChange : navigation.getParam("oilChange"),
      filterChange : navigation.getParam("filterChange"),
      tireChange : navigation.getParam("tireChange"),
      engineService : navigation.getParam("motorService"),
      number_plate: navigation.getParam("number_plate"),
      description : navigation.getParam("description"),
      state : "neopravene",
      image_url : image,
    }

    const postObj= {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(car)
    }

    //console.log(postObj);

    try {
      const response = await fetch(`https://lansormtaa.herokuapp.com/cars`, postObj);
      const carJsonRes = await response.json();
      //console.log(carJsonRes);
    } catch (error) {
      console.error(error);
    }

    Alert.alert(
        "Dokončené",
        "Objednávka do servisu bola úspešná, ste presmerovaný na profil.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );
    navigation.navigate('CustomerProfile');
  }

    return (
        <View style={styles.container}>

          <View style={styles.button}>
            <Button title="Nahrať obrázok" onPress={handleChoosePhoto} />
          </View>

          <View style={styles.button}>
            <Button  title='Objednať vozidlo do servisu' onPress={pressHandlerOrders} />
          </View>

          {image && 
          <><Text style={styles.name}>Fotografia auta</Text><Image source={{ uri: image }} style={styles.image} /></>}
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
  name:{
    fontWeight: 'bold',
    fontSize: 30,
  },
  button:{
    marginTop: 35,
    width: 200,
    marginBottom: 20
  },
  image: {
    width: 300, 
    height: 200,
    resizeMode: "contain",
    borderRadius: 5,
  },
});
