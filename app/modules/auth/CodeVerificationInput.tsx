import React, { Component } from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import AuthService from '../../services/auth';
import { StyleSheet } from 'react-native';

interface Props {
  onChangeCode: (status: any) => void;
}

export default class CodeVerificationInput extends Component<Props> {

  constructor(props: Props) {
    super(props);
    this.onChangeCode = this.onChangeCode.bind(this);
  }

  onChangeCode(value: string): void {
    const status = {
      codeInput: value,
      validConfirmationCode: AuthService.isValidConfirmationCode(value)
    };
    this.props.onChangeCode(status);
  };

  render () {
    return (
      <View>
        <Input
          testID='codeVerificationInput'
          onChangeText={this.onChangeCode}
          placeholder={'X X X X X X'}
          inputStyle={styles.codeInputComponent}
          keyboardType='numeric'
          maxLength={6}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  codeInputComponent: {
    fontSize: 30,
    height: 55, 
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#b0b0b0'
  }
});