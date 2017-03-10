import { Category } from './Category';

export class Auction {
    id: number;
    name: string;
    endtime:Date;
    startPrice:number;
	addrange:number;
	deposit:number;
	fixedPrice:number;
	category:Category;
	owner:number;
	description:String;
	mainImage:String;
	parent:number;
	grid:Auction[][];

}