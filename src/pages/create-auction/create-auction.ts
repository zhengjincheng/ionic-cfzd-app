import { Component } from '@angular/core';
import { NavController, NavParams ,ToastController} from 'ionic-angular';
import { CreateAuction2Page } from '../create-auction2/create-auction2';
import { WxConfig } from '../../providers/WxConfig';
import { WxImage } from '../../providers/WxImage';

import {  Http } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';  

/*
  Generated class for the CreateAuction page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-auction',
  templateUrl: 'create-auction.html'
})
export class CreateAuctionPage {
  private heroesUrl = '/api/wx/product/wxconfig';
  public wxConfig: WxConfig;
  private uploadImageUrl='/api/wx/uploadImage';
  public wxImages: WxImage[]=[];

  constructor(public toastCtrl:ToastController,public cd: ChangeDetectorRef ,public http: Http,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAuctionPage');
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
  }
  next(name){
		if (this.wxImages.length<1){
			this.presentToast("请先上传图片");
			return false;
		}
	  	this.navCtrl.push(CreateAuction2Page,{ wxImages:this.wxImages });

  }
  selectImage(){
	 var _http=this.http;
	 var _uploadImageUrl=this.uploadImageUrl;
	 var _wxImages=this.wxImages;
	 var _cd=this.cd;

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
								let wxImage=rsp.json();
								_wxImages.push(wxImage);
								_cd.detectChanges();
						   })
                        
                    }
                });
		    }
		});
	  
	  
  }
  previewImage(curPath){
	let urls:string[]=[]; 
	for (let item of this.wxImages){
		urls.push(item.osspath);
	}
	wx.previewImage({
		current: curPath, // 当前显示图片的http链接
		urls: urls // 需要预览的图片http链接列表
	});
 }
	 public presentToast(message) {
		  let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'top'
		  });

		  toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		  });

		  toast.present();
	}
	
}
