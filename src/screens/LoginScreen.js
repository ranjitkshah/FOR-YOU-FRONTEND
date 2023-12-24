import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import firebase from '../firebase/firebaseConfig';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier)
      .then(setVerificationId)
      .catch(error => Alert.alert("Error", error.message));
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase.auth().signInWithCredential(credential)
      .then(() => {
        // Handle successful login
      })
      .catch(error => {
        // Handle login error
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Send Verification" onPress={sendVerification} />

      <TextInput
        placeholder="Verification Code"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
      />
      <Button title="Confirm Code" onPress={confirmCode} />
    </View>
  );
};

export default LoginScreen;
