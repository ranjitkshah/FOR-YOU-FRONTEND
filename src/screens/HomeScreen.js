import React from 'react';
import { View, Text, Button } from 'react-native';
import { auth } from '../firebase/firebaseConfig'; // Adjust the path as needed

const HomeScreen = ({ navigation }) => {
  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace('Login');
    }).catch(error => {
      // Handle errors here
      console.log(error);
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default HomeScreen;
