import React, { useEffect, useState, useRef } from 'react'
import { auth, app } from '../firebaseConfig';
import {
    FirebaseRecaptchaVerifierModal,
    FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha"
import { PhoneAuthProvider, signInWithCredential, updateProfile } from "firebase/auth"
import { Pressable, StyleSheet, Text, useWindowDimensions, Image, View, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Shadow } from 'react-native-shadow-2';
import Toast from 'react-native-toast-message';


function GetStartedOTP({navigation}) {
    const {width, height} = useWindowDimensions();
    //firebase variables
    const recaptchaVerifier = useRef(null)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState()
    const [verificationCode, setVerificationCode] = useState()
    const firebaseConfig = app ? app.options : undefined;
    const attemptInvisibleVerification = true
    const [visible, setVisible] = useState(false);


    const formatPhoneNumber = (input) => {
        const cleaned = input.replace(/\D/g, '');
       // Limit the phone number to 9 digits
        const limited = cleaned.substring(0, 10);

        if (limited.length > 0) {
            // Use regular expression to add hyphens every three characters, except the last group
            const formatted = limited.replace(/(\d{3})(?=\d{4})/g, '$1-');
            setPhoneNumber(formatted);
        } else {
          // If the input is empty, reset the phone number
            setPhoneNumber('');
        }
    };
    
    const verifyPhone = async() => {
        setVisible(true);
        try {
            const phoneProvider = new PhoneAuthProvider(auth)
            const verificationId = await phoneProvider.verifyPhoneNumber('+63 '+phoneNumber,recaptchaVerifier.current)
            setVerificationId(verificationId)
            setVisible(false);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Verification code has been sent to your phone ✅'
              });
        } catch (err) {
            setVisible(false);
            Toast.show({
                type: 'error',
                text1: 'Oops!',
                text2: err.message + ' ❌'
              });
        }
    }

    const isPhoneNumberValid = () => {
        if (phoneNumber.length == 12) {
            verifyPhone()
        } else {
            Toast.show({
                type: 'error',
                text1: 'Oops!',
                text2: "You have entered invalid phone number ❌"
              });
        }
    }
    const verifyCode = async() => {
        setVisible(true);
        try {
            const credential = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            )

            await signInWithCredential(auth, credential)
            
            const user = auth.currentUser
            const userName = user.displayName
            await updateProfile(user)
            setVisible(false);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Phone authentication successful 👍✅'
              });
            
            navigation.navigate('Homescreen');

        } catch (err) {
            setVisible(false);
            Toast.show({
                type: 'error',
                text1: 'Oops!',
                text2: "Couldn't sign in, bad verification code ❌"
              });
        }
    }

    const continueToHome = () => {
        
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: width,
            height: height,
            padding: 15
        },
        //fill 3/5 of the screen
        TextEditContainer: {
            flex: 3,
        },
        //fill 2/5
        buttoncontainer: {
            flexDirection:'row', 
            justifyContent:'space-between', 
            flex:2
        },
        enterMobileText: {
            paddingBottom: 15,
            color: '#A9A9A9',
            fontSize: 18,
            alignItems: 'center'
        },
        
        phLogo: {
            width: 35,
            height: 35   
        },
        countryCode: {
            width:90,
            height: 45,
            paddingLeft: 5,
            paddingRight: 5,
            borderColor: '#A9A9A9',
            alignContent: 'flex-start',
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:'space-between',
            borderRadius: 10
        },
        input: {
            marginLeft: 35, 
            minWidth: 150,
            maxWidth: 250,
            height: 40,
            margin: 12,
            borderBottomWidth: 1,
            padding: 10,
            fontSize: 20,
        },
        inputCode: {
            width: 150.5,
            height: 80,
            padding: 10,
            fontSize: 40,
        },

        desctiption: {
            left: 0,
            justifyContent: 'flex-start',
            width: width/1.5,
            color: '#A9A9A9',
            fontSize: 18,
        },
        actionButton: {
            right: 0,
            width: 60,
            height: 60,
        },
        firebaseCaptchaBanner: {
            bottom:5,
        },
        loaderContainer: {
            height:height,
            width:width,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            overlayColor:'rgba(255,255,255,0.75)',
            position: 'absolute',
            alignItems:'center',
            justifyContent:'center',
            top:-100
        },
        lottie: {
            width: 200,
            height: 200,
          },
    })
  return (
    <>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container} >
        <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={attemptInvisibleVerification}
                cancelLabel='Close'
                title='Prove you are human!'
        />
        {!verificationId ? (
        <>
            <View style={styles.TextEditContainer}>
            <Text style={styles.enterMobileText} >Enter your mobile number to login or register</Text>
            <Shadow>
                <Pressable style={styles.countryCode}>
                    <Image 
                        source={require('../images/philippines.png')}
                        style={styles.phLogo}
                    />
                    <Text style={{fontSize:20, paddingLeft: 5}}>+63</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {formatPhoneNumber(text)}}
                        value={phoneNumber}
                        placeholder='123-456-7890'
                        keyboardType='numeric'
                        inputMode='tel'
                        textContentType='telephoneNumber'
                    />
                </Pressable>
            </Shadow>
            </View>    
            <View style={styles.buttoncontainer}>  
                <Text style={styles.desctiption} >We're sending you a verification PIN to your mobile number. We use your mobile number to allow the stations to contact you about your booking.</Text>
                <Shadow style={{borderRadius: 30}}>
                    <Pressable id='sign-in-button' style={styles.actionButton} onPress={isPhoneNumberValid} disabled={!phoneNumber}>
                        <Image 
                            source={require('../images/arrowButton.png')}
                            style={styles.actionButton}
                        />
                    </Pressable>
                </Shadow>

            </View>
        </>
        ) : (
        <>
        <View style={styles.TextEditContainer}>
            <Text style={styles.enterMobileText} >Enter your verification code</Text>
            <View style={{width:width, alignItems:'center', justifyContent:'center'}}>
            <Shadow style={{borderRadius:30}}>
                <TextInput
                    style={styles.inputCode}
                    onChangeText={setVerificationCode}
                    value={verificationCode}
                    placeholder='- - - - - -'
                    keyboardType='numeric'
                    inputMode='tel'
                    textContentType='oneTimeCode'
                />
                
            </Shadow>
            </View>
        </View>
            <View style={styles.buttoncontainer}>  
                <Text style={styles.desctiption} >Please check your message box for the verification PIN. Enter the PIN to complete your login.</Text>
                <Shadow style={{borderRadius: 30}}>
                    <Pressable id='sign-in-button' style={styles.actionButton} onPress={verifyCode} disabled={!verificationCode}>
                        <Image 
                            source={require('../images/arrowButton.png')}
                            style={styles.actionButton}
                        />
                    </Pressable>
                </Shadow>
            </View>
        
        </>    
        )}
        <FirebaseRecaptchaBanner style={styles.firebaseCaptchaBanner}/>
    </View>
    </TouchableWithoutFeedback>
    {visible && 
    <View style={styles.loaderContainer} >
        <Image source={require('../assets/electricAnims.gif')} style={styles.lottie}/> 
    </View>
    }
    </>
  )
}

export default GetStartedOTP