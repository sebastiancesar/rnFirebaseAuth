import React from 'react';
import { View, KeyboardAvoidingView, Platform, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import PhoneSignInForm from '../../modules/auth/PhoneSignInForm';
import { AppState } from '../../reducers/reducers';
import { NavigationScreenProps } from 'react-navigation';
import './types';

// import styles from '../Style';
import { KeyboardAvoidingViewOptions } from './types';
import { signIn } from '../../actions/auth';
import MessageBox from '../../modules/common/MessageBox';

interface Props extends NavigationScreenProps {
  signIn: (phoneNumber: string) => void,
  phoneNumber: string
};

class PhoneAuthScreen extends React.Component<Props> {

  keyboardBehavior: KeyboardAvoidingViewOptions = Platform.OS === 'ios' ? 'padding' : undefined;

  constructor(props: Props) {
    super(props);
    this.signIn = this.signIn.bind(this);
  }

  signIn(): void {
    this.props.signIn(this.props.phoneNumber);  
  }

  render() {
    const { phoneNumber } = this.props;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={this.keyboardBehavior}>
        <View style={styles.screenContainer} testID='PhoneView' >

          <View style={styles.screenMainContent}>
            <Text h3 style={styles.screenMainSubtitle}> 
              What's your phone number?
            </Text>
            <Text style={styles.screenMainSubtitle}> 
              We'll text you a confirmation code to secure your account.
            </Text>
            <View style={styles.phoneInputForm}>
              <PhoneSignInForm />
              <MessageBox />
            </View>
          </View>
          
          <View style={styles.screenMainAction}>
            <Button 
              title='sign in' 
              onPress={this.signIn} 
              testID='signInButton'
              disabled={!phoneNumber}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  phoneNumber: state.auth.login.phoneNumber
});

const mapDispatchProps = (dispatch: Function) => ({
  signIn: (phoneNumber: string) => dispatch(signIn(phoneNumber)),
});

export default connect(mapStateToProps, mapDispatchProps)(PhoneAuthScreen);

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
    flex: 1,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },

  screenMainSubtitle: {
    marginTop: '10%',
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 10
  },

  phoneInputForm: {
    paddingHorizontal: 20,
    paddingTop: '20%'
  }

});