import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { Platform, NavController } from 'ionic-angular';
import { SessionDetailPage } from '../session-detail/session-detail';
import { Category } from '../../providers/Category';
import {  Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})


export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  private heroesUrl = '/api/category';
  public categorys: Category[];
  constructor(private http: Http,public navCtrl: NavController,public confData: ConferenceData, public platform: Platform) {
	   // this.http.get(this.heroesUrl).subscribe(res=> this.categorys =res.json());
  }

  ionViewDidLoad() {
		this.getHeroes();

  }
  getHeroes(): Promise<Category[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then((rsp) => {
					this.categorys=rsp.json();
					for (let item of this.categorys){
						if (item.children!=null){
						item.grid = Array(Math.ceil(item.children.length/3));
						let rowNum = 0; //counter to iterate over the rows in the grid
						  for (let i = 0; i < item.children.length; i+=3) { //iterate images
							item.grid[rowNum] = Array(3); //declare two elements per row

							if (item.children[i]) { //check file URI exists
							  item.grid[rowNum][0] = item.children[i] //insert image
							}
							if (item.children[i+1]) { //repeat for the second image
							  item.grid[rowNum][1] = item.children[i+1]
							}
							if (item.children[i+2]) { //repeat for the three image
							  item.grid[rowNum][2] = item.children[i+2]
							}
							rowNum++; //go on to the next row
						  }
					}}
					console.log(this.categorys);
				})
       .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
  goToSessionDetail(categoryId) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(SessionDetailPage, { categoryId:categoryId} );
  }
}
