import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginRegis from './auth/LoginRegis';
import GetStartedOTP from './auth/getStartedOTP';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginRegis} options={ {headerShown: false} } />
          <Stack.Screen name="OTP Login" component={GetStartedOTP}/>
        </Stack.Navigator>  
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
