import { createStore } from "@stencil/store"

import { firebase } from './firebase'

const { state, onChange } = createStore({
  clicks: 0,
  seconds: 0,
  squaredClicks: 0,
  user: null,

  signOut: async () => {
    // TODO: sync to IndexedDB
    await firebase.auth().signOut()
    state.user = null
  },

  isAuthenticated() {
    return this.user != null
  }
})

export default state

onChange('clicks', value => {
  state.squaredClicks = value ** 2
})

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // TODO: sync to IndexedDB
    // User is signed in.
    state.user = user
    console.log('signed in as ', user)
    var displayName = user.displayName
    var email = user.email
    var emailVerified = user.emailVerified
    var photoURL = user.photoURL
    var uid = user.uid
    var phoneNumber = user.phoneNumber
    var providerData = user.providerData
    user.getIdToken().then(function (accessToken) {
      // document.getElementById('sign-in-status').textContent = 'Signed in'
      // document.getElementById('sign-in').textContent = 'Sign out'
      // document.getElementById('account-details').textContent = JSON.stringify({
      //   displayName: displayName,
      //   email: email,
      //   emailVerified: emailVerified,
      //   phoneNumber: phoneNumber,
      //   photoURL: photoURL,
      //   uid: uid,
      //   accessToken: accessToken,
      //   providerData: providerData
      // }, null, '  ')
    })
  } else {
    // User is signed out.
    // document.getElementById('sign-in-status').textContent = 'Signed out'
    // document.getElementById('sign-in').textContent = 'Sign in'
    // document.getElementById('account-details').textContent = 'null'
  }
}, function (error) {
  console.log(error)
})
