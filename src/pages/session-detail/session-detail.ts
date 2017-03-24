import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import { Auction } from '../../providers/Auction';
import {  Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  private heroesUrl = '/api/auction';
  public auctions: Auction[];
  public grid: Auction[][];
  public pageIndex:number;
  public field:string;//根据字段排序
  public direction:string;//DESC,ASC;//排序方向
  public startPriceicon:string;
  public endtimeicon:string;
  public hitsicon:string;

  private DESC_ICON:string="arrow-down";
  private ASC_ICON:string="arrow-up";
  private pagesize:number=10;
  private categoryId:number;

  constructor(public navParams: NavParams,public http: Http) {
	this.pageIndex=0;
	this.auctions=[];
	this.field="startPrice";
	this.direction="DESC";
	this.startPriceicon=this.DESC_ICON;
	this.endtimeicon=this.DESC_ICON;
	this.hitsicon=this.DESC_ICON;
	this.categoryId=navParams.get('categoryId');

	this.getHeroes();
  }
  getHeroes(): Promise<Auction[]> {
    return this.http.get(this.heroesUrl+"?page="+this.pageIndex+"&size="+this.pagesize+"&direction="+this.direction+"&field="+this.field+"&categoryId="+this.categoryId)
               .toPromise()
               .then((rsp) => {
					this.auctions=this.auctions.concat(rsp.json());
						this.grid = Array(Math.ceil(this.auctions.length/2));
						let rowNum = 0; //counter to iterate over the rows in the grid
						  for (let i = 0; i < this.auctions.length; i+=2) { //iterate images
							this.grid[rowNum] = Array(2); //declare two elements per row

							if (this.auctions[i]) { //check file URI exists
							  this.grid[rowNum][0] = this.auctions[i] //insert image
							}
							if (this.auctions[i+1]) { //repeat for the second image
							  this.grid[rowNum][1] = this.auctions[i+1]
							}
							rowNum++; //go on to the next row
						  }
					this.pageIndex++;
					console.log(this.auctions);
				})
       .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  public orderBy(field:string):void{
	 if ( this.direction=="DESC"){
		 this.direction="ASC";
	 }else{
		  this.direction="DESC";
	 }
	  this.field=field;
	  this.seticon(field,this.direction)
	  this.pageIndex=0;//重新从第一页开始
	  this.auctions=[];//清空缓存
	  this.getHeroes();
  }
  public seticon(field,direction){
	  if ("startPrice"==field){
		  if (this.direction=="DESC"){
			  this.startPriceicon=this.DESC_ICON
		  }else{
			  this.startPriceicon=this.ASC_ICON;
		  }
	  }
	  if ("endtime"==field){
		  if (this.direction=="DESC"){
			  this.endtimeicon=this.DESC_ICON
		  }else{
			  this.endtimeicon=this.ASC_ICON;
		  }
	  }
	  if ("hits"==field){
		  if (this.direction=="DESC"){
			  this.hitsicon=this.DESC_ICON
		  }else{
			  this.hitsicon=this.ASC_ICON;
		  }
	  }
	  
  }
  
}
