import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './StyleCarousel';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Communications from 'react-native-communications';

export default class SliderEntry extends Component {


    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    state = {
        isFavorite: false,
        isCollapsed: true,
        favoriteImage: require('../assets/images/Favourite_OFF.png')
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

    render () {
        const { data: { title, subtitle }, even } = this.props;
        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { alert(`You've clicked '${title}'`); }}
              >
                <LinearGradient colors={['#3B79B0', '#466BB9', '#5558C5']} style={[styles.textContainer]}>
                <View style={[styles.content]}>
                    <TouchableOpacity onPress={() => this._favorite()}>
                        <Image source={this.state.favoriteImage} style={[styles.favoriteImage]} resizeMode="contain" />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.mainTitle]}>Patient Association Name</Text>
                        <Text style={[styles.address]}>Address, zip code - city</Text>
                    </View>
                </View>
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
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}