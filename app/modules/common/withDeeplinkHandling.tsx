import React from "react";
import { Linking } from "react-native";
import { connect } from 'react-redux';
import { redirect } from "../../actions/common";
import { RedirectParams } from "../../actions/common.types";
import { NavigationContainer } from 'react-navigation';
import { loadAuthUser } from '../../actions/auth';
import { AppState } from "app/reducers/reducers";


const URI_ACCOUNTS_PATTERN = '\/deeplink\/(success|cancel|error)$';
const TAG:string = 'withDeepLinkiHandling';
interface Props {
  user: any,
  redirect: (params: RedirectParams) => void,
  loadAuthUser: () => Promise<any>
}

interface State {
  readyToRedirect: boolean,
  redirectTo?: RedirectParams
}

const withDeeplinkHandling = (WrappedComponent: NavigationContainer) => {
  class NavigatorWithDeepLink extends React.Component<Props, State> {

      static router = {
        ...WrappedComponent.router
      };

      re: RegExp = new RegExp(URI_ACCOUNTS_PATTERN);
      unsubscribe: any;

      constructor(props: Props) {
        super(props);
        this.state = { readyToRedirect: false }
      }

      static getDerivedStateFromProps(props: any, state: any) {
        const { user } = props;
        if (user && user.uid) {
          if (state.redirectTo && !state.readyToRedirect) {
            console.log(TAG, 'getDerivatedStateFrom updating readyToRedirect');
            props.redirect(state.redirectTo);
            return { ...state, readyToRedirect: true };
          }
        }
        return state;
      }
    
      componentDidMount() {
        console.log('NavigatorWithDeepLink > componentDidMount');
        this.props.loadAuthUser();
        Linking.getInitialURL()
          .then(url => {
            console.log(TAG, ' > getInitialUrl ', url);
            this.navigateToInitialPage(url);
          })
          .catch(error => {
            console.log(TAG,' Error obtaining launch URL');
          });
    
        Linking.addEventListener('url', this.handleOpenURL);
      }
    
      handleOpenURL = (event: { url: string }) => {
        console.log(TAG, ' > handleOpenUrl ', event.url);
        this.navigateToInitialPage(event.url);
      };
    
      /** 
       * Check if the given url is a deepLink and redirect to the view related with
       * that deepLink.
       */
      navigateToInitialPage = (url: string | null) => {
        url = url || '';
        // parse the url to check if it's a valid deepLink
        let splitted = url.match(this.re);
        let redirectParams: RedirectParams = { routeName: 'Home' };
        if (splitted) { 
          // in case of more acctions/deeplinks, add a switch to splitted[2] 
          redirectParams = { routeName: 'UserHome', params: splitted[1] };
          console.log(TAG, 'navigateToInitialPage ', redirectParams);
        }
        this.setState({ redirectTo: redirectParams});
      };
      
      render() {
        return(<WrappedComponent { ...this.props } />);
      }

      componentWillUnmount() {
        if (this.unsubscribe) {
          this.unsubscribe();
        }
      }
  }

  const mapStateToProps = (state: AppState) => ({
    user: state.auth.user
  })

  const mapDispatchProps = (dispatch: Function) => ({
    redirect: (params: RedirectParams) => dispatch(redirect(params)),
    loadAuthUser: () => dispatch(loadAuthUser()),
  });
  
  return connect(mapStateToProps, mapDispatchProps)(NavigatorWithDeepLink);
}

export default withDeeplinkHandling;
