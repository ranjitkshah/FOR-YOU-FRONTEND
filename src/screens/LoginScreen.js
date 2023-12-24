import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { getAuth, signInWithCredential, PhoneAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; // Adjust the path as needed
import Recaptcha from '../utils/Recaptcha';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const sendVerification = (recaptchaToken) => {
    const phoneProvider = new PhoneAuthProvider(auth);
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier)
      .then(setVerificationId)
      .catch(error => Alert.alert("Error", error.message));
  };

  const confirmCode = () => {
    const credential = PhoneAuthProvider.credential(
      verificationId,
      code
    );
    signInWithCredential(auth, credential)
      .then(() => {
        // Handle successful login
      })
      .catch(error => {
        // Handle login error
        Alert.alert("Login Error", error.message);
      });
  };

  const onRecaptchaVerify = useCallback((recaptchaToken) => {
    // Call sendVerification with the recaptcha token
    sendVerification(recaptchaToken);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={{ margin: 10, borderWidth: 1, padding: 10, width: '80%' }}
      />
      <Button title="Send Verification" onPress={() => sendVerification()} />

      <TextInput
        placeholder="Verification Code"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        style={{ margin: 10, borderWidth: 1, padding: 10, width: '80%' }}
      />
      <Button title="Confirm Code" onPress={confirmCode} />
      <Recaptcha onVerify={onRecaptchaVerify} />
    </View>
  );
};

export default LoginScreen;
