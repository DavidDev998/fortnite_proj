import * as React from 'react';
import {AdMobBanner,AdMobInterstitial,PublisherBanner,AdMobRewarded,setTestDeviceIDAsync,} from 'expo-ads-admob';
import { Text, View, StyleSheet, ImageBackground, Image, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import Daily from './components/daily'
import Account from './components/account'
import Cosmetics from './components/cosmetics'

setTestDeviceId = async () => {
  await setTestDeviceIDAsync('EMULATOR');
}

showInterstitial = async () => {
  AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
  
  try{
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  }
  catch(e){
    console.log(e);
  }
}

showRewarded = async () => {
  AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
  
  try{
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  }
  catch(e){
    console.log(e);
  }
}

const Tab = createMaterialBottomTabNavigator();


export default function App() {
  const [isLoaded] = useFonts({
    "fort": require("../assets/fonts/Burbank-Big-Condensed-Black.ttf"),
  });
  if (!isLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={styles.view}>
      <ImageBackground source={require('../assets/background.png')} style={styles.image}>
        <NavigationContainer >
          <Tab.Navigator style={styles.navigator} 
          initialRouteName='Loja'
          activeColor='white'
          barStyle={{backgroundColor:'#f3af19'}}
          labeled={false}
          screenOptions={({ route }) => ({
            tabBarIcon: ({focused, color, size}) => {

              if (route.name === 'Loja') {
                return <Image style={styles.image_button} source={require('../assets/cart.png')}/>;
              } else if (route.name === 'Conta') {
                return <Image style={styles.image_button} source={require('../assets/account.png')}/>;
              }else if( route.name === 'Cosméticos') {
                return <Image style={styles.image_button} source={require('../assets/chest.png')}/>;
              }
            },
            
          })}>
            <Tab.Screen name="Loja" component={Daily}/>
            <Tab.Screen name="Conta" component={Account} />
            <Tab.Screen name="Cosméticos" component={Cosmetics} />
          </Tab.Navigator>
        </NavigationContainer>
      </ImageBackground>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-4279032512183056/4812072897"
        servePersonalizedAds={false}
        onAdViewDidReceiveAd={() => console.log('success')}
        onDidFailToReceiveAdWithError={(e) => console.log(e)}
      />
    </View>
  )
  }
}

const styles = StyleSheet.create({
  view:{
    flex:1,
    justifyContent:'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  image:{
    flex: 1,
    justifyContent:'center'
  }, 
  navigator:{
    justifyContent:'center'
  },
  tabBar:{
    justifyContent:'center',
    backgroundColor:'#1C5494',
    height:60,
    borderRadius:10,
  }, 
  image_button:{
    height:30,
    width:30
  },
  ViewTitle:{
    justifyContent:'center',
    alignItems:'center'
  }

})