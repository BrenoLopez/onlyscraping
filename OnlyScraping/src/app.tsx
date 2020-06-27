import React from 'react';
import { Dimensions, FlatList, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Produto 1',
      price: '$45',
      image: 'https://image.com.br',
      url: 'https://image.com.br'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Produto 2',
      price: '$45',
      image: 'https://image.com.br',
      url: 'https://image.com.br'

    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Produto 3',
      price: '$45',
      image: 'https://image.com.br',
      url: 'https://image.com.br'
    }  
  ];

  interface Iitem {name: string,price: string,image:string, url: string}
  function Item({ name,price,image,url } : Iitem) {
    return (
        <View>
          <TouchableOpacity onPress={()=>Linking.openURL(url)}>
        <View style={styles.productRow}>
          <Text style={styles.productName} >{((name).length > 15) ? 
    (`${((name).substring(0,15-3))}...`) : 
    name}</Text>
             <Text style={styles.productPrice}>{price}</Text>
             <Text style={styles.productImage}>{image}</Text>        
        </View>
        </TouchableOpacity>
        </View>
  
    );
  }
const App: React.FC = () => {
  return (
  <View style={styles.container} >      
      <View >
        <Text style={styles.logo}>OnlyScraping</Text>
      </View>
      <View>
      <TextInput style={styles.input} onChangeText={(text)=>console.log(text)} placeholder='Adicionar novo produto a busca' />
     <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>Adicionar</Text>
     </TouchableOpacity>
      </View>
      <View style={styles.containerList}>
      <FlatList 
         data={DATA}
         renderItem={({ item }) => <Item name={item.name} price={item.price} image={item.image} url={item.url}/>}
         keyExtractor={item => item.id}/>
      </View>
    
      
  </View>);
}

export default App;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#232625',
        justifyContent: "center"
    },
    input: {
        backgroundColor:'#F0F1F2',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
        width: Dimensions.get('window').width - 50, 
        justifyContent: 'center',   
        textAlign: 'center',
    },
    logo:{ 
        color: 'white',
        fontSize: 32,
        marginBottom: 50,
        fontFamily: 'Arial, Helvetica, sans-serif'
    },
    button: {
        height: 46,
        width: Dimensions.get('window').width - 50,
        borderRadius: 30,
        backgroundColor: '#FF5629',
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",      
    },
    buttonText:{
        color: 'white',
        fontWeight: "bold",
        fontSize: 16
    },  
      title: {
        fontSize: 15,
      },
      containerList: {
          marginTop: 10,
          flex: 1/2,
          alignItems: "center",         
          padding: 0,
          width: Dimensions.get('window').width - 60,         
      },
      productRow: {
          display: "flex",
          flexDirection: "row",
          borderWidth: 1,
          borderColor: 'grey',
          marginTop: 15,
          padding: 10,
          borderRadius: 5,
          width: Dimensions.get('window').width - 60,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          height: 100
      },
      productName: {
          fontSize: 16,
          fontWeight: 'bold',
          marginRight: 10
      },
      productPrice: {
          fontSize: 15,
          marginRight: 30
      },
      productImage:{
          
      }
  
})