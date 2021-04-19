import { Component, Element, Watch, h } from '@stencil/core';
import { popoverController } from '@ionic/core';
import state from '../../global/store';

@Component({
  tag: 'user-menu',
  styleUrl: 'user-menu.css',
})
export class UserMenu {
  @Element() el: HTMLElement;

  close = async (value?) => {
    await popoverController.dismiss(value)
  }

  signOut = async () => {
    await state.signOut()
    await this.close(null);
  }

  render() {
    return (
      <ion-list>
        {!state.user && <ion-item button href="/login">Sign In</ion-item>}
        <ion-list-header>Ionic</ion-list-header>
        <ion-item button onClick={() => this.close('learn')}>Learn Ionic</ion-item>
        <ion-item button onClick={() => this.close('docs')}>Documentation</ion-item>
        <ion-item button onClick={() => this.close('showcase')}>Showcase</ion-item>
        <ion-item button onClick={() => this.close('github')}>GitHub Repo</ion-item>
        {state.user && <ion-item button onClick={this.signOut}>Sign Out</ion-item>}
      </ion-list>
    );
  }
}
