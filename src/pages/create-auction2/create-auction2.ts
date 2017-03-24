import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Category } from '../../providers/Category';
import { Http ,URLSearchParams } from '@angular/http';
import { WxImage } from '../../providers/WxImage';
import { Result } from '../../providers/Result';
import { AlertController,ToastController } from 'ionic-angular';

import {  isPresent } from '../../providers/Util';




/*
  Generated class for the CreateAuction2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-auction2',
  templateUrl: 'create-auction2.html'
})
export class CreateAuction2Page {
  private heroesUrl = '/api/category';
  private publishUrl = '/api/auction/add';

  public categorys: Category[]=[];
  public selected:number;
  public freeship:boolean=true;
  public returnable:boolean=false;
  public name:string;
  public startPrice:number;
  public addrange:number;
  public deposit:number;
  public fixedPrice:number;
  public endtime:string;
  public description:string;

  public wxImages: WxImage[]=[];

  public subImages:string[]=[];
  constructor(public alertCtrl:AlertController ,public toastCtrl:ToastController,public http: Http,public navCtrl: NavController, public navParams: NavParams) {
	  this.wxImages= this.navParams.get('wxImages');
  }
  
  

  ionViewDidLoad() {
		this.getCategory();

  }
  getCategory(): Promise<Category[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then((rsp) => {
					let categorys=rsp.json();
					for (let  item of categorys ){
						if (item.children!=null){
							for (let i of item.children ){
								this.categorys.push(i);
							}
							
						}
					}
					console.log(this.categorys);
				})
       .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  publish(){
		if (isPresent(this.selected)==false) {
			this.presentToast("请选择分类");
			return false;
		}
		if (isPresent(this.name)==false) {
			this.presentToast("请输入名称");
			return false;
		}
		if (isPresent(this.startPrice)==false) {
			this.presentToast("请输入起拍价");
			return false;
		}
		if (isPresent(this.addrange)==false) {
			this.presentToast("请输入加价幅度");
			return false;
		}
		if (isPresent(this.endtime)==false) {
			this.presentToast("请输入截止时间");
			return false;
		}
		if (isPresent(this.description)==false) {
			this.presentToast("请输入描述");
			return false;
		}
		if (isPresent(this.deposit)==false) {
			this.presentToast("请输入保证金");
			return false;
		}
		if (isPresent(this.fixedPrice)==false) {
			this.presentToast("请输入一口价");
			return false;
		}
		
		for (let item of this.wxImages){
			this.subImages.push(item.osspath);
		}
		let params = new URLSearchParams();
		params.set('freeship' , String(this.freeship));
		params.set('returnable' , String(this.returnable));
		params.set('description' , this.description);
		params.set('name' , this.name);
		params.set('startPrice' , String(this.startPrice));
		params.set('addrange' , String(this.addrange));
		params.set('deposit' , String(this.deposit));
		params.set('fixedPrice' , String(this.fixedPrice));
		params.set('endtime' , this.endtime.replace('T',' ').replace('Z',''));
		params.set('subImages' , String(this.subImages));
		params.set('category' , String(this.selected));


	  this.http.post(this.publishUrl,params)
               .toPromise()
               .then((rsp) => {
					let result:Result =rsp.json();
					if (result.sucess){
						let alert = this.alertCtrl.create({
							  title: '发布成功',
							  buttons: [{
								text: 'Ok',
								handler: () => {
									  this.navCtrl.pop();
								  return true;
								}
							  }]
							});
						  alert.present();
					}else {
						
						this.presentToast(result.message);
					}
					//发布成功后
				})
       .catch(this.handleError); 
	  
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
