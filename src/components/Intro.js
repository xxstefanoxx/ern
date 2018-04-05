import React, { Component } from 'react';
import { StyleSheet, Platform, View, Text, Image, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import StartMainTabs from './StartMainTabs';
import { Navigation } from 'react-native-navigation';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 8);
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
    mainContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    image: {
      width: imageWidth,
      height: imageHeight,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10
    },
    text: {
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: Platform.OS === 'ios' ? 60 : 30,
      color: '#fff',
      textAlign: 'center'
    },
    nextButton: {
      backgroundColor: '#fff',
      borderRadius: 4,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 20,
      paddingLeft: 20,
    },
    skipButton: {
      borderWidth: 2,
      borderColor: '#fff',
      borderRadius: 4,
      paddingTop: 8,
      paddingBottom: 8,
      paddingRight: 18,
      paddingLeft: 18,
    }
  });
   
  const slides = [
  {
    key: 'first',
    text: 'It’s simple! \n Search for the \n rare disease ',
    image: require('../assets/images/tutorial1.png')
  },
  {
    key: 'somethun-dos',
    text: 'See the \n structures nearby \n',
    image: require('../assets/images/tutorial2.png')
  },
  {
    key: 'somethun1',
    text: 'Get all the \n information you want \n',
    image: require('../assets/images/tutorial3.png')
  }
];
  
export default class Intro extends Component {


  constructor(props) {
    super(props);
    this.props.navigator.setStyle({
      navBarHidden: true,
      statusBarHidden: true
    });
  }

  _renderItem = props => (
    <LinearGradient colors={['#31AAB9', '#349DB6', '#3A7CB0']} style={[styles.mainContent, {
        width: props.width,
        height: props.height,
      }]}>
      <Text style={styles.text}>{props.text}</Text>
      <Image source={props.image} style={styles.image} resizeMode="contain" />
    </LinearGradient>
  );

  _renderNextButton() {
    return (
      <View style={styles.nextButton}>
        <Text>Continua</Text>
      </View>
    );
  }

  _renderDoneButton() {
    return (
      <View style={styles.nextButton}>
        <Text>Ok</Text>
      </View>
    );
  }

  _renderSkipButton() {
    return (
      <View style={styles.skipButton}>
        <Text>Skip</Text>
      </View>
    );
  }

  _onDone = () => {
    StartMainTabs();
  }

  render() {
    return (
      <View  style={{ flex: 1 }}>
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          onDone={this._onDone}
          onSkip={this._onDone}
          showSkipButton={true}
          renderDoneButton ={this._renderDoneButton}
          renderNextButton ={this._renderNextButton}
          renderSkipButton ={this._renderSkipButton}
          dotColor={'rgba(0, 0, 0, .2)'}
        />
      </View> 
  );
  }
}