import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { Platform, NavController } from 'ionic-angular';
import { SessionDetailPage } from '../session-detail/session-detail';



@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public navCtrl: NavController,public confData: ConferenceData, public platform: Platform) {
	      

  }

  ionViewDidLoad() {

     

  }
  goToSessionDetail(sessionData) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(SessionDetailPage, sessionData);
  }
}
