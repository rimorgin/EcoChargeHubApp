import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebaseConfig';
import LoginRegis from './auth/LoginRegis';
import GetStartedOTP from './auth/getStartedOTP';
import Homescreen from './pages/home';
import Toast from 'react-native-toast-message';


SystemUI.setBackgroundColorAsync('white');

const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(111, 202, 186, 1)',
  },
};

console.log('current user: '+ JSON.stringify(auth.currentUser));
const isLogin = auth.currentUser;

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer theme={NavTheme}>
        
        {isLogin == null ? (
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginRegis} options={ {headerShown: false, headerShadowVisible: true} } />
            <Stack.Screen name="OTP Login/Register" component={GetStartedOTP} options={ { headerShadowVisible: true} }/>
          </Stack.Group> 
        </Stack.Navigator>
        ) : (
        <Stack.Navigator initialRouteName='Homescreen'>  
          <Stack.Group screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Homescreen" component={Homescreen}/>
          </Stack.Group>
        </Stack.Navigator>
        )}
       
      </NavigationContainer>
      <Toast 
        position='top'
      />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
