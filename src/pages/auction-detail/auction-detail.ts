import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonDigitKeyboard } from '../../components/ion-digit-keyboard/ion-digit-keyboard';

/*
 * Generated class for the AuctionDetail page.
 * 
 * See http://ionicframework.com/docs/v2/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-auction-detail',
  templateUrl: 'auction-detail.html'
})
export class AuctionDetailPage {
	  private interval = 1000; 
	  public hour:number;
	  public minute:number;
	  public second:number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  setInterval(()=>{
		  	console.log(1) 
		  	 this.showCountDown(2017,3,23);
		  },this.interval)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuctionDetailPage');
  }
  showCountDown(year,month,day){ 
	  var now = new Date(); 
	  var endDate = new Date(year, month-1, day); 
	  var leftTime:number=endDate.getTime()-now.getTime(); 
	  var leftsecond = Math.floor(leftTime/1000); 
	  var day1=Math.floor(leftsecond/(60*60*24)); 
	  this.hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
	  this.minute=Math.floor((leftsecond-day1*24*60*60-this.hour*3600)/60); 
	  this.second=Math.floor(leftsecond-day1*24*60*60-this.hour*3600-this.minute*60); 

  } 
  showKeyboard() {
      IonDigitKeyboard.show();
  }
}
