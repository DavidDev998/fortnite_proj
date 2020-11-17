import * as React from 'react';
import {AdMobBanner,AdMobInterstitial,PublisherBanner,AdMobRewarded,setTestDeviceIDAsync,} from 'expo-ads-admob';
import { Text, View, StyleSheet, ImageBackground, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Daily from './components/daily'
import Account from './components/account'

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
  return (
    <View style={styles.view}>
      <ImageBackground source={require('../assets/background.png')} style={styles.image}>
        <NavigationContainer >
          <Tab.Navigator style={styles.navigator} 
          initialRouteName='Loja'
          tabBarPosition='bottom'
          
          screenOptions={({ route }) => ({
            tabBarIcon: () => {

              if (route.name === 'Loja') {
                return <Image style={styles.image_button} source={require('../assets/cart.png')}/>;
              } else if (route.name === 'Conta') {
                return <Image style={styles.image_button} source={require('../assets/account.png')}/>;
              }else if( route.name === 'Cosméticos') {
                return <Image style={styles.image_button} source={require('../assets/chest.png')}/>;
              }

              // You can return any component that you like here!
              
            },
          })}
          tabBarOptions={{
            showIcon:true,
            activeTintColor: '#0865bc',
            inactiveTintColor: 'gray',
            style:styles.tabBar,
            showLabel:false,

          }}>
            <Tab.Screen name="Loja" component={Daily}/>
            <Tab.Screen name="Conta" component={Account} />
            <Tab.Screen name="Cosméticos" component={Account} />
          </Tab.Navigator>
        </NavigationContainer>
      </ImageBackground>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds/>
    </View>
  );
}

const styles = StyleSheet.create({
  view:{
    flex:1,
    justifyContent:'center'
  },
  image:{
    flex: 1,
    justifyContent:'center'
  }, 
  navigator:{
    marginTop:50,
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