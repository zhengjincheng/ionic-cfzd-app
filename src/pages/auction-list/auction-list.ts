import { Component } from '@angular/core';
import {  NavParams } from 'ionic-angular';
import { Http  } from '@angular/http';
import { Category } from '../../providers/Category';
import { Auction } from '../../providers/Auction';

/*
  Generated class for the AuctionList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-auction-list',
  templateUrl: 'auction-list.html'
})
export class AuctionListPage {
  private heroesUrl = '/api/auction';
    private categoryUrl = '/api/category';

  public auctions: Auction[];
  public grid: Auction[][];
  public pageIndex:number;
  public categorys: Category[]=[];
  public selected:string;//分类id
  private pagesize:number=10;
  //private categoryId:number;

  constructor(public navParams: NavParams,public http: Http) {
	this.pageIndex=0;
	this.auctions=[];
	//this.categoryId=navParams.get('categoryId');
	this.getCategory();
	

  }
  getAuctionList(): Promise<Auction[]> {
    return this.http.get(this.heroesUrl+"?page="+this.pageIndex+"&size="+this.pagesize+"&categoryId="+this.selected)
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
  getCategory(): Promise<Category[]> {
    return this.http.get(this.categoryUrl)
               .toPromise()
               .then((rsp) => {
					this.categorys=rsp.json();
					this.selected=String(this.categorys[0].id);
					console.log(this.categorys);
					this.reflesh();
				})
       .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
	swipeEvent(event){
	  //向左滑
		if(event.direction==2){
			for (var i = 0; i < this.categorys.length; i++)
            {
				if (String(this.categorys[i].id) == this.selected ){
					if (i==this.categorys.length-1){
						this.selected =String(this.categorys[0].id);
					}else{
						this.selected =String(this.categorys[i+1].id);
					}
					this.reflesh();
					break;
				}
				
			}
			console.log(this.selected);
			
		 // if(this.categorys.indexOf(this.selected)<this.categorys.length){
		 //	this.selected = this.categorys[this.categorys.indexOf(this.selected)+1];
		 // }
		}
	//向右滑
		if(event.direction==4){
			for (var i = 0; i < this.categorys.length; i++)
            {
				if (String(this.categorys[i].id) == this.selected ){
					if (i==0){
						this.selected =String(this.categorys[this.categorys.length-1].id);
					}else{
						this.selected =String(this.categorys[i-1].id);
					}
					this.reflesh();
					break;
				}
				
			}
						console.log(this.selected);
		// if(this.categorys.indexOf(this.selected)>0){
		//		this.selected = this.categorys[this.categorys.indexOf(this.selected)-1];
		//  }
		}
	}
	reflesh(){
		this.pageIndex=0;
		this.auctions=[];
		this.getAuctionList();
	}
	click(id){
		this.selected =String(id);
		this.reflesh();
	}
	doInfinite(infiniteScroll){
		infiniteScroll.complete();
	}
	doRefresh(refresher){
		 refresher.complete();
	}
	
}
