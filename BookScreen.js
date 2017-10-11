import React, { Component } from 'react';
import {
  View,
  Linking,
  StyleSheet,
  ScrollView,
  Button,
  Text,
  Image
} from 'react-native';

export default class BookScreen extends Component {
   /*
    Set the StackNavigator options so our screen's title says Book
   */
   static navigationOptions = {
      title: 'Book',
   };

   searchUrl = (url) => {
      console.log("doing amazon search for " + url);

      Linking.openURL(url).catch(err => console.error('An error occurred', err));
   }

   render() {
      /*
       Grab the data that may have been passed to this screen through the navigator
      */
      const { params } = this.props.navigation.state;

      return (
       <View style={styles.container}>
         <ScrollView contentContainerStyle={styles.scrollContainer}>
           <Text style={styles.title}>{params.book.title}</Text>

           <Image
             style={styles.thumbnail}
             resizeMode='contain'
             source={{uri: params.book.imageLinks.thumbnail}}
           />

           <Text style={styles.description}>PageCount: {params.book.pageCount}</Text>
           <Text style={styles.description}>Rating: {params.book.averageRating}</Text>

           <Button title="Search on Amazon" onPress={ _ => this.searchUrl(
             "https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=" + params.book.title
           ) } color='blue' />

           <Button title="Search on Google" onPress={ _ => this.searchUrl(
             params.book.infoLink
           ) } color='blue' />

           <Text style={styles.title}>Description</Text>
           <Text style={styles.description}>{params.book.description}</Text>
         </ScrollView>
       </View>
      );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20
  },
  thumbnail: {
    width: 200,
    height: 200,
    flex: 1
  },
  description: {
    fontSize: 15,
    lineHeight: 20,
    padding: 15
  }
});
