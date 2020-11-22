import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    View,
    Image,
    Text,
    ImageBackground,
    Dimensions,
    ScrollView
} from "react-native";

const windowWidth = Dimensions.get('window').width;

export default class Daily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            daily: [],
            featured: [],
            special: [],
            refreshing: true,
        }
    }

    componentDidMount() {
        this.fetchCards();
    }

    fetchCards() {
        this.setState({ refreshing: true });
        fetch('https://fortnite-api.com/v2/shop/br?language=pt-BR')
            .then(res => res.json())
            .then(resJson => {
                this.setState({ daily: resJson.data.daily.entries.map(
                  item => {
                    const retorno = {};
                    retorno.price = item.finalPrice;
                    retorno.name = item.items[0].name;
                    retorno.id = item.items[0].id;
                    retorno.rarity = require('../../assets/rare.jpg');
                    retorno.icon = item.items[0].images.smallIcon
                    return retorno;
                  }
                ) });
                this.setState({ featured: resJson.data.featured.entries.map(
                  item => {
                    const retorno = {};
                    retorno.price = item.finalPrice;
                    retorno.name = item.items[0].name;
                    retorno.id = item.items[0].id;
                    retorno.rarity = require('../../assets/epic.jpg');
                    retorno.icon = item.items[0].images.smallIcon
                    return retorno;
                  }
                ) });
                this.setState({ special: resJson.data.specialFeatured.entries.map(
                  item => {
                    const retorno = {};
                    retorno.price = item.finalPrice;
                    retorno.name = item.items[0].name;
                    retorno.id = item.items[0].id;
                    retorno.rarity = require(`../../assets/marvel.png`);
                    retorno.icon = item.items[0].images.smallIcon
                    return retorno;
                  }
                ) });
                this.setState({ refreshing: false });
            }).catch(e => console.log(e));
    }

    renderItemComponent = (data) =>
        <View style={styles.card_view}>
          <ImageBackground source={data.item.rarity} style={styles.card_image}>
            <ImageBackground source={{uri:data.item.icon}} style={styles.card_image}>
              <View style={styles.card_bottomBar}>
                <Text style={styles.card_name}>{data.item.name}</Text>
                <Text style={styles.card_price}>
                  <Image 
                    source={require('../../assets/vbuck.png')}
                    style={styles.card_vbuckIcon}
                  />
                  {data.item.price}
                </Text>
              </View>
            </ImageBackground>
          </ImageBackground>
        </View>

    handleRefresh = () => {
        this.setState({ refreshing: false }, () => { this.fetchCards() }); // call fetchCats after setting the state
    }

    render() {
      // if (!isLoaded) {
      //   return <AppLoading />;
      // } else {
        return (
          <ImageBackground source={require('../../assets/background.png')} style={styles.background}>
            <ScrollView style={styles.scrollView} >
            <SafeAreaView style={styles.safeArea} >
              <FlatList
                data={this.state.daily}
                renderItem={item => this.renderItemComponent(item)}
                keyExtractor={item => item.id.toString()}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
                numColumns={(windowWidth < 400) ? 2 : 3}
                ListHeaderComponent={<Text style={styles.title}>Loja Diaria</Text>}
                style={styles.list}
              />
              <FlatList
                data={this.state.featured}
                renderItem={item => this.renderItemComponent(item)}
                keyExtractor={item => item.id.toString()}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
                numColumns={(windowWidth < 400) ? 2 : 3}
                ListHeaderComponent={<Text style={styles.title}>Destaque</Text>}
                style={styles.list}
              />
              <FlatList
                data={this.state.special}
                renderItem={item => this.renderItemComponent(item)}
                keyExtractor={item => item.id.toString()}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
                numColumns={(windowWidth < 400) ? 2 : 3}
                ListHeaderComponent={<Text style={styles.title}>Especial</Text>}
                style={styles.list}
              />
            </SafeAreaView>
            </ScrollView>
          </ImageBackground>
        )
      // }
  }
}

const styles = StyleSheet.create({
  scrollView:{
    flex:1,
  },
  contentContainer:{
    
  },
  safeArea:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  background:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    fontFamily:'fort',
    justifyContent:'center',
    alignItems:'center',    
    fontSize:30,
    height:44,
    color:'white',
    fontWeight:'900',
    textAlign:'center',
    backgroundColor:"rgba(51, 51, 51, 0.61)"
  },
  list:{
    flex:1,
    borderWidth:3,
    borderColor:'rgba(51, 51, 51, 0.61)'
  },
  card_view:{
     margin:5
  },
  card_image:{
    width:128,
    height:128
  },
  card_bottomBar:{
    position:'absolute',
    bottom:0,
    height:64,
    width:'100%',
    backgroundColor:'rgba(51, 51, 51, 0.61)',
    justifyContent:'center',
    alignItems:'center',
  },
  card_name:{
    textAlign:'center',
    fontFamily:'fort',
    fontSize:15,
    color:'white'
  },
  card_price:{
    fontFamily:'fort',
    color:'white'
  },
  vbuckIcon:{
    maxWidth:12,
    maxHeight:12
  },
});