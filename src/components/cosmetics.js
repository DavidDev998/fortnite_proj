import React from "react";
import { Text, View, Image, ImageBackground, StyleSheet } from "react-native";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";

export default function App() {
  const [isLoaded] = useFonts({
    "fort": require("../../assets/fonts/Burbank-Big-Condensed-Black.ttf"),
  });

  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return ( 
   <View style={styles.view}>
       <Text style={styles.title}>Cosméticos</Text>
       <Text style={styles.subtitle}>Aqui você poderá ver todos os cosméticos do jogo e adicionar um lembrete, para que sempre que aquele item voltar para a loja você seja notificado.</Text>
     <ImageBackground source={require('../../assets/underConstruction.png')} style={styles.backgroundImage}>
        <Text style={styles.text}>
            Em construção
        </Text>
     </ImageBackground>
   </View>
   )
  }
}

const styles=StyleSheet.create({
    view:{
        flex:1,
        justifyContent:'center',
        textAlign:'center'
    },
    title:{
        fontFamily:'fort',
        fontSize:30,
        textAlign:'center',
        color:'#0A69C3'
    },
    subtitle:{
        fontFamily:'fort',
        fontSize:15,
        color:'#114EAC',
        textAlign:'center',
        letterSpacing:1
    },
    backgroundImage:{
        margin:40,
        justifyContent:'center',
        flex:1,
        maxHeight:250,
        maxWidth:250
    },
    text:{
        fontFamily:'fort',
        fontSize:30,
        textAlign:'center'
    }
})