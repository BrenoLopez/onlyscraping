import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from './services/api';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Produto 1',
      price: '$45',
      image: 'https://img.vigiadepreco.com.br/7c/259/de11/de50d/7c259de11de50d12c8bc6f262065f088c75d44377bfdccacc67f0e167fb0c34c.jpg',
      url: 'https://image.com.br',
      store: 'Amazon'

    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Produto 2',
      price: '$45',
      image: 'https://img.vigiadepreco.com.br/7c/259/de11/de50d/7c259de11de50d12c8bc6f262065f088c75d44377bfdccacc67f0e167fb0c34c.jpg',
      url: 'https://image.com.br',
      store: 'Amazon'

    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Produto 3',
      price: '$45',
      image: 'https://img.vigiadepreco.com.br/11/480/66c3/ddd8f/1148066c3ddd8f461cb9cb4bbda83cba3f50f832cca9938bcac7b2f487aec886.jpg',
      url: 'https://image.com.br',
      store: 'Amazon'
    }  
  ];

  interface Iitem {name: string,price: string,image:string, url: string,store: string}
  function Item({ name,price,image,url,store } : Iitem) {
    return (
        <View>
          <TouchableOpacity onPress={()=>Linking.openURL(url)}>
            <View style={styles.productContainer}>
          <Text style={styles.productStore} >{((store).length > 15) ? 
    (`${((store).substring(0,15-3))}...`) : 
    store}</Text>
        <View style={styles.productRow}>     
          <Text style={styles.productName} >{((name).length > 15) ? 
    (`${((name).substring(0,15-3))}...`) : 
    name}</Text>
             <Text style={styles.productPrice}>{price}</Text>
             <Image
        style={styles.productImage}
        source={{
          uri: `${image}`,
        }}
      />     
        </View>
        </View>
        </TouchableOpacity>
        </View>
  
    );
  }
  
const App: React.FC = () => {
  const [product,setProduct]= useState<string>('');
  const handleChange = (text:string) => {
    setProduct(text);
  }
  const handleSubmit = async() =>{
    const response = await api.post('/products',{description:product});
  }
  return (
  <View style={styles.container} >      
      <View >
        <Text style={styles.logo}>OnlyScraping</Text>
      </View>
      <View>
      <TextInput style={styles.input} onChangeText={handleChange} placeholder='Adicionar novo produto a busca' />
     <TouchableOpacity style={styles.button} onPress={handleSubmit}>
         <Text style={styles.buttonText}>Adicionar</Text>
     </TouchableOpacity>
      </View>
      <View style={styles.containerList}>
      <FlatList 
         showsVerticalScrollIndicator={false}
         data={DATA}
         renderItem={({ item }) => <Item name={item.name} price={item.price} image={item.image} url={item.url} store={item.store}/>}
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
      productContainer: {
        display: "flex",
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 15,
        padding: 10,
        borderRadius: 15,
        width: Dimensions.get('window').width - 60,
        backgroundColor: 'white',
        height: 150,
      },
      productRow: {         
          flexDirection: "row",       
          justifyContent: 'space-between',
          alignItems: 'center',       
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
          width:'30%',
          height: 100,
          resizeMode: 'center',
      },
      productStore: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: '40%',
    },
})