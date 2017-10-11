import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  Platform
} from 'react-native';

import BookItem from './BookItem';

/*
  SearchScreen will define the user interface and behavior for our search screen
  In this screen, users can search for a book via title by hitting the Google Books API
*/

export default class SearchScreen extends Component {
  /*
    Used by our StackNavigator to have a title
    Header is set to null so we don't have a header on top of our search bar
  */
  static navigationOptions = {
    title: 'Search',
    header: null
  };

  /*
    We keep track of and update two variables:
    books - An array of book data
    searchTerm - The title users are searching for
  */
  state = {
     books: [],
     searchTerm: '',
     randomTerm: 'dog'
  }

  keyExtractor = (item, index) => item.id;

  constructor(props) {
     super(props);
     this.getRandomWord();
  }

  /*
    Called when we hit Search
    fetch is a function in ReactNative that allows us to make HTTP requests
    What we do here is hit the Google books API and pass a parameter
    We get the response, convert it a JavaScript object
    Then get the 'items' array from the object and set it to our books state
  */
   searchBooks = () => {
      console.log("in searchBooks " + this.state.randomTerm);
      const search = (this.state.searchTerm == '') ? this.state.randomTerm : this.state.searchTerm;
      console.log("searching for " + search);
      //this.getRandomWord();

      fetch('https://www.googleapis.com/books/v1/volumes?q=' + search)
           .then((res) => res.json())
           .then((data) => {
             this.setState({
               books: data.items
             });
           });

      Keyboard.dismiss()
   }

   getRandomWord() {
      console.log("getting random");
      fetch('http://setgetgo.com/randomword/get.php')
        .then((data) => {
          this.setState({
             randomTerm: data._bodyText
          });
          console.log("in getRandomWord " + this.state.randomTerm);
          this.searchBooks();
        });
   }

   clear = () => {
      this.setState({
         searchTerm: ''
      });
   }

  /*
    For every item in our books array, we render a BookItem component
    This is a custom component that displays the book title and description
  */
  renderBook = ({item}) => {
     return <BookItem book={item.volumeInfo} navigation={this.props.navigation} />
  }

  render() {
      console.log("rendering");
      return (
         <View style={styles.container}>
          <View style={styles.searchView}>
              <TextInput
                onChangeText={(text) => {
                  this.setState({
                    searchTerm: text
                  });
                }}
                value={this.state.searchTerm}
                style={styles.searchTextInput}
              />

            <Button title="X" onPress={this.clear} color='#FFFFFF' style={styles.cancelBtn} />
            <Button title="Search" onPress={this.searchBooks} color='#FFFFFF' style={styles.searchBtn} />
          </View>

          <FlatList
            data={this.state.books}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderBook}
            style={styles.bookList}
          />
         </View>
      );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 20,
    color: 'red',
    flexBasis: '20%',
    backgroundColor: 'blue',
    width: '100%'
  },
  bookList: {
    width: '100%'
  },
  searchView: {
    width: '100%',
    padding: 20,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e74c3c'
  },
  searchTextInput: {
    padding: 10,
    borderRadius: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    flexBasis: '70%'
  },
  searchBtn: {
    flexBasis: '20%'
},
  cancelBtn: {
     flexBasis: '10%'
 }
});
