import React, { Component } from 'react';
import { Text, View } from 'react-native';


export default class Maps extends Component {

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
        <Text>Maps!</Text>
      </View>
    );
  }
}