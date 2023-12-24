import React, { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

const RECAPTCHA_KEY = "testing";

const Recaptcha = ({ onVerify }) => {
  const webViewRef = useRef(null);

  const html = `
    <html>
      <head>
        <script src="https://www.google.com/recaptcha/api.js?render=explicit" async defer></script>
        <script type="text/javascript">
          var onloadCallback = function() {
            grecaptcha.render('recaptcha', {
              'sitekey' : '${RECAPTCHA_KEY}',
              'callback' : onRecaptchaSuccess,
              'size' : 'invisible'
            });
            grecaptcha.execute();
          };

          var onRecaptchaSuccess = function(token) {
            window.ReactNativeWebView.postMessage(token);
          };
        </script>
      </head>
      <body>
        <div id="recaptcha"></div>
        <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
      </body>
    </html>`;

  const onMessage = (event) => {
    onVerify(event.nativeEvent.data);
  };

  useEffect(() => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`onloadCallback();`);
    }
  }, [webViewRef]);

  return (
    <WebView
      ref={webViewRef}
      originWhitelist={['*']}
      source={{ html }}
      onMessage={onMessage}
    />
  );
};

export default Recaptcha;
