import React from "react";
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../../reducers/reducers';
import { StyleSheet } from 'react-native';
import { HandledError } from "app/services/errorHandling";

interface Props {
  error: HandledError;
}

class MessageBox extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { error } = this.props;
    const hasMessage = error && error.message.length > 0; 
    return (
      <View>
        { hasMessage ? 
          <Text style={styles.messageBox} testID='messageBoxText'>
            {error.message}
          </Text> : null
        }
      </View>
    );
  }

}

const mapStateToProps = (state: AppState) => ({
  error: state.common.error
});

export default connect(mapStateToProps)(MessageBox);

const styles = StyleSheet.create({
  messageBox: {
    padding: 10,
    color: 'purple' 
  }
});