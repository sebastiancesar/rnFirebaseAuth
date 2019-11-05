import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import CodeVerificationForm from '../../modules/auth/CodeVerificationForm';
import { AppState } from '../../reducers/reducers';
import { signIn, confirmVerificationCode, signInReset } from '../../actions/auth';
import { NavigationScreenProps } from 'react-navigation';

import { KeyboardAvoidingViewOptions } from './types';
import MessageBox from '../../modules/common/MessageBox';

interface Props extends NavigationScreenProps {
  phoneNumber: string,
  verificationCode: string,
  verificationId: string,
  confirmVerificationCode: (verificationId: string, verificationCode: string) => void,
  signInReset: () => void,
  signIn: (phoneNumber: string) => void
};


class CodeVerificationScreen extends Component<Props> {

  keyboardBehavior: KeyboardAvoidingViewOptions = Platform.OS === 'ios' ? 'padding' : undefined;

  constructor(props: Props) {
    super(props);
    this.confirmCode = this.confirmCode.bind(this);
    this.resend = this.resend.bind(this);
    this.resetView = this.resetView.bind(this);
  }

  resetView() {
    this.props.signInReset();
  }
  
  resend(): void {
    this.props.signIn(this.props.phoneNumber);
  }

  confirmCode(): void {
    const { verificationId, verificationCode, confirmVerificationCode } = this.props;
    confirmVerificationCode(verificationId, verificationCode);
  }
   
  render() {
    const { verificationCode, phoneNumber } = this.props;
   
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={this.keyboardBehavior}>
        <View style={styles.screenContainer} testID='VerificationCodeView' >

          <View style={styles.screenMainContent}>
            <Text h4>Please enter your confirmation code </Text>
            <Text style={styles.screenMainSubtitle}> 
              A validation code has been sent to {phoneNumber}.
              If you do not receive a code after 30 seconds, check the number and press resend.
            </Text>
            <Button buttonStyle={styles.subtitleButton} 
              onPress={this.resend} 
              title='resend' 
              type='clear' />
            <Button buttonStyle={styles.subtitleButton} 
              onPress={this.resetView} 
              title='back'
              type='clear' 
            />
            <CodeVerificationForm verificationCode={verificationCode} />
            <MessageBox />
          </View>
          
          <View style={styles.screenMainAction}>
            <Button buttonStyle={styles.mainActionButton} 
              title='Confirm' 
              disabled={!verificationCode} 
              type='solid' 
              onPress={this.confirmCode} 
              testID='codeVerificationButton' 
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  phoneNumber: state.auth.login.phoneNumber,
  verificationId: state.auth.login.verificationId,
  verificationCode: state.auth.login.verificationCode
});

const mapDispatchProps = (dispatch: Function) => ({
  confirmVerificationCode: (verificationId: string, verificationCode: string) => 
    dispatch(confirmVerificationCode(verificationId, verificationCode)),
  signIn: (phoneNumber: string) => dispatch(signIn(phoneNumber)),
  signInReset: () => dispatch(signInReset()),
});

export default connect(mapStateToProps, mapDispatchProps)(CodeVerificationScreen);

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