import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import SignOutButton from '../../modules/auth/SignOutButton';
import { StyleSheet } from 'react-native';
import { AppState } from 'app/reducers/reducers';
import { connect } from 'react-redux';
import HeaderLogo from '../../modules/common/HeaderLogo';


interface Props {
  user: any
}

class HomeScreen extends Component<Props> {

  render() {
    const { user } = this.props;

    return (
      <View style={styles.screenContainer}>
       
        <View style={ styles.screenHeader }>
          <HeaderLogo />
        </View>
       
        <View style={styles.screenHomeMainContent}>
          <View style={styles.screenHomeItems}>
            <Text style={styles.title}> User's phone number:</Text>
            <Text h4> {user.phoneNumber} </Text>
          </View>
          <View style={styles.screenMainAction}>
            <SignOutButton />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(HomeScreen);


const styles = StyleSheet.create({
  
  screenContainer: {
    flex: 1
  },

  screenMainContent: {
    flex: 5,
    justifyContent: 'center',
    padding: 10
  },

  screenMainAction: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  
  screenHeader: {
    paddingTop: 20,
    flex: 1
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