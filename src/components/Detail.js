import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';


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
    content: 'Lorem ipsum...'
  }
];


export default class Detail extends Component {

  state = {
    isCollapsed: true
  }

  constructor(props) {
    super(props);
    
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
      <LinearGradient colors={['#4FB5B0', '#52B6B1', '#52B7B1']} style={[styles.contentAccordion, styles.accordionHeader]}>
        <Image source={name} style={[styles.headerImage]} resizeMode="contain" />
        <Text style={[styles.headerTitle]}>{section.title}</Text>
        <Icon name="angle-down" size={20} color="#fff" />
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

  _onPressButton() {
    this.setState({ isCollapsed: false })
  }
  
  render() {
    return (
      <LinearGradient colors={['#35A6A9', '#5CBCB3', '#8ED7C0']} style={[styles.mainContainer]}>
        <View style={[styles.content]}>
          <Text style={[styles.mainTitle]}>Patient Association Name</Text>
          <Text style={[styles.address]}>Address, zip code - city</Text>
        </View>
        <View style={[styles.contentSocial]}>
          <Text style={[styles.social]}>Sito Web</Text>
          <Text style={[styles.social]}>Facebook</Text>
          <Text style={[styles.social]}>Twitter</Text>
          <Text style={[styles.social]}>Youtube</Text>
        </View>
        <View>
        <Accordion
          sections={SECTIONS}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          underlayColor='transparent'
        />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  content: {
    paddingTop: 30,
    paddingHorizontal: 60 
  },
  contentAccordion: {
    paddingVertical: 15,
    paddingHorizontal: 40 
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'flex-start'
  },
  headerTitle: {
    alignItems: 'flex-start',
    alignContent: 'flex-start'
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
  }
})