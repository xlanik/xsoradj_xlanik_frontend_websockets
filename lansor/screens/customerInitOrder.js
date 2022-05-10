import React, { useState, useEffect  } from 'react';
import { StyleSheet, View, TextInput, Button,Text, Switch, Alert, FlatList, ScrollView, StatusBar, SafeAreaView, LogBox } from 'react-native';
import TechnicianAvailableItem from '../components/technicianAvailableItem';


var ws = new WebSocket('ws://192.168.0.109:3000/') 
export default function CustomerInitOrder({ navigation }) {

    const [technicians, setTechnicians] = useState(null)
    const [isEnabled, setIsEnabled] = useState(false);
    const [znacka, setZnacka] = useState('');
    const [model, setModel] = useState('');
    const [rokVyroby, setRokVyroby] = useState('');
    const [spz, setSpz] = useState('');
    const [technicianID, setTechnicianID] = useState('');
    const [technicianName, setTechnicianName] = useState('náhodný');

    const cust_id = navigation.getParam("customer_id");

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
            const techniciansData = JSON.parse(message);
            console.log(techniciansData);
            try {
                setTechnicians(techniciansData.technicians);
                
            } catch (error) {
                console.error(error);
            }
            }
    }

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']); 
        /*const userCredentials = {
            name: name,
            password: password
          }*/
          ws.send(JSON.stringify({ 
            information: 'Technicians',
            method: 'GET',
            //data: JSON.stringify(userCredentials) data netreba lebo bereme všetkych bez nejakeho parametru atd..
          }));
      }, [])

      useEffect(() => {
        if(isEnabled == false){
            setTechnicianID('');
            setTechnicianName("náhodný");
        }   
      }, [isEnabled])

    const toggleSwitch = async () => {
        setIsEnabled(previousState => !previousState);
        //console.log(technicians);
    };

    const pressHandlerOrders = () => {

        if(!znacka || !model || !rokVyroby){
            Alert.alert(
                "Nevyplnené povinné údaje",
                "Prosím vyplňte všetky údaje o vozidle.",
                [
                  { text: "OK", onPress: () => console.log("Zly login alert") }
                ]
              );

              return;
        }

        const car = {
            customer_id : cust_id,
            technician_id : isEnabled ? technicianID : technicians[Math.floor(Math.random() * technicians.length)]._id,
            brand : znacka,
            model : model,
            year : rokVyroby,
            number_plate: spz,
        }

        console.log(car);
        navigation.navigate('CustomerServiceOptions',car);
    }

    const pressHandleTechChoice = async (item) =>{
        setTechnicianID(item._id);
        setTechnicianName(item.name);
        console.log(item)
    };

    //{printTechnicians && <Text> Vypis technikov</Text>}   
    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.name}> Prosím zadajte údaje vozidla</Text>
                <TextInput style={styles.input} placeholder="Značka*" onChangeText={(value) => setZnacka(value)} />
                <TextInput style={styles.input} placeholder="Model*" onChangeText={(value) => setModel(value)} />
                <TextInput style={styles.input} placeholder="Rok výroby*" keyboardType = 'numeric' onChangeText={(value) => setRokVyroby(value)} /> 
                <TextInput style={styles.input} placeholder="ŠPZ*" onChangeText={(value) => setSpz(value)} />
                <View style={styles.button}>
                    <Button title='Pokračuj na úkony' onPress={pressHandlerOrders} />
                </View>
                <View style={styles.option}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    <Text style={styles.label}>Vybrať konkrétneho technika</Text>
                </View>
                <Text style={styles.label}>Zvoleny technik: {technicianName} {technicianID.slice(-5)}</Text>
                {isEnabled == true ? 
                <View style={styles.list}>
                    <FlatList
                        data={technicians}
                        renderItem={({item}) => <TechnicianAvailableItem item={item} pressHandleTechChoice={pressHandleTechChoice}/>}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                : null} 
            </ScrollView>
        </SafeAreaView>
    );
    
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#D5E2EB',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight,
    },
    name:{
      fontWeight: 'bold',
      fontSize: 24
    },
    input:{
      borderWidth: 1,
      borderColor: '#C9C8C7',
      backgroundColor: '#fff',
      padding: 8,
      marginTop: 25,
      width: 150,
    },
    option:{
        flexDirection: "row"
    },
    label: {
        margin: 15,
        paddingLeft: 5,
        fontSize: 16
    },
    list: {
        marginTop: 20,
        maxWidth: 300,
        paddingLeft:20
    },
    button:{
        marginTop: 35,
        width: 200,
    },
  });
  