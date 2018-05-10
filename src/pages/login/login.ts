import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public common: CommonProvider,
    public androidFingerprintAuth: AndroidFingerprintAuth,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad()
  {
    this.androidFingerprintAuth.isAvailable().then(() => {
      alert("Fingerprint available on this device!");
    })
    .catch(() => {
      alert("Fingerprint is unavailable on this device!");
    })
  }

  login()
  {
    this.androidFingerprintAuth.isAvailable()
      .then((result)=> {
        if(result.isAvailable){
          // it is available

          this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
            .then(result => {
               if (result.withFingerprint) {
                   console.log('Successfully encrypted credentials.');
                   console.log('Encrypted credentials: ' + result.token);
                   this.navCtrl.setRoot('HomePage');
                   this.common.showToast("User Authenticated with Fingerprint!");
               } else if (result.withBackup) {
                 console.log('Successfully authenticated with backup password!');
                 this.navCtrl.setRoot('HomePage');
                 this.common.showToast("User Authenticated with Password!")
               } else console.log('Didn\'t authenticate!');
            })
            .catch(error => {
               if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                 console.log('Fingerprint authentication cancelled');
               } else console.error(error)
            });

        } else {
          // fingerprint auth isn't available
        }
      })
      .catch(error => console.error(error));
  }

}
