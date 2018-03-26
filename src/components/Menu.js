import React, { Component } from 'react';
import { Text, View } from 'react-native';


export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setStyle({
      navBarBackgroundColor: '#56B9C9',
      navBarNoBorder: true
    });
  }
  
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Menu!</Text>
      </View>
    );
  }
}