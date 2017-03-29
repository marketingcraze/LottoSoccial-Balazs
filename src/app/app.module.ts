import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StorePage } from '../pages/store/store';
import { SyndicatesPage } from '../pages/syndicates/syndicates';
import { GamesPage } from '../pages/games/games';
import { AccountPage } from '../pages/account/account';
import { OffersPage } from '../pages/offers/offers';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { AuthPage } from '../pages/auth/auth';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { SignupInvitedPage } from '../pages/signup-invited/signup-invited';
// import { CountryListPopPage } from '../pages/country-list-pop/country-list-pop';


import { ImagePicker } from '@ionic-native/image-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';


@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    AuthPage,
    SignupPage,
    LoginPage,
    HomePage,
    StorePage,
    SyndicatesPage,
    GamesPage,
    AccountPage,
    OffersPage,
    TabsPage,
    SignupInvitedPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,
      {
        tabsPlacement:'top', 
        iconMode: 'ios',
        tabsHighlight:true, 
        mode:'md',
        modalEnter: 'modal-slide-in',
        modalLeave: 'modal-slide-out',
        statusbarPadding: false
      })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    AuthPage,
    SignupPage,
    LoginPage,
    HomePage,
    StorePage,
    SyndicatesPage,
    GamesPage,
    AccountPage,
    OffersPage,
    TabsPage,
    SignupInvitedPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, 
  CommonService, AuthService, ImagePicker, InAppBrowser]
})
export class AppModule {}
