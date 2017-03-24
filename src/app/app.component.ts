import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { IonDigitKeyboard, IonDigitKeyboardOptions } from '../components/ion-digit-keyboard/ion-digit-keyboard';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
	keyboardSettings: IonDigitKeyboardOptions = {
	        align: 'center',
	        width: '',
	        visible: false,
	        leftActionOptions: {
	            iconName: 'ios-backspace-outline',
	            fontSize: '1.4em'
	        },
	        rightActionOptions: {
	            iconName: 'ios-checkmark-circle-outline',
	            fontSize: '1.3em'
	        },
	        roundButtons: false,
	        showLetters: false,
	        swipeToHide: true,
	        // Available themes: IonDigitKeyboard.themes
	        theme: 'light'
	    };
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: '首页', component: TabsPage, icon: 'xx' },
	{ title: '分类', component: TabsPage, index: 1, icon: 'map' },
    { title: '发布', component: TabsPage, index: 2, icon: 'contacts' },
    { title: '消息', component: TabsPage, index: 3, icon: 'calendar' },
    { title: '我的', component: TabsPage, index: 4, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: '账户', component: AccountPage, icon: 'person' },
    { title: '帮助', component: SupportPage, icon: 'help' },
    { title: '登出', component: TabsPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: '登陆', component: LoginPage, icon: 'log-in' },
    { title: '帮助', component: SupportPage, icon: 'help' },
    { title: '注册', component: SignupPage, icon: 'person-add' }
  ];
  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage
  ) {

    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.platformReady()
      })

    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });

    this.listenToLoginEvents();
  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }
  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }
  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      Splashscreen.hide();
    });
  }
  // Event way
  numberClick(key: number) {
      console.log('From event: ', key);
  }

  hideKeyboard() {
      IonDigitKeyboard.hide();
  }
}
