// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import firebase from '../firebase/firebaseConfig';

const HomeScreen = ({ navigation }) => {
  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      navigation.replace('Login');
    }).catch(error => {
      // Handle errors here
    });
  };

  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default HomeScreen;
