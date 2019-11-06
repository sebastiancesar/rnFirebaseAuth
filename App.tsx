import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux';
import PhoneAuthScreen from './app/screens/auth/Phone';
import CodeVerificationScreen from './app/screens/auth/CodeVerification';
import HomeScreen from './app/screens/home/Home';
import UserHome from './app/screens/home/UserHome';
import NavigationService from './app/services/navigator';
import store from './app/reducers/store';
import withDeeplinkHandling from './app/modules/common/withDeeplinkHandling';
import SplashScreen from './app/screens/splash/Splash';

const uriPrefix = ' ';

console.disableYellowBox = true;


const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    UserHome: UserHome
  }
);

const AuthStack = createStackNavigator(
  {
    Auth: PhoneAuthScreen,
    CodeVerification: CodeVerificationScreen
  },
  {
    headerMode: 'none'
  }
);

const AppNavigator = createSwitchNavigator({
    AuthLoading: SplashScreen,
    Auth: AuthStack,
    App: TabNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const AppContainer = createAppContainer(withDeeplinkHandling(AppNavigator));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer uriPrefix={uriPrefix} 
          ref={ navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef)} } />
      </Provider>
    )
  }
}