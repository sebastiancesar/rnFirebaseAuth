import React from 'react';
import { signOut } from '../../actions/auth';
import { connect } from 'react-redux';
import { TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native-elements';


interface SignOutProps {
  signOut: () => Promise<void>
}

const signOutWrapper = (WrappedComponent: React.ComponentType): React.ComponentType => {
  class SignOutWrapper extends React.PureComponent<SignOutProps> {
  
    constructor(props: SignOutProps) {
      super(props);
    };

    render() {
      return (
        <TouchableHighlight onPress={this.props.signOut}>
          <WrappedComponent {...this.props} />
        </TouchableHighlight>
      );
    }
  }
  
  const mapDispatchProps = (dispatch: Function) => ({
    signOut: (): Promise<any> => dispatch(signOut()),
  });

  return connect(null, mapDispatchProps)(SignOutWrapper);
};

class ExitButton extends React.Component {

  render() {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: 'blue' }}> signout </Text> 
      </View>
    );
  }
}

const SignOutButton = signOutWrapper(ExitButton);

export default SignOutButton;