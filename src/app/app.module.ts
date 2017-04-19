import { BrowserModule } from '@angular/platform-browser';
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
import { JoinSyndicatePage } from '../pages/join-syndicate/join-syndicate';
import { AddSyndicatePage } from '../pages/add-syndicate/add-syndicate';
import { NewSyndicatePage } from '../pages/new-syndicate/new-syndicate';
import { YourGamesPage } from '../pages/your-games/your-games';
import { RedeemGamesPage } from '../pages/redeem-games/redeem-games';
import { InviteFriendsPage } from '../pages/invite_friends/invite_friends';
import { OffersForYouPage } from '../pages/offers-for-you/offers-for-you';
import { CreateSyndicatePage } from '../pages/create-syndicate/create-syndicate';
import { CreateSyndicate2Page } from '../pages/create-syndicate2/create-syndicate2';
import { CreateSyndicate3Page } from '../pages/create-syndicate3/create-syndicate3';
import { CreateSyndicate4Page } from '../pages/create-syndicate4/create-syndicate4';
import { CreateSyndicate5Page } from '../pages/create-syndicate5/create-syndicate5';
import { CreateSyndicateTab } from '../pages/create-syndicate-tab/create-syndicate-tab';

import { ImagePicker } from '@ionic-native/image-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Params } from '../services/params';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';
import { HomeService } from '../services/service.home';

import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

import { MyFilterPipe } from '../pipes/contact-selected'

import { CountryListPopPage } from '../pages/country-list-pop/country-list-pop';
import { CusHeaderComponent } from '../components/cus-header/cus-header';
import { CusHeader1Component } from '../components/synd-cus-header1/synd-cus-header1';
import { CusHeader2Component } from '../components/synd-cus-header2/synd-cus-header2';
import { ChooseImagePage } from '../pages/choose-image/choose-image';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

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
    SignupInvitedPage,
    JoinSyndicatePage,
    NewSyndicatePage,
    InviteFriendsPage,
    YourGamesPage,
    RedeemGamesPage,
    AddSyndicatePage,
    CreateSyndicatePage,
    CreateSyndicate2Page,
    CreateSyndicate3Page,
    CreateSyndicate4Page,
    CreateSyndicate5Page,
    OffersForYouPage,
    CreateSyndicateTab,
    ChooseImagePage,

    MyFilterPipe,


    CountryListPopPage,
    CusHeaderComponent,
    CusHeader1Component,
    CusHeader2Component

  ],
  imports: [
      // BrowserAnimationsModule,
      BrowserModule,
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
    SignupInvitedPage,
    JoinSyndicatePage,
    NewSyndicatePage,
    InviteFriendsPage,
    YourGamesPage,
    AddSyndicatePage,
    OffersForYouPage,
    CreateSyndicateTab,
    CreateSyndicatePage,
    CreateSyndicate2Page,
    CreateSyndicate3Page,
    CreateSyndicate4Page,
    CreateSyndicate5Page,
    ChooseImagePage,

    CountryListPopPage,
    RedeemGamesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, 
  CommonService, AuthService, HomeService, Params, SecureStorage, ImagePicker, Transfer, 
  File, InAppBrowser]
})
export class AppModule {}
