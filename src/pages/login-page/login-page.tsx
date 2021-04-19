import { Component, State, h } from '@stencil/core';
import state from '../../global/store';

import { firebase, startFirebaseUI, signOut } from '../../global/firebase';

@Component({
  tag: 'login-page',
  styleUrl: 'login-page.css',
})
export class ViewProfile {
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
          <ion-title>Sign In</ion-title>
        </ion-toolbar>
      </ion-header>,

      this.isLoading && <ion-progress-bar type="indeterminate"></ion-progress-bar>,

      <ion-content class="ion-padding">
        <h1 class="ion-text-center">Please Sign In to continue</h1>
        <div id="firebaseui-auth-container"></div>
        <div id="sign-in" onClick={signOut}></div>
        <div id="sign-in-status"></div>
        <div id="account-details"></div>
      </ion-content>,
    ];
  }

  componentDidLoad() {
    // Render the authentication flow
    startFirebaseUI('#firebaseui-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // Process result. This will not trigger on merge conflicts.
          // On success redirect to signInSuccessUrl.
          return false;
        },
        signInFailure: function (error) {
          // Some unrecoverable error occurred during sign-in.
          // Return a promise when error handling is completed and FirebaseUI
          // will reset, clearing any UI. This commonly occurs for error code
          // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
          // occurs. Check below for more details on this.
          console.error(error);
        },
        uiShown: () => {
          this.isLoading = false;
        },
      },
    });
  }
}
