import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonPullupModule } from 'ionic-pullup';

// Pages
import { SplashPage } from '../pages/splash/splash';
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
import { UpdatePage } from '../pages/update/update';
import { OfflinePage } from '../pages/offline/offline';
import { SignupInvitedPage } from '../pages/signup-invited/signup-invited';
import { JoinSyndicatePage } from '../pages/join-syndicate/join-syndicate';
import { AddSyndicatePage } from '../pages/add-syndicate/add-syndicate';
import { NewSyndicatePage } from '../pages/new-syndicate/new-syndicate';
import { YourGamesPage } from '../pages/your-games/your-games';
import { RedeemGamesPage } from '../pages/redeem-games/redeem-games';
import { InviteFriendsPage } from '../pages/invite_friends/invite_friends';
import { OffersForYouPage } from '../pages/offers-for-you/offers-for-you';
import { YourOffersPage } from '../pages/your-offers/your-offers';
import { SendBonusPage } from '../pages/send-bonus/send-bonus';
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
import { ChooseCreditcashPage } from '../pages/ChooseCreditcash/ChooseCreditcash';
import { CashModalPage } from '../pages/chooseCash-modal/chooseCash-modal';
import { CreditModalPage } from '../pages/chooseCredit-modal/chooseCredit-modal';
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
import { ChooseNumberPage } from '../pages/choose-number/choose-number';
import { ConfirmNumberPage } from '../pages/confirm-number/confirm-number';
import { PaymentPage } from '../pages/payment/payment';
import { PlayGamePage } from '../pages/play-games/play-games';
import { PlayGamesThankYou } from '../pages/play-games-thank-you/play-games-thank-you';
import { GetBooster } from '../pages/play-games-get-booster/play-games-get-booster';
import { BadgesPage } from '../pages/badges/badges';
import { GameThankYou} from '../pages/game-Thank-You/game-Thank-You';
import { GameThankyouSubmittip } from '../pages/game-Thank-You-SubmitTip-modal/game-Thank-You-SubmitTip-modal';
import { howtoplay } from '../pages/game-start-how-to-play/game-start-how-to-play';
import { recentWinnerTips } from '../pages/recent-winners-tips/recent-winners-tips';
import { gameTerms } from '../pages/game-start-game-terms/game-start-game-terms';
import { referFriend } from '../pages/refer-friend-page/refer-friend-page';
import { offerBuy } from '../pages/offerbuy-page/offerbuy-page';
import { offerBuyResultPage } from '../pages/offerBuyresultpage/offerBuyresultpage';
import { offerOfTheDayModal } from '../pages/offer-of-the-day-modal/offer-of-the-day-modal';
import { your_vouchers } from '../pages/your_vouchers/your_vouchers'
import { your_vouchers_popups } from '../pages/your_vouchers_popups/your_vouchers_popups'
import { PrizeSummaryWinPage } from '../pages/prize-summary-win/prize-summary-win';
import { getGamesModal } from '../pages/get-games-modal/get-games-modal'
import { inboxModal } from '../pages/inbox-popup/inbox-popup';
import { gameLoss } from '../pages/play-gamesLoss/play-gamesLoss';
import { confirmOfferPurchasePage } from '../pages/confirm-offer-purchase/confirm-offer-purchase';
import { AffiliatePopup } from '../pages/affiliate_popups/affiliate_popups';
import { HelpPage } from '../pages/Help/Help'
import { AgreementPage } from '../pages/agreement/agreement'
import { newArrowHeader } from '../components/newArrowHeader/newArrowHeader';
import { buyOfferTips } from '../pages/BuyofferPageTips/BuyofferPageTips';
import  { OverlayPage } from '../pages/overlaypage/overlay-page'


// components
import { NoInternetMessageComponent } from '../components/no-internet-message/no-internet-message';
import { PopupConfirmPaymentComponent } from '../components/popup-confirm-payment/popup-confirm-payment';
import { PopupMessageDetails } from '../components/popup-message-details/popup-message-details';

// services
import { Params } from '../services/params';
import { DatabaseService } from '../services/db.service';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';
import { HomeService } from '../services/service.home';
import { AccountService } from '../services/account.service';
import { OfferService } from '../services/offer.service';
import { SyndicateService } from '../providers/syndicate-service';
import { PlayGame } from '../services/playgame.service';
import { ReferFriend } from '../services/referfriend.service';
import { productOffer } from '../services/productoffer.service';
import { VoucherService } from '../services/voucherList_service'
import { AffiliateServices } from '../services/affliate.service';
import { forkOffersSyndicate } from '../services/syndicateForkOffer.service';

