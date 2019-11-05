import React from 'react';
import { connect } from 'react-redux';
import { loadAuthUser } from '../../actions/auth';
import { NavigationContainer } from 'react-navigation';

const TAG = 'WithAuthenticationNav';

interface Props {
  loadAuthUser: () => void;
};

const withAuthenticationNav = (WrappedComponent: any) => {
  class WithAuthenticationNav extends React.Component<Props> {

    static router = {
      ...WrappedComponent.router
    };

    constructor(props: Props) {
      super(props);
    };

    componentDidMount() {
    }

    render() {
      return(<WrappedComponent { ...this.props } />);
    }

    componentWillUnmount() {
      console.log('\n WithAuthNavigator componentWillUnmount');
      // if (this.unsubscribe) this.unsubscribe();
    }

  }

  return connect(null, mapDispatchProps)(WithAuthenticationNav);
}

const mapDispatchProps = (dispatch: Function) => ({
  loadAuthUser: () => dispatch(loadAuthUser()),
});

export default withAuthenticationNav;
