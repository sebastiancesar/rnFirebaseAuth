import React from "react";
import { Linking } from "react-native";
import { connect } from 'react-redux';
import { redirect } from "../../actions/common";
import { RedirectParams } from "../../actions/common.types";
import { NavigationContainer } from 'react-navigation';
import { loadAuthUser } from '../../actions/auth';


const URI_ACCOUNTS_PATTERN = '\/deeplink\/(success|cancel|error)$';

interface Props {
  redirect: (params: RedirectParams) => void,
  loadAuthUser: () => void
}

const withDeeplinkHandling = (WrappedComponent: NavigationContainer) => {
  class NavigatorWithDeepLink extends React.Component<Props> {

      static router = {
        ...WrappedComponent.router
      };

      re: RegExp = new RegExp(URI_ACCOUNTS_PATTERN);
      constructor(props: Props) {
        super(props);
      }
    
      componentDidMount() {
        console.log('NavigatorWithDeepLink > componentDidMount');
        this.props.loadAuthUser();
        Linking.getInitialURL()
          .then(url => {
            console.log('NavigatorWithDeepLink > getInitialUrl ', url);
            this.navigateToInitialPage(url);
          })
          .catch(error => {
            console.log('Error obtaining launch URL');
          });
    
        Linking.addEventListener('url', this.handleOpenURL);
      }
    
      handleOpenURL = (event: { url: string }) => {
        console.log('NavigatorWithDeepLink > handleOpenUrl ', event.url);
        this.navigateToInitialPage(event.url);
      };
    
      /** 
       * Check if the given url is a deepLink and redirect to the view related with
       * that deepLink.
       */
      navigateToInitialPage = (url: string | null) => {
        console.log('NavigatorWithDeepLink navigateToInitialPage ', url);
        url = url || '';
        // parse the url to check if it's a valid deepLink
        let splitted = url.match(this.re);
        
        if (!splitted) { // not valid url, redirect to home
          const redirectParams: RedirectParams = { routeName: 'Home' };
          this.props.redirect(redirectParams);
        } else {
          // in case of more acctions/deeplinks, add a switch to splitted[2] 
          const redirectParams = { routeName: 'Home', params: splitted[2] };
          this.props.redirect(redirectParams);
        }
      };
      
      render() {
        return(<WrappedComponent { ...this.props } />);
      }
  }

  const mapDispatchProps = (dispatch: Function) => ({
    redirect: (params: RedirectParams) => dispatch(redirect(params)),
    loadAuthUser: () => dispatch(loadAuthUser()),
  });
  
  return connect(null, mapDispatchProps)(NavigatorWithDeepLink);
}

export default withDeeplinkHandling;
