import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  //list variables
  passwords: any;

  constructor(
    public common: CommonProvider,
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams
  )
  {
    this.passwords = this.navParams.get('passwords');
  }

  ionViewDidLoad()
  {
  }

  addPassword(site, username, secret)
  {
    this.passwords.push({
      site: site,
      username: username,
      secret: secret
    })
    this.storage.set('passwords', this.passwords);
    this.navCtrl.pop();
    this.common.showToast("Password added!");
  }
}
