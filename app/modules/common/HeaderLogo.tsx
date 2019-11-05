import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default class HeaderLogo extends React.Component {

  render() {
    return(
      <View style={{ flex: 1 }}>
        <Image source={require('../../assets/logo.png')} 
          style={styles.headerLogo} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  
  headerLogo: {
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    flex: 2
  }
});
