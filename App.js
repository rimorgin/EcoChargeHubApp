import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginRegis from './auth/LoginRegis';
import GetStartedOTP from './auth/getStartedOTP';
import Toast from 'react-native-toast-message';

SystemUI.setBackgroundColorAsync('white');

const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(111, 202, 186, 1)',
  },
};

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer theme={NavTheme}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginRegis} options={ {headerShown: false} } />
          <Stack.Screen name="OTP Login/Register" component={GetStartedOTP} />
        </Stack.Navigator>  
      </NavigationContainer>
      <Toast 
        position='bottom'
        bottomOffset={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
