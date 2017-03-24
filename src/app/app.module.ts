import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { MainPage } from '../pages/main/main';

import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { CreateAuctionPage } from '../pages/create-auction/create-auction';
import { CreateAuction2Page } from '../pages/create-auction2/create-auction2';
import { AuctionListPage } from '../pages/auction-list/auction-list';
import { AuctionDetailPage } from '../pages/auction-detail/auction-detail';
import { IonDigitKeyboard } from '../components/ion-digit-keyboard/ion-digit-keyboard';



@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
	MainPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
	CreateAuctionPage,
	CreateAuction2Page,
	AuctionListPage,
	AuctionDetailPage,
	IonDigitKeyboard
  ],
  imports: [
    IonicModule.forRoot(ConferenceApp,{backButtonText: '返回'}, {})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
	MainPage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
	CreateAuctionPage,
	CreateAuction2Page,
	AuctionListPage,
	AuctionDetailPage
	
  ],
  providers: [ConferenceData, UserData, Storage]
})
export class AppModule { }
