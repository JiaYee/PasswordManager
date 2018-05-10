import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CommonProvider {

  loading: any;

  constructor(
    public toastCtrl: ToastController,
    public plt: Platform,
    public loadingCtrl: LoadingController,
    public splashScreen: SplashScreen,
  )
  {
  }

  hideSplash()
  {
    this.splashScreen.hide();
  }

  startLoading()
  {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  stopLoading()
  {
    this.loading.dismiss().catch(() => {
    });
  }

  WSNumber(number, text)
  {
    let param = "https://api.whatsapp.com/send?phone=6" + number + "&text=" + text;
    window.open(param);
  }

  isDevice()
  {
    if(this.plt.is('cordova'))
    {
      //supports cordova, real device
      return true;
    }
    else
    {
      //not supports cordova, web version
      return false;
    }
  }

  showToast(text)
  {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }
}
