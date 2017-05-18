import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages
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
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { EditProfileDetails } from '../pages/edit-profile/edit-profile-details/edit-profile-details';
import { EditProfileEmail } from '../pages/edit-profile/edit-profile-email/edit-profile-email';
import { EditProfilePassword } from '../pages/edit-profile/edit-profile-password/edit-profile-password';
import { MySyndicatePage } from '../pages/my-syndicate/my-syndicate';
import { CheckWinningsPage } from '../pages/check-winnings/check-winnings';
import { ManageSyndicatePage } from '../pages/manage-syndicate/manage-syndicate';
import { LeavePage } from '../pages/leave/leave';
import { Leave2Page } from '../pages/leave2/leave2';
import { TandcPage } from '../pages/tandc/tandc';
import { ConfirmModalPage } from '../pages/confirm-modal/confirm-modal';
import { ManageSyndicate2Page } from '../pages/manage-syndicate2/manage-syndicate2';
import { RecentDrawPage } from '../pages/recent-draw/recent-draw';
import { CheckWinningsNextPage } from '../pages/check-winnings-next/check-winnings-next';
import { ViewTicketsPage } from '../pages/view-tickets/view-tickets';
import { YourTicketsPage } from '../pages/your-tickets/your-tickets';
import { CountryListPopPage } from '../pages/country-list-pop/country-list-pop';
import { CusHeaderComponent } from '../components/cus-header/cus-header';
import { CusHeader1Component } from '../components/synd-cus-header1/synd-cus-header1';
import { CusHeader2Component } from '../components/synd-cus-header2/synd-cus-header2';
import { ChooseImagePage } from '../pages/choose-image/choose-image';

// services
import { Params } from '../services/params';
import { DatabaseService } from '../services/db.service';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';
import { HomeService } from '../services/service.home';
import { AccountService } from '../services/account.service';
import { SyndicateService } from '../services/syndicate-service';

// providers
import { ImagePicker } from '@ionic-native/image-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OneSignal } from '@ionic-native/onesignal';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

// pipes
import { MyFilterPipe } from '../pipes/contact-selected'
import { lotsPipe } from '../pipes/selected-lottries';

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
    EditProfilePage, 
    EditProfileDetails,
    EditProfileEmail,
    EditProfilePassword,
     ManageSyndicatePage,
     LeavePage,
     Leave2Page,
     TandcPage,
     ManageSyndicate2Page,
     ConfirmModalPage,
     RecentDrawPage,
     CheckWinningsNextPage,
     ViewTicketsPage,
     YourTicketsPage,
    CheckWinningsPage,
    MySyndicatePage,

    MyFilterPipe,
    lotsPipe,

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
      }),
      IonicStorageModule.forRoot({
          name: '__lottosocialdb',
          driverOrder: ['indexeddb', 'sqlite', 'websql']
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
    EditProfilePage,
    EditProfileDetails,
    EditProfileEmail,
    EditProfilePassword,
     ManageSyndicatePage,
     LeavePage,
     Leave2Page,
     TandcPage,
     ManageSyndicate2Page,
     ConfirmModalPage,
     RecentDrawPage,
     CheckWinningsNextPage,
     ViewTicketsPage,
     YourTicketsPage,
    CheckWinningsPage,
    MySyndicatePage,

    CountryListPopPage,
    RedeemGamesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, 
  DatabaseService, CommonService, AuthService, HomeService, AccountService, Params, 
  SQLite, ImagePicker, Transfer, File, InAppBrowser, OneSignal, SyndicateService]

})
export class AppModule {}
