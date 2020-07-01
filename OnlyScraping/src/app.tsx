import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from './services/api';



  interface Iitem {description: string,price: number,image:string, url: string,store: string}
  interface IProduct {description: string,price: number,image:string, url: string,store: string,id: string}

  function Item({ description,price,image,url,store } : Iitem) {
    return (
        <View>
          <TouchableOpacity onPress={()=>Linking.openURL(url)}>
            <View style={styles.productContainer}>
          <Text style={styles.productStore} >
            {((store).length > 15) ? 
    (`${((store).substring(0,15-3))}...`) : 
    store}
    </Text>
        <View style={styles.productRow}>     
          <Text style={styles.productdescription} >
            {((description).length > 15) ? 
    (`${((description).substring(0,15-3))}...`) : 
    description}
    </Text>
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
  const [products, setProducts] = useState<IProduct[]>([]);
  const handleChange = (text:string) => {
    setProduct(text);
  }
  const handleSubmit = async() =>{
    const response = await api.post('/products',{description:product});
  }
  useEffect(()=>{
    async function loadProducts(){
      const response = await api.get('/products');
      setProducts(response.data);
    }
    loadProducts();
  },[]);
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
         data={products}
         renderItem={({ item }) => <Item description={item.description} price={item.price} image={item.image} url={item.url} store={item.store}/>}
         keyExtractor={item => item.id.toString()}/>
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
      productdescription: {
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