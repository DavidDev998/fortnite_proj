import React, { Component } from 'react';
import { Text ,View, StyleSheet , Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import {AdMobBanner,AdMobInterstitial,PublisherBanner,AdMobRewarded,setTestDeviceIDAsync,} from 'expo-ads-admob';
import { ScrollView } from 'react-native-gesture-handler';



class Daily extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <View style={styles.view}>
        <ImageBackground source={require('../../assets/background.png')} style={styles.image}>
          <Image 
            style={styles.title}
            source={require('../../assets/title.png')}/>
          <View style={styles.button_group}>
            <TouchableOpacity underlayColor="white">
              <Image
                style={styles.image_button}
                source={require('../../assets/cart.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity underlayColor="white">
              <Image
                style={styles.image_button}
                source={require('../../assets/account.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity underlayColor="white">
              <Image
                style={styles.image_button}
                source={require('../../assets/chest.png')}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            
            {/* <PublisherBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
              onDidFailToReceiveAdWithError={this.bannerError}
              onAdMobDispatchAppEvent={this.adMobEvent} />
              <Button
                title="InterstitialAd"
                onPress={this.showInterstitial}
              />

              <Button
                title="rewardedVideoAd"
                onPress={this.showRewarded}
              /> */}
          </ScrollView>
          
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view:{
      flex: 10
  },
  button_group:{
    marginTop:40,
    padding:0,
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:'center',
    width:'90%',
    height:60,
    backgroundColor:'#1C5494',
    borderRadius:15
  },
  image_button:{
    height:40,
    width:40
  },
  image:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title:{
    marginTop:30
  }
})

export default Daily;