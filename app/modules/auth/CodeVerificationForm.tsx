import React, { Component } from "react";
import CodeVerificationInput from "./CodeVerificationInput";
import { View } from 'react-native';
import { invalidVerificationCodeAction, validVerificationCodeAction } from "../../actions/auth";
import { connect } from 'react-redux';

interface Props {
  verificationCode: string,
  validVerificationCode: (verificationCode: string) => void,
  invalidVerificationCode: () => void
}

class CodeVerificationForm extends Component<Props> {
  
  constructor(props: Props) {
    super(props);
    this.onChangeCode = this.onChangeCode.bind(this);
  }

  onChangeCode(status: any): void {
    if (status.validConfirmationCode && this.props.verificationCode === null) {
      this.props.validVerificationCode(status.codeInput);
    } else if (!status.validConfirmationCode && this.props.verificationCode) {
      this.props.invalidVerificationCode();
    }
  }

  render() {
    return (
      <View testID='codeVerificationForm'>
        <CodeVerificationInput onChangeCode={this.onChangeCode} />
      </View>
    )
  }
}

const mapDispatchProps = (dispatch: Function) => ({
  validVerificationCode: (verificationCode: string) => 
    dispatch(validVerificationCodeAction(verificationCode)),
  invalidVerificationCode: () => dispatch(invalidVerificationCodeAction())
});

export default connect(null, mapDispatchProps)(CodeVerificationForm);