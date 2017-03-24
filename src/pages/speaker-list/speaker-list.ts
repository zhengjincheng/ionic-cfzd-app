
import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

import { ConferenceData } from '../../providers/conference-data';
import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
import { WxConfig } from '../../providers/WxConfig';
import {  Http } from '@angular/http';


@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {
  actionSheet: ActionSheet;
  speakers = [];
  //private heroesUrl = '/api/wx/dev/wxconfig';
  private heroesUrl = '/api/wx/product/wxconfig';
  public wxConfig: WxConfig;
  private uploadImageUrl='/api/wx/uploadImage';
  
  constructor(private http: Http,public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public confData: ConferenceData, public config: Config) {}

  ionViewDidLoad() {
	  
	  this.http.get(this.heroesUrl)
               .toPromise()
               .then((rsp) => {
				   this.wxConfig=rsp.json();
				   wx.config({
						debug: false, 
						appId: this.wxConfig.appId, 
						timestamp: this.wxConfig.timestamp, 
						nonceStr: this.wxConfig.nonceStr,
						signature: this.wxConfig.signature,
						jsApiList: ['chooseImage','previewImage','uploadImage','downloadImage'] 
					});
			   });
	  
	 
	
    this.confData.getSpeakers().subscribe(speakers => {
      this.speakers = speakers;
    });
  }

  goToSessionDetail(session) {
   // this.navCtrl.push(SessionDetailPage, session);
   var _http=this.http;
   var _uploadImageUrl=this.uploadImageUrl;

   wx.chooseImage({
		    count: 1, // 默认9
		    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		    success: function (res) {
		        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
               // $("#serverId").text("localIds="+localIds);
                wx.uploadImage({
                    localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1,// 默认为1，显示进度提示
                    success: function (res2) {
                        var serverId = res2.serverId; // 返回图片的服务器端ID
						 _http.get(_uploadImageUrl+"?localId="+localIds.toString()+"&serverId="+serverId)
						   .toPromise()
						   .then((rsp) => {
							this.wxConfig=rsp.json();
						   })
                        
                    }
                });
		    }
		});
  }

  goToSpeakerDetail(speakerName: any) {
    this.navCtrl.push(SpeakerDetailPage, speakerName);
  }

  goToSpeakerTwitter(speaker) {
    new InAppBrowser(`https://twitter.com/${speaker.twitter}`, '_blank');
  }

  openSpeakerShare(speaker) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: ($event) => {
            console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
            if (window['cordova'] && window['cordova'].plugins.clipboard) {
              window['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  openContact(speaker) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        }
      ]
    });

    actionSheet.present();
  }
}
