import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

interface Props {
  onChangePhone: (value: any) => void 
};

interface State {
  phoneNumber: string
};


export default class PhoneInputWrapper extends Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = { phoneNumber: '+34' };
    this.onChange = this.onChange.bind(this);
  }

  /** Use a 3rd party library to validate the format of the phone number */
  isValidNumber(number: string) {
    return number.length > 11;
  }

  onChange(number: string) {
    this.setState({ phoneNumber: number });
    const status = {
      validPhoneNumber: this.isValidNumber(number),
      phoneNumber: number
    };
    this.props.onChangePhone(status);
  }

  render() {
    const { phoneNumber } = this.state;
    
    return (
      <Input value={phoneNumber}
        onChangeText={this.onChange} 
        inputStyle={styles.phoneInputComponent} 
      /> 
    );
  }
}

const styles = StyleSheet.create({
  phoneInputComponent: {
    fontSize: 25,
    height: 55, 
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#b0b0b0'
  }
});