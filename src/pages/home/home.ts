import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  //list variables
  passwords: any = [];

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams
  )
  {
  }

  ionViewDidEnter()
  {
    this.storage.get('passwords').then((res: any) => {
      if(res !== null)
      {
        this.passwords = res;
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  goAdd()
  {
    let passwords = this.passwords;
    this.navCtrl.push('AddPage', { passwords });
  }

  delete()
  {
    this.storage.clear().then(() => {
      window.location.reload();
    })
  }

}
