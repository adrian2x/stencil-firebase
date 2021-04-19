
import firebase from "firebase/app"
import "firebase/auth"
import * as firebaseui from 'firebaseui'


firebase.initializeApp({
  apiKey: "AIzaSyDOTyoj9m1nnT9bkG30WXMPuzFjT39Yb9I",
  authDomain: "test-e758d.firebaseapp.com",
  databaseURL: "https://test-e758d.firebaseio.com",
  storageBucket: "test-e758d.appspot.com",
  messagingSenderId: "918779841724"
})

async function signOut() {
  await firebase.auth().signOut()
}

function startFirebaseUI(selector, { callbacks = {} } = {}) {
  const uiConfig = {
    callbacks: {
      ...callbacks,
    },
    signInSuccessUrl: '',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // Whether the display name should be displayed in the Sign Up page.
        requireDisplayName: true
      },
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // Invisible reCAPTCHA with image challenge and bottom left badge.
        recaptchaParameters: {
          type: 'image',
          size: 'invisible',
          badge: 'bottomleft'
        }
      },
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: 'https://www.google.com',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
      window.location.assign('')
    },
  }

  // Initialize the FirebaseUI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(firebase.auth())
  // The start method will wait until the DOM is loaded.
  ui.start(selector, uiConfig)
}

export { firebase, startFirebaseUI, signOut }