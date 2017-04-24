//Fire Add Listings From Firebase

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ListView,
  TouchableHighlight,
  Modal,
  TextInput
} from 'react-native';

///////////////////////////////////////////////////////////////
//Import Components
//////////////////////////////////////////////////////////////
import Navbar from './app/components/Navbar/Navbar';
import AddButton from './app/components/AddButton/AddButton';

///////////////////////////////////////////////////////////////
//Import Firebase
//////////////////////////////////////////////////////////////
import * as firebase from 'firebase';

const firebaseConfig ={
  apiKey: "AIzaSyBq_5Nv-gDSzcahZOQf1dAHkmS1d5gMw6w",
      authDomain: "mytest-c3a42.firebaseapp.com",
      databaseURL: "https://mytest-c3a42.firebaseio.com",
      projectId: "mytest-c3a42",
      storageBucket: "mytest-c3a42.appspot.com"

}

const firebaseApp = firebase.initializeApp(firebaseConfig);

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////




export default class additems extends Component {


  ///////////////////////////////////////////////////////////////
  //List Constructor
  //////////////////////////////////////////////////////////////
constructor(){
super();
 const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

this.state = {
  text:'',
itemDataSource: ds,
modalVisible:false
}

///////////////////////////////////////////////////////////////
//Read Firebase DataCollection
//////////////////////////////////////////////////////////////
this.itemsRef = this.getRef().child('items/list');

///////////////////////////////////////////////////////////////
//Bind Data
//////////////////////////////////////////////////////////////
this.renderRow = this.renderRow.bind(this);
this.pressRow = this.pressRow.bind(this);

}



///////////////////////////////////////////////////////////////
//Modal Function
//////////////////////////////////////////////////////////////
setModalVisible(visible){
this.setState({modalVisible:visible});
}






///////////////////////////////////////////////////////////////
//Get Data from Firebase Array
//////////////////////////////////////////////////////////////
getRef(){

  return firebaseApp.database().ref();
}

//Lifecycle
// componentWillMount(){
// this.getItems(this.itemsRef);
// }


componentDidMount(){
this.getItems(this.itemsRef);
}




//Static Array of ItemLister
getItems(itemsRef){
// let items= [{title:'itemOne'},{title:'itemTwo'},{title:'itemThree'}];



///////////////////////////////////////////////////////////////
//Get Data from Firebase
//////////////////////////////////////////////////////////////
itemsRef.on('value',(snap) => {
let items=[];
snap.forEach((child) => {


items.push({

  title:child.val().title,
  _key:child.key
});

});


///////////////////////////////////////////////////////////////
//set state of array of collection to ListView
//////////////////////////////////////////////////////////////
this.setState({
itemDataSource:  this.state.itemDataSource.cloneWithRows(items)
});
});

}


///////////////////////////////////////////////////////////////
//When row is Pressed remove Items From Firebase
//////////////////////////////////////////////////////////////
pressRow(item){
console.log(item);
this.itemsRef.child(item._key).remove();
}



///////////////////////////////////////////////////////////////
//Render List Cell
//////////////////////////////////////////////////////////////

renderRow(item){
return(


<TouchableHighlight onPress={() => {
this.pressRow(item);
}}>

<View style={styles.liRow}>
<Text style={styles.liText}>{item.title}</Text>

</View>

</TouchableHighlight>


);

}


///////////////////////////////////////////////////////////////
//add Item when button is Pressed we see a Modal
//////////////////////////////////////////////////////////////

addItem(){
this.setModalVisible(true);


}


///////////////////////////////////////////////////////////////
// Render Output of ListView and Modal and Textbox
//////////////////////////////////////////////////////////////
  render() {
    return (
      <View style={styles.container}>
      <Modal
           animationType={"slide"}
           transparent={false}
           visible={this.state.modalVisible}
          //  onRequestClose={() => {)}
           >
          <View style={{marginTop: 22}}>
           <View>

             <Navbar title="Add Items" />

              <TextInput style={styles.textInput}
               value={this.state.text}
               placeholder="Add Item"
               onChangeText = {(value) =>this.setState({text:value})}

              />



             <TouchableHighlight onPress={() => {
               this.itemsRef.push({title:this.state.text})
               this.setModalVisible(!this.state.modalVisible)
             }}>
               <Text>Save Item</Text>
             </TouchableHighlight>

             <TouchableHighlight onPress={() => {
               this.itemsRef.push({title:this.state.text})
               this.setModalVisible(!this.state.modalVisible)
             }}>
               <Text>Cancel</Text>
             </TouchableHighlight>

           </View>
          </View>
         </Modal>





      <StatusBar
      backgroundColor="coral"
      barStyle="light-content"
      />
     <Navbar title="Item Lister"/>
     <ListView
      dataSource={this.state.itemDataSource}
      renderRow={this.renderRow}
      />

      <AddButton onPress={this.addItem.bind(this)} title= "Add Item" />
      </View>
    );
  }
}


///////////////////////////////////////////////////////////////
//Styles
//////////////////////////////////////////////////////////////

const styles = StyleSheet.create({

container:{

  flex:1,
  backgroundColor:'#f2f2f2',
},


listview:{
  flex:1,
},


liRow:{
backgroundColor:'#fff',
borderColor:'#eee',
borderColor:'transparent',
borderWidth:1,
paddingLeft:16,
paddingTop:14,
paddingBottom:16

},



liContainer:{
flex:2,

},

liText:{
  color:'#333',
  fontSize:16
},

textInput:{
backgroundColor:'white',
height:50

}


});

AppRegistry.registerComponent('additems', () => additems);
