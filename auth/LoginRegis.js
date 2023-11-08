import React, {useState} from 'react'
import { Image, StyleSheet, Text, View, useWindowDimensions, TouchableOpacity, Platform } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import Toast from 'react-native-toast-message';

function LoginAndRegis({navigation}) {
    const {width, height} = useWindowDimensions();
    const paddingTopLogo = height / 2 - 500;
    const widthButtons = width - 100
    const [appleLogin, setAppleLogin] = useState(true)

    if (Platform.OS == 'android'){
        setAppleLogin('false')
    }

    const showSuccessToast = (title, message) => {
        Toast.show({
          type: 'success',
          text1: title,
          text2: message
        });
    }
    
    const showErrorToast = () => {
        Toast.show({
          type: 'error',
          text1: 'Sign In',
          text2: 'This sign in method is not yet applicable',
        });
    }
    /*
    async function handleFacebookLogin() {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    
    if (result.isCancelled){
        throw new Error('User cancelled login')
    }
    const data = await AccessToken.getCurrentAccessToken();
    const credential = FacebookAuthProvider.credential(data.accessToken)
    if (!data) {
        throw new Error('Something went wrong obtaining access token')
    }
    const user = await signInWithCredential(FIREBASE_AUTH, credential)
    console.log(user)
    }
    */

    const styles = StyleSheet.create({
        container: {
            paddingTop: paddingTopLogo,
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
            height: height,
        },
        logo: {
            width: 150,
            height: 150,
            overflow: 'visible'
        },
        appName: {
            paddingTop: 10,
            fontSize: 35,
            fontWeight: 'bold',
            marginBottom: 10
        },
        description: {
            width: widthButtons,
            marginBottom: 100,
            textAlign: 'center',
            fontWeight: '100',
        },
        getStarted: {
            width: widthButtons,
            height: 40,
            backgroundColor: 'rgba(111, 202, 186, 1)',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10
        },
        signInWithApple: {
            width: widthButtons,
            height: 40,
            backgroundColor: '#000000',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            flexDirection: 'row', 
        },
        buttonText: {
            fontWeight: '900',
            fontSize: 20,
            color: '#fff'
        },
        signInWithFacebook: {
            width: widthButtons,
            height: 40,
            backgroundColor: '#4267B2',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            flexDirection: 'row', 
        },
        
    });

  return (
    <View style={styles.container}>
        <Image
            source={require('../images/ev.png')}
            style={styles.logo}
        />
        <Text style={styles.appName} >EcoChargeHub</Text>
        <Text style={styles.description}>Find charging stations with realtime availability. Book and reserve charging stations at ease.</Text>
        <Shadow>
            <TouchableOpacity style={styles.getStarted} onPress={() => navigation.navigate('OTP Login/Register')}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </Shadow>
        <Text style={{fontWeight: '200', marginBottom: 10}}>or continue with</Text>
        {appleLogin && 
        <Shadow>
            <TouchableOpacity style={styles.signInWithApple} onPress={() => console.log('pressed')}>
                <Image
                source={require('../images/apple-logo.png')}
                style={{width:20, height: 20, marginRight:5, resizeMode: 'contain'}}
                />
                <Text style={styles.buttonText}>Sign in with Apple</Text>
            </TouchableOpacity>
        </Shadow>
        }
        <Shadow>
            <TouchableOpacity style={styles.signInWithFacebook} onPress={showErrorToast}>
                <Image
                source={require('../images/fb.png')}
                style={{width:20, height: 20, marginRight:5, resizeMode: 'contain'}}
                />
                <Text style={styles.buttonText}>Sign in with Facebook</Text>
            </TouchableOpacity>
        </Shadow>
    </View>
  )
  
}


export default LoginAndRegis