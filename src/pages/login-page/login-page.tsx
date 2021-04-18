import { Component, State, h } from '@stencil/core';
import state from '../../global/store';

import firebase from "firebase/app";
import "firebase/auth";

import * as firebaseui from 'firebaseui'



const firebaseConfig = {
  apiKey: "AIzaSyDOTyoj9m1nnT9bkG30WXMPuzFjT39Yb9I",
  authDomain: "test-e758d.firebaseapp.com",
  databaseURL: "https://test-e758d.firebaseio.com",
  storageBucket: "test-e758d.appspot.com",
  messagingSenderId: "918779841724"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@Component({
  tag: 'login-page',
  styleUrl: 'login-page.css',
})
export class ViewProfile {
  @State() user = null;
  @State() isLoading = true;

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-toggle>
              <ion-menu-button autoHide={false}></ion-menu-button>
            </ion-menu-toggle>
          </ion-buttons>
          <ion-title>Please register or Sign In</ion-title>
        </ion-toolbar>
      </ion-header>,
      
      this.isLoading && <ion-progress-bar type="indeterminate"></ion-progress-bar>,

      <ion-content class="ion-padding">
        <div id="firebaseui-auth-container"></div>
        <div id="sign-in" onClick={this.signOut}></div>
        <div id="sign-in-status"></div>
        <div id="account-details"></div>
      </ion-content>,
    ];
  }

  componentDidLoad() {
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // Process result. This will not trigger on merge conflicts.
          // On success redirect to signInSuccessUrl.
          return true;
        },
        signInFailure: function(error) {
          // Some unrecoverable error occurred during sign-in.
          // Return a promise when error handling is completed and FirebaseUI
          // will reset, clearing any UI. This commonly occurs for error code
          // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
          // occurs. Check below for more details on this.
          console.error(error);
        },
        uiShown: () => {
          this.isLoading = false;
        }
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
      privacyPolicyUrl: function() {
        window.location.assign('');
      },
    };

    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  connectedCallback() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        user.getIdToken().then(function(accessToken) {
          document.getElementById('sign-in-status').textContent = 'Signed in';
          document.getElementById('sign-in').textContent = 'Sign out';
          document.getElementById('account-details').textContent = JSON.stringify({
            displayName: displayName,
            email: email,
            emailVerified: emailVerified,
            phoneNumber: phoneNumber,
            photoURL: photoURL,
            uid: uid,
            accessToken: accessToken,
            providerData: providerData
          }, null, '  ');
        });
      } else {
        // User is signed out.
        document.getElementById('sign-in-status').textContent = 'Signed out';
        document.getElementById('sign-in').textContent = 'Sign in';
        document.getElementById('account-details').textContent = 'null';
      }
    }, function(error) {
      console.log(error);
    });
  }

  signOut = async () => {
    await firebase.auth().signOut()
    this.user = null;
  }
}
