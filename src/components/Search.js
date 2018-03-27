import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SearchBar, List, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  searchBar: {
   flex: 1,
   paddingTop: 25,
   backgroundColor: '#fff'
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#56B9C9',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 10,
    height: 60
  },
  inputContainer: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#ffffff',
    borderBottomColor: '#ffffff',
    borderTopColor: '#ffffff'
  }
})

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setStyle({
      navBarBackgroundColor: '#56B9C9',
      navBarNoBorder: true
    });
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      text: ''
    };
    this.arrayholder = [] ;
  }

  componentDidMount() {
    this.makeRemoteRequest()
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = 'https://randomuser.me/api/?seed=1&page=1&results=20';
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.arrayholder = res.results;
        console.log(res.results)
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };


  SearchFilterFunction(text){
    var newArray = this.arrayholder.filter(function (el) {
      console.log(el.email.includes(text))
      return el.email.includes(text.toLowerCase())
    });
    this.setState({
      data: newArray
    })

  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  OnPress() {
    this.props.navigator.push({
      screen: 'ern.Maps', // unique ID registered with Navigation.registerScreen
      title: 'Mappa',
      previewActions: [{ // action presses can be detected with the `PreviewActionPress` event on the commited screen.
        title: 'Search'
      }],
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar style={styles.searchBar}
          lightTheme
          onChangeText={(text) => this.SearchFilterFunction(text)}
          placeholder='Type rare desease here' 
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          icon={{ type: 'font-awesome', name: 'search', style: { marginTop: Platform.OS === 'ios' ? 15 : 10, marginLeft: 20 } }}
          />
           <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.data}
              keyExtractor={item => item.email}
              ListFooterComponent={this.renderFooter}
              renderItem={({ item }) => (
                <ListItem
                  roundAvatar
                  title={`${item.name.first} ${item.name.last}`}
                  subtitle={item.email}
                  avatar={{ uri: item.picture.thumbnail }}
                  containerStyle={{ borderBottomWidth: 0 }}
                  onPress={() => this.OnPress()}
                />
              )}
            />
          </List>
      </View>
    );
  }
}