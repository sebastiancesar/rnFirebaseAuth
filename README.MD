# React Native + Firebase

This app shows how to use the phone/sms as a signup/singin method (like whatsapp, revolut, etc), using Firebase auth api.

It was implemented following the Auth flow described in [react navigation]( https://reactnavigation.org/docs/en/auth-flow.html)
But also, the idea was let the users open the app through deepLinks. React navigation provides a way for handling deepLinks, but I couldn't make it plays nicely with an authenticated model, like [here](https://stackoverflow.com/questions/54350991/react-navigation-deep-linking-with-authentication)

For detecting if the user is logged in,  firebase provide a [method](https://rnfirebase.io/docs/v5.x.x/auth/reference/auth#onAuthStateChanged
) for registering a listener to capture when the user is retrieved.

That call and the deepLink logic is placed in a kind of [enhanced-navigator](
https://reactnavigation.org/docs/en/custom-navigators.html) through an [HOC](https://reactjs.org/docs/higher-order-components.html)

The state of the app is handled by Redux+ReduxThunk.


There are some (a lot) things to be improved:

* Typescript: it's partially implemented, and not too strict about naming and conventions.

* Style guide: the main source is https://github.com/airbnb/javascript/tree/master/react, but again, it's partially implemented.

* Redux: many things can be improved here
  * naming conventions for actions proposed in the docs https://redux.js.org/advanced/async-actions
  * handling errors, some interesting thoughts about it can be found here https://dispatch.moonfarmer.com/redux-status-and-error-methodology-ec5c1f1634b7
  
* UI Styles: the UI is extremely simple, just 4 screens. Every component has their own stylesheet and some of them are repeated, a refactor would be nice.

* Test: I'm working on adding a testing framework, https://github.com/wix/Detox/blob/master/docs/README.md

* Debbuging: React DevTools is already configured, https://github.com/zalmoxisus/redux-devtools-extension , but I'm curious about Reactotron https://github.com/infinitered/reactotron

* and more ...

## Libs and tools

### React Native App
https://github.com/facebook/react-native

Created with:
$ npx react-native init --template typescript
https://github.com/react-native-community/react-native-template-typescript

### Firebase

For handling the authentication, users, etc.
https://firebase.google.com/

### ReactNative firebase

Wrapper to the sdk provided natively by firebase.
https://rnfirebase.io/

### React navigation
Routing and navigation
https://reactnavigation.org/

### Redux, Redux-react and Redux-thunk: 
State managment
https://react-redux.js.org/
https://github.com/reduxjs/react-redux
https://github.com/reduxjs/redux-thunk

### React Native Elements:
For beutification
https://react-native-elements.github.io/react-native-elements/

