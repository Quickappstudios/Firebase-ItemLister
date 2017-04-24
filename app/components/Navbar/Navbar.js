///Navbar Component

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Navbar extends Component {
  render() {
    return (
  <View style={styles.navcontainer}>
<Text style={styles.navbarTitle}>{this.props.title}</Text>
  </View>
    );
  }
}

const styles = StyleSheet.create({

  navcontainer:{
backgroundColor:'green',
flexDirection:'row',
justifyContent:'center',
height:60
},

navbarTitle:{
  padding:20,
  color:'white',
  textAlign:'center',
  fontSize:18
}

});

AppRegistry.registerComponent('Navbar', () => Navbar);