// providers
import { ImagePicker } from '@ionic-native/image-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OneSignal } from '@ionic-native/onesignal';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
import { Contacts } from '@ionic-native/contacts';
import { Market } from '@ionic-native/market';
import { NativeAudio } from '@ionic-native/native-audio';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AnimationService, AnimatesDirective } from 'css-animator';
import { paymentService } from '../services/paymentService'
// pipes
import { MyFilterPipe } from '../pipes/contact-selected'
import { lotsPipe } from '../pipes/selected-lottries';
import { FilterPipe } from '../pipes/filter-pipe';
import { KeysPipe } from '../pipes/keys-pipe';
import { DayPipe } from '../pipes/day-pipe';
import { ValuePipe } from '../pipes/value-pipe';
import { CapitalizeFirstPipe } from '../pipes/capitalize-first';
import { AppSoundProvider } from '../providers/app-sound/app-sound';
import { TimeDifferencePipe } from '../pipes/time-difference';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { DateLeftPipe } from '../pipes/date-left/date-left';
import { SimpleTimer } from 'ng2-simple-timer';
import { Device } from '@ionic-native/device';
import { AffiliatePage } from '../pages/affiliate/affiliate'


@NgModule({
    declarations: [
        MyApp,
        SplashPage,
        AnimatesDirective,
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
        UpdatePage,
        OfflinePage,
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
        ChooseNumberPage,
        ConfirmNumberPage,
        PaymentPage,
        EditProfilePage,
        EditProfileDetails,
        EditProfileEmail,
        EditProfilePassword,
        ManageSyndicatePage,
        LeavePage,
        Leave2Page,
        ChooseCreditcashPage,
        CashModalPage,
        CreditModalPage,
        TandcPage,
        ManageSyndicate2Page,
        ConfirmModalPage,
        RecentDrawPage,
        CheckWinningsNextPage,
        ViewTicketsPage,
        YourTicketsPage,
        CheckWinningsPage,
        MySyndicatePage,
        GetBooster,
        PlayGamePage,
        PrizeSummaryWinPage,
        PlayGamesThankYou,
        BadgesPage,
        GameThankYou,
        GameThankyouSubmittip,
        howtoplay,
        recentWinnerTips,
        gameTerms,
        YourOffersPage,
        SendBonusPage,
        referFriend,
        offerBuy,
        offerBuyResultPage,
        offerOfTheDayModal,
        your_vouchers,
        your_vouchers_popups,
        AnimatesDirective,
        getGamesModal,
        inboxModal,
        gameLoss,
        confirmOfferPurchasePage,
        AffiliatePage,
        AffiliatePopup,
        HelpPage,

        AgreementPage,

        newArrowHeader,
        buyOfferTips,
        OverlayPage,
     
        // master,
        // OffersPayment,

        // pipes
        MyFilterPipe,
        lotsPipe,
        FilterPipe,
        KeysPipe,
        DayPipe,
        ValuePipe,
        CapitalizeFirstPipe,
        TimeDifferencePipe,

        // popups 
        CountryListPopPage,
        CusHeaderComponent,
        CusHeader1Component,
        CusHeader2Component,
        NoInternetMessageComponent,
        PopupConfirmPaymentComponent,
        PopupMessageDetails,
    ProgressBarComponent,
    DateLeftPipe
    ],
    imports: [
        // BrowserAnimationsModule,
        BrowserModule,
        IonicModule.forRoot(MyApp,
        {
            autoFocusAssist: false,
            scrollAssist: false,
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
        }),
        IonPullupModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        SplashPage,
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
        UpdatePage,
        OfflinePage,
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
        ChooseNumberPage,
        ConfirmNumberPage,
        PaymentPage,
        EditProfilePage,
        EditProfileDetails,
        EditProfileEmail,
        EditProfilePassword,
        ManageSyndicatePage,
        LeavePage,
        Leave2Page,
        ChooseCreditcashPage,
        CashModalPage,
        CreditModalPage,
        TandcPage,
        ManageSyndicate2Page,
        ConfirmModalPage,
        RecentDrawPage,
        CheckWinningsNextPage,
        ViewTicketsPage,
        YourTicketsPage,
        CheckWinningsPage,
        MySyndicatePage,
        GetBooster,
        PlayGamePage,
        PrizeSummaryWinPage,
        PlayGamesThankYou,
        BadgesPage,
        GameThankYou,
        GameThankyouSubmittip,
        howtoplay,
        recentWinnerTips,
        gameTerms,
        referFriend,
        offerBuy,
        offerBuyResultPage,
        offerOfTheDayModal,
        your_vouchers,
        getGamesModal,
        inboxModal,
        gameLoss,
        confirmOfferPurchasePage,
        AffiliatePopup,
        HelpPage,
        newArrowHeader,
        buyOfferTips,
        OverlayPage,
  
        // popovers
        // OffersPayment,
        CountryListPopPage,
        RedeemGamesPage,
        YourOffersPage,
        SendBonusPage,
        your_vouchers_popups,
        AffiliatePage,
        AgreementPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
        AnimationService, DatabaseService,paymentService, CommonService, AuthService, HomeService, AccountService, Params,AffiliateServices,
        SQLite, ImagePicker, Transfer, File, InAppBrowser, OneSignal, SyndicateService,VoucherService,
        Network, SimpleTimer, OfferService, Market, NativeAudio, AppSoundProvider,productOffer, PlayGame, ReferFriend, SocialSharing,Device,Contacts,forkOffersSyndicate]

})
export class AppModule { }
