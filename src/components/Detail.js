import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image, TouchableOpacity, Dimensions, Linking, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Communications from 'react-native-communications';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const btnWidth = wp(55);

const SECTIONS = [
  {
    type: 1,
    title: 'Add info to your Contact List',
    content: 'Lorem ipsum...'
  },
  {
    type: 2,
    title: 'Core Services',
    content: 'Lorem ipsum...'
  },
  {
    type: 3,
    title: 'Opening Hours - Closing soon',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum tellus eget sem varius fringilla. Donec id nulla in purus euismod rutrum. Maecenas egestas tortor id nibh laoreet, in mollis ipsum facilisis. Vestibulum mauris sem, faucibus eu consectetur ut, tristique non urna. Quisque porta bibendum metus, at fringilla augue venenatis vel. Praesent accumsan aliquet erat. Ut ornare lobortis nunc sed congue. Phasellus dui massa, lacinia id enim ut, vestibulum vulputate dolor. In vestibulum molestie augue, eu placerat nunc tempus eget. Maecenas eu consectetur lectus. Nulla condimentum elementum ultrices. Vestibulum et diam fringilla, fermentum turpis quis, aliquam turpis. Vivamus vitae euismod augue, cursus scelerisque velit.'
  }
];


export default class Detail extends Component {

  state = {
    isFavorite: true,
    isCollapsed: true,
    favoriteImage: require('../assets/images/Favourite_OFF.png')
  }

  constructor(props) {
    super(props);
    this.props.navigator.setStyle({
      navBarHidden: true,
      statusBarHidden: Platform.OS === 'ios' ? true : false,
    });
  }

  componentWillMount() {
    if(this.state.isFavorite) {
      this.setState({ favoriteImage: require('../assets/images/Favourite_ON.png') })
    }
  }

  _renderHeader(section) {
    var name = '';
    if(section.type == 1) {
      name = require('../assets/images/assign-to-contact.png')
    } else if(section.type == 2) {
      name = require('../assets/images/info-button.png')
    } else {
      name = require('../assets/images/access-time.png')
    }
    return (
      <LinearGradient colors={['#4FB5B0', '#52B6B1', '#52B7B1']} style={[styles.accordionHeader]}>
        <Image source={name} style={[styles.headerImage]} resizeMode="contain" />
        <Text style={[styles.headerTitle]}>{section.title}</Text>
        <Icon style={[styles.headerIco]} name="angle-down" size={20} color="#fff" />
      </LinearGradient>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.contentAccordion}>
        <Text>{section.content}</Text>
      </View>
    );
  }

  _redirectToMap(lat, long) {
    var url = ""
    if(Platform.OS === 'ios') {
      url = "http://maps.apple.com/?ll=" + lat + "," + long
    } else {
      url = "geo:" + lat + "," + long
    }
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  _closeLayer() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }

  _favorite() {
    if(this.state.isFavorite) {
      this._removeFromFavorite()
    } else {
      this._addToFavorite()
    }
  }

  _addToFavorite() {
    this.setState({ isFavorite: true })
    this.setState({ favoriteImage: require('../assets/images/Favourite_ON.png') })
  }

  _removeFromFavorite() {
    this.setState({ isFavorite: false })
    this.setState({ favoriteImage: require('../assets/images/Favourite_OFF.png') })
  }
  
  render() {
    return (
      <LinearGradient colors={['#35A6A9', '#5CBCB3', '#8ED7C0']} style={[styles.mainContainer]}>
        <View style={[styles.contentExit]}>
          <TouchableOpacity onPress={() => this._closeLayer()}>
            <Image source={require('../assets/images/Close_card.png')} style={[styles.exitImage]} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <View style={[styles.content]}>
          <TouchableOpacity onPress={() => this._favorite()}>
            <Image source={this.state.favoriteImage} style={[styles.favoriteImage]} resizeMode="contain" />
          </TouchableOpacity>
          <View>
            <Text style={[styles.mainTitle]}>Patient Association Name</Text>
            <Text style={[styles.address]}>Address, zip code - city</Text>
          </View>
        </View>
        <View style={[styles.contentSocial]}>
          <Text style={[styles.social]}>Sito Web</Text>
          <Text style={[styles.social]}>Facebook</Text>
          <Text style={[styles.social]}>Twitter</Text>
          <Text style={[styles.social]}>Youtube</Text>
        </View>
        <View style={styles.containerAccordion}>
          <Accordion
            sections={SECTIONS}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            underlayColor='transparent'
          />
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.button} onPress={() => Communications.phonecall('3441176641', true)}>
                <Icon name="phone" size={20} color="#fff" />
                <Text style={styles.txtBtn}>Call Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => Communications.email(['emailAddress1', 'emailAddress2'],null,null,'My Subject','My body text')}>
                <Icon name="envelope" size={20} color="#fff" />
                <Text style={styles.txtBtn}>Send Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this._redirectToMap(37.484847, -122.148386)}>
                <Icon name="compass" size={20} color="#fff" />
                <Text style={styles.txtBtn}>Directions</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  contentExit: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    marginTop: 40,
    marginBottom: 20
  },
  exitImage: {
    width: 25,
    height: 25
  },
  favoriteImage: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 60 
  },
  contentAccordion: {
    paddingVertical: 15,
    paddingLeft: 85 
  },
  accordionHeader: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    flexGrow: 1,
    textAlign: 'left',
    marginLeft: 20
  },
  headerImage: {
    width: 25,
    height: 25
  },
  contentSocial: {
    paddingVertical: 30,
    paddingHorizontal: 60,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  social: {
    fontSize: 12
  },
  mainTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold'
  },
  address: {
    fontSize: 16,
    color: '#000'
  },
  containerAccordion: {
    flex: 2
  },
  containerButton: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 50
  },
  button: {
    width: btnWidth,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  txtBtn: {
    flexGrow: 1,
    textAlign: 'left',
    marginHorizontal: 20,
    fontWeight: 'bold',
  }
})