import React, { Component } from 'react';
import { View } from 'react-native';
import PhoneInput from './PhoneInput';
import { AppState } from '../../reducers/reducers';
import { validPhoneNumberAction, invalidPhoneNumberAction } from '../../actions/auth';
import { connect } from 'react-redux';

interface FormProps {
  validPhoneNumber: (phoneNumber: string) => void,
  invalidPhoneNumber: () => void,
  phoneNumber: string
};

interface FormState {
  phoneNumber: string;
}

class PhoneSignInForm extends Component<FormProps, FormState> {
  
  constructor(props: FormProps) {
    super(props);
    this.state = { phoneNumber: '' };
    this.onChangePhone = this.onChangePhone.bind(this);
  }

  onChangePhone(status: any): void {
    this.setState({ phoneNumber: status.phoneNumber });
    if (status.validPhoneNumber) {
      this.props.validPhoneNumber(status.phoneNumber);
    } else if (!status.validPhoneNumber && this.props.phoneNumber) {
      this.props.invalidPhoneNumber();
    }
  }

  render() {
    return (      
      <View testID='phoneSignInForm'> 
        <PhoneInput onChangePhone={this.onChangePhone}></PhoneInput>
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  phoneNumber: state.auth.login.phoneNumber
});

const mapDispatchProps = (dispatch: Function) => ({
  validPhoneNumber: (phoneNumber: string) => 
    dispatch(validPhoneNumberAction(phoneNumber)),
  invalidPhoneNumber: () => dispatch(invalidPhoneNumberAction())
});

export default connect(mapStateToProps, mapDispatchProps)(PhoneSignInForm);