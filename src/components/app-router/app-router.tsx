import { Component, State, h } from '@stencil/core';
import { popoverController } from '@ionic/core';
import state from '../../global/store';

const PrivateRoute = props => {
  return state.isAuthenticated() ? <ion-route {...props} /> : <ion-route-redirect from="*" to="/login"></ion-route-redirect>;
};

@Component({
  tag: 'app-router',
  styleUrl: 'app-router.css',
})
export class AppRoot {
  @State() expandSearch = false;
  searchInput: HTMLIonSearchbarElement;

  render() {
    return (
      <ion-app>
        <ion-nav id="main" />
        <ion-menu content-id="main">
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title>Menu</ion-title>
            </ion-toolbar>
          </ion-header>

          <ion-content>
            <ion-list>
              <ion-list-header>Navigation</ion-list-header>
              <ion-menu-toggle auto-hide="false">
                <ion-item button href="/">
                  <ion-icon slot="start" name="home-sharp"></ion-icon>
                  <ion-label>Home</ion-label>
                </ion-item>
                <ion-item button href="/profile/ionic">
                  <ion-icon slot="start" name="information-circle-sharp"></ion-icon>
                  <ion-label>About</ion-label>
                </ion-item>
                <ion-item button href="/loading">
                  <ion-icon slot="start" name="cloud-download-sharp"></ion-icon>
                  <ion-label>Loading</ion-label>
                </ion-item>
                <ion-item button href="/settings">
                  <ion-icon slot="start" name="settings-sharp"></ion-icon>
                  <ion-label>Settings</ion-label>
                </ion-item>
                <ion-item button href="/grid-demo">
                  <ion-icon slot="start" name="settings-sharp"></ion-icon>
                  <ion-label>Grid</ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>
          </ion-content>
        </ion-menu>

        <ion-router useHash={false}>
          <ion-route url="/" component="url-home" />
          <ion-route url="/login" component="login-page" />
          <PrivateRoute url="/grid-demo" component="ag-grid-demo-page"></PrivateRoute>
          <PrivateRoute url="/settings" component="url-settings"></PrivateRoute>
          <PrivateRoute url="/profile/:name" component="url-profile"></PrivateRoute>
          <ion-route url="/loading" component="url-loading" />
        </ion-router>
      </ion-app>
    );
  }
}
