import { Component, State, Listen, Element, Watch, h } from '@stencil/core';
import { popoverController } from '@ionic/core';
import cx from 'classnames';
import state from '../../global/store';

@Component({
  tag: 'url-home',
  styleUrl: 'url-home.css',
})
export class ViewHome {
  @Element() el: HTMLElement;
  @State() expandSearch = false;
  searchInput: HTMLIonSearchbarElement;

  @Listen('ionCancel')
  onSearchCancel() {
    this.expandSearch = false;
  }

  @Watch('expandSearch')
  watchHandler(newValue: boolean) {
    console.log('watch:expandSearch', newValue);
    if (newValue) {
      setTimeout(() => {
        // Expanded search, should autoFocus
        this.searchInput.setFocus();
      }, 100);
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-toggle>
              <ion-menu-button autoHide={false}></ion-menu-button>
            </ion-menu-toggle>
          </ion-buttons>

          {state.isAuthenticated()
            ? [
                <ion-buttons slot="primary">
                  <ion-button onClick={this.presentPopover}>
                    <ion-icon slot="start" name="person-sharp"></ion-icon> {state.user?.displayName}
                  </ion-button>
                </ion-buttons>,
              ]
            : [
                <ion-buttons slot="primary">
                  <ion-button href="/login">
                    <ion-icon slot="start" name="person-sharp"></ion-icon> Sign In
                  </ion-button>
                </ion-buttons>,
              ]}

          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-content class="ion-padding">
          <p>
            Welcome to the PWA Toolkit. You can use this starter to build entire apps with web components using Stencil and ionic/core! Check out the README for everything that
            comes in this starter out of the box and check out our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get started.
          </p>

          <ion-button href="/profile/ionic" expand="block">
            Profile page
          </ion-button>
        </ion-content>
      </ion-content>,
    ];
  }

  presentPopover = async event => {
    if (!state.isAuthenticated()) {
      return window.location.assign('/');
    }
    const popover = await popoverController.create({
      component: 'user-menu',
      translucent: true,
      showBackdrop: false,
      event,
    });
    await popover.present();
    const { data, role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', data, role);
  };
}
