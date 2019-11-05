import firebase from 'react-native-firebase';
import ErrorHandlingService from './errorHandling';

const TAG: string = 'AuthService';
// TODO not working. The call ignore this number.
// const AUTO_VERIFICATION_TIMEOUT: number = parseInt(Config.AUTO_VERIFICATION_TIMEOUT); // seconds
class AuthService {

  static signOut() {
    return firebase.auth().signOut()
      .catch( err => {
        if (err.code !== 'auth/no-current-user') {
          console.log(TAG, ' > signOut error: ', err);
        }
      })
  }

  static onAuthStateChanged(listener) {
    return firebase.auth().onAuthStateChanged(listener);
  }

  static isValidConfirmationCode(code: string) {
    return code.length === 6 && !isNaN(code);
  }

  static signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  static async singInWithCredentials(verificationId, code: string): Promise<any> {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
    return firebase.auth().signInWithCredential(credential)
      .catch( err => {
        return Promise.reject(ErrorHandlingService.getFormatedError(err));
      });
  }

  static getCurrentUser() {
    return firebase.auth().currentUser;
  }
  
  static signIn(phoneNumber: string, onSmsSent: Function, onVerified: Function, onError: Function) {
    
    firebase.auth()
      .verifyPhoneNumber(phoneNumber)
      .on('state_changed', (phoneAuthSnapshot) => {
          switch (phoneAuthSnapshot.state) {
            case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
              console.log('code sent');
              onSmsSent({
                verificationId: phoneAuthSnapshot.verificationId
              });
              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
              console.log('auto verify on android timed out');
              // proceed with your manual code input flow, same as you would do in
              // CODE_SENT if you were on IOS
              if (!firebase.auth().currentUser) {
                onSmsSent({
                  verificationId: phoneAuthSnapshot.verificationId
                });
              }
              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFIED:
              console.log('auto verified on android ');
              const { verificationId, code } = phoneAuthSnapshot;
              this.singInWithCredentials(verificationId, code)
                .then( user => { onVerified(user); })
                .catch( err => {
                  console.error('signingWithCredentials error', err);
                  onError(err);
                });
              break;
            case firebase.auth.PhoneAuthState.ERROR: // or 'error'
              const error = phoneAuthSnapshot.error;
              onError(ErrorHandlingService.getFormatedError(error));
              // console.warn('verification error', phoneAuthSnapshot.error);
              break;
          };
        });
  }
}

export default AuthService;