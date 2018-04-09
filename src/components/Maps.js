import MapView, { Marker } from 'react-native-maps';
import React, { Component } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback
} from "react-native";


const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(90);
const itemHorizontalMargin = wp(1);

const OnImage = require('../assets/images/GEO_Division_active.png')
const OffImage = require('../assets/images/GEO_Division_OFF.png')

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;


export default class Maps extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setStyle({
      navBarBackgroundColor: '#56B9C9',
      navBarNoBorder: true
    });
  }


  state = {
    selected: 0,
    markers: [
      {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817,
        },
        title: "Best Place",
        description: "This is the best place in Portland",
        image: "https://i.imgur.com/sNam9iJ.jpg",
        icon: OffImage
      },
      {
        coordinate: {
          latitude: 45.5426011,
          longitude: -122.7287596,
        },
        title: "Second Best Place",
        description: "This is the second best place in Portland",
        image: "https://i.imgur.com/N7rlQYt.jpg",
        icon: OffImage
      },
      {
        coordinate: {
          latitude: 50.6550257,
          longitude: 2.7343071,
        },
        title: "Third Best Place",
        description: "This is the third best place in Portland",
        image: "https://i.imgur.com/UDrH0wm.jpg",
        icon: OffImage
      },
      {
        coordinate: {
          latitude: 55.7494718,
          longitude: 37.3516318,
        },
        title: "Fourth Best Place",
        description: "This is the fourth best place in Portland",
        image: "https://i.imgur.com/Ka8kNST.jpg",
        icon: OffImage
      },
    ],
    region: {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  goToDetail() {
    this.props.navigator.showModal({
        screen: "ern.Detail", // unique ID registered with Navigation.registerScreen
        title: "Modal", // title of the screen as appears in the nav bar (optional)
        passProps: {}, // simple serializable object that will pass as props to the modal (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
      });
  }
  

  _renderItem ({item, index}) {
    return (
        <View style={styles.mainContainer}>
          <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => this.goToDetail() }
              >
                <LinearGradient colors={['#3B79B0', '#466BB9', '#5558C5']} style={[styles.textContainer]}>
                    <Icon style={styles.arrow} name="angle-up" size={30} color="#fff" />
                    <Text style={[styles.title]}>{ item.title }</Text>
                    <Text style={[styles.description]} numberOfLines={2}>
                        { item.description }
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={this._onPressButton}>
                            <Icon name="phone" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button]} onPress={this._onPressButton}>
                            <Icon name="street-view" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>             
            </TouchableOpacity>
        </View>
    );
  }

  markerClick(index) {
    const mapRef = this.map;
    const markerRef = this._marker;
    const carouselRef = this._carousel;
    carouselRef.snapToItem (index, animated = true)
  }

  _centerMapOnMarker (markerIndex, marker) {

    const mapRef = this.map;
    const markerRef = this._marker;
    const markerData = this.state.markers[markerIndex];
    const markers = this.state.markers;

    markers[this.state.selected].icon = OffImage;

    this.setState({ selected: markerIndex })
    
    markers[markerIndex].icon = OnImage;
    this.setState({ markers });

    if (!markerData || !mapRef) {
        return;
    }
    mapRef.animateToRegion({
        latitude: markerData.coordinate.latitude,
        longitude: markerData.coordinate.longitude,
        latitudeDelta: 0.0315,
        longitudeDelta: 0.0258
    });

}




  

  

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.carouselContainer}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.markers}
              renderItem={this._renderItem.bind(this)}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              inactiveSlideScale={0.95}
              inactiveSlideOpacity={1}
              enableMomentum={true}
              activeSlideAlignment={'start'}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              onSnapToItem={(index, marker) => this._centerMapOnMarker(index, marker)}
            />
        </View>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.mapContainer}
        >
          {this.state.markers.map((marker, index) => {
            return (
              <Marker 
                ref={(k) => { this._marker = k; }}
                key={index} 
                coordinate={marker.coordinate} 
                title={marker.title}
                image={marker.icon}
                onPress={() => this.markerClick(index)}>
              </Marker>
            );
          })}
        </MapView>  
      </View>
    );
  }
}















const colors = {
  black: '#1a1917',
  gray: '#888888'
};

const styles = StyleSheet.create({
  mainContainer: {
      backgroundColor: '#00000000',
  },
  slideInnerContainer: {
      width: itemWidth,
      paddingHorizontal: itemHorizontalMargin,
      paddingBottom: 5, // needed for shadow
      backgroundColor: '#00000000'
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - 8,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderRadius: 8
  },
  title: {
      color: colors.black,
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 0.5
  },
  description: {
      marginTop: 6,
      color: colors.black,
      fontSize: 16,
      fontWeight: '200'
  },
  arrow: {
      position: 'absolute',
      top: 15,
      right: 20
  },
  container: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#00000000'
  },
  carouselContainer: {
      backgroundColor: '#00000000',
      position: 'absolute',
      bottom: -10,
      width: Dimensions.get('window').width,
  },
  mapContainer: {
      flex:1,
      position: 'absolute',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      zIndex: -1
  },
  slider: {
      marginTop: 15,
      overflow: 'visible', // for custom animations,
      backgroundColor: '#00000000'
  },
  sliderContentContainer: {
      paddingVertical: 10, // for custom animation
      backgroundColor: '#00000000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
      borderWidth: 1,
      alignItems: 'center',
      borderColor: '#fff',
      paddingVertical: 5,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginTop: 10
  }
});