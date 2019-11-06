import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderLogo from '../../modules/common/HeaderLogo';

export default class UserHome extends React.Component {

  render() {
    return (
      <View style={styles.screenContainer}>
       
        <View style={ styles.screenHeader }>
          <HeaderLogo />
        </View>
       
        <View style={styles.screenHomeMainContent}>
          <View style={styles.screenHomeItems}>
            <Text style={styles.title}> User Home</Text>
          </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  
  screenContainer: {
    flex: 1
  },

  screenHeader: {
    paddingTop: 20,
    flex: 1
  },

  screenMainContent: {
    flex: 5,
    justifyContent: 'center',
    padding: 10
  },

  screenHomeMainContent: {
    flex: 3,
    padding: 40
  },

  screenHomeItems: {
    paddingTop: 50
  },

  title: {
    fontSize: 20,
    paddingVertical: 30
  }

});