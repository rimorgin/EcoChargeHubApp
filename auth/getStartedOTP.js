import React, { useEffect, useState } from 'react'
import { auth } from '../firebaseConfig';
import { RecaptchaVerifier } from 'firebase/auth';
import { Pressable, StyleSheet, Text, useWindowDimensions, Image, View, TextInput, Keyboard } from 'react-native'
import { Shadow } from 'react-native-shadow-2';

function GetStartedOTP() {
    const {width, height} = useWindowDimensions();
    const [phoneNumber, onChange] = useState('');
    useEffect(()=>{
        console.log(phoneNumber)
    },[phoneNumber])

    
    const verifyPhone = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container')
    }
    
    const styles = StyleSheet.create({
        container: {
            width: width,
            height: height,
            padding: 15
        },
        enterMobileText: {
            paddingBottom: 15,
            color: '#A9A9A9',
            fontSize: 18,
            alignItems: 'center'
        },
        enterMobileContainer: {
            alignContent: 'flex-start',
            flexDirection: 'row',
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
            width: 250,
            height: 40,
            margin: 12,
            borderBottomWidth: 1,
            padding: 10,
            fontSize: 20,
        },
        container2: {
            flexDirection:'row', 
            justifyContent:'space-between', 
            paddingTop: height/2.5
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
        }
        
    })
  return (
    <>
    <View style={styles.container} onPress={() => Keyboard.dismiss}>
        <Text style={styles.enterMobileText} >Enter your mobile number to login or register</Text>
        <Shadow>
            <Pressable style={styles.countryCode} onPress={Keyboard.dismiss}>
                <Image 
                    source={require('../images/philippines.png')}
                    style={styles.phLogo}
                />
                <Text style={{fontSize:20}}>+63</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={phoneNumber}
                    placeholder='000-000-0000'
                    keyboardType='numeric'
                    inputMode='tel'
                />
            </Pressable>
        </Shadow>
        <View style={styles.container2}>  
            <Text style={styles.desctiption} >We're sending you a verification PIN to your mobile number. We use your mobile number to allow the stations to contact you about your booking.</Text>
            <Shadow style={{borderRadius: 30}}>
                <Pressable style={styles.actionButton} >
                    <Image 
                        source={require('../images/arrowButton.png')}
                        style={styles.actionButton}
                    />
                </Pressable>
            </Shadow>
        </View>

       
    </View>
    </>
  )
}

export default GetStartedOTP