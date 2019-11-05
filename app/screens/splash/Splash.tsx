import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';


const SPLASH_SCREEN_TIMEOUT = 2;

interface Props extends NavigationScreenProps {
  authUser: any,
  redirect: any
};

export default class SplashScreen extends React.Component<Props> {
  
  constructor(props: Props) {
    super(props);
  };

  delayIt(fn: Function): void {
    setTimeout(fn, SPLASH_SCREEN_TIMEOUT);
  }

  render() {
   
    return(
      <View style={styles.container}>
        <Text h3> Loading ... </Text>
        <ActivityIndicator size='large'/>
        <StatusBar barStyle='default'/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});