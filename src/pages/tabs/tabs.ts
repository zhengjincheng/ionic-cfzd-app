import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { MainPage } from '../main/main';

import { SpeakerListPage } from '../speaker-list/speaker-list';
import { ActionSheetController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { CreateAuctionPage } from '../create-auction/create-auction';
import { CreateAuction2Page } from '../create-auction2/create-auction2';
import { AuctionListPage } from '../auction-list/auction-list';
import { AuctionDetailPage } from '../auction-detail/auction-detail';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  //tab0Root: any = MainPage;
   tab0Root: any = AuctionDetailPage;
 // tab0Root: any = CreateAuction2Page;
  tab1Root: any = SchedulePage;
  tab2Root: any = SpeakerListPage;
  //tab3Root: any = MapPage;
  tab3Root: any = AuctionListPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams,public actionSheetCtrl: ActionSheetController,public navCtrl: NavController) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
     // title: 'Modify your album',
      buttons: [
        {
          text: '新建拍场',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
			this.navCtrl.push(SpeakerListPage, 'speakerName');

          }
        },{
          text: '新建拍品',
          handler: () => {
            console.log('Archive clicked');
			this.navCtrl.push(CreateAuctionPage, 'CreateAuctionPage');
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
