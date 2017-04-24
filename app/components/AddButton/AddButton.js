///Navbar Component

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class AddButton extends Component {
  render() {
    return (
  <View style={styles.buttoncontainer}>
<TouchableHighlight
underlayColor="#24ce84"
onPress={this.props.onPress}
>

<Text style={styles.textButton}>{this.props.title}</Text>
</TouchableHighlight>
  </View>
    );
  }
}

//Add Button Styles
const styles = StyleSheet.create({

buttoncontainer:{

  backgroundColor:'blue',
  borderColor:'transparent',
  borderWidth:1,
  paddingLeft:16,
  paddingTop:14,
  paddingBottom:16
},

textButton:{
  textAlign:'center',
  color:'white',
  fontSize:20
}


});

AppRegistry.registerComponent('AddButton', () => AddButton);
