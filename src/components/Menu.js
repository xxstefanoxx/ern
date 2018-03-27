import React, { Component } from 'react';
import { Text, View, FlatList, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 25,
   backgroundColor: '#fff'
  },
  item: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: '#F2F2F2',
    borderBottomWidth: 1,
    
  },
  text: {
    fontSize: 20,
  }
})

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
      <View style={ styles.container }>
        <FlatList
          data={[
            {key: 'Settings'},
            {key: 'How to use the app'},
            {key: 'Menu item'}
          ]}
          renderItem={({item}) => <View style={styles.item}>
                                    <Text style={styles.text}>{item.key}</Text> 
                                    <Icon name={"ios-arrow-forward"} size={20} color={"#000"} />
                                  </View>
                                }
        />
      </View>
    );
  }
}