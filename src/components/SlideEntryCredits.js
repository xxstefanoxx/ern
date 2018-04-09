import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './StyleCarousel';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Communications from 'react-native-communications';

export default class SliderEntryCredits extends Component {


    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };



    render () {
        const { data: { title, description, illustration } } = this.props;
        console.log(illustration)
        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { alert(`You've clicked '${title}'`); }}
              >
                <LinearGradient colors={['#3B79B0', '#466BB9', '#5558C5']} style={[styles.textContainer]}>
                <View style={[styles.contentCredits]}>
                    <TouchableOpacity onPress={() => this._favorite()}>
                    <Image
                        style={[styles.creditsImage]} 
                        source={{uri: illustration}}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.mainTitle]}>{title}</Text>
                        <Text style={[styles.address]}>{description}</Text>
                        
                    </View>
                </View>
                <View style={[styles.contentFollow]}>
                    <Text>FOLLOW US</Text>
                </View>
                <View style={[styles.contentSocial]}>
                    <TouchableOpacity onPress={() => this._favorite()}>
                        <Text>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._favorite()}>
                        <Text>Twitter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._favorite()}>
                        <Text>Youtube</Text>
                    </TouchableOpacity>
                </View>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}