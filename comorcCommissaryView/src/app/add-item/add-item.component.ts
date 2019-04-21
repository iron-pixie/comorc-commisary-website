import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  items=[];
  constructor(private location:Location, private http:HttpClient) {
    this.items.push(new Item("","",""));
  }

  ngOnInit() {
  }

  back(){
    this.location.back();
  }

  changeName(event,item){
    item.name=event.target.value;
  }

  changePrice(event,item){
    item.price=event.target.value;
  }

  changeUnit(event,item){
    item.unit=event.target.value;
  }

  submit(){
    let item = this.items[0];
    let addItem={
      "itemName":item.name,
      "price":item.price,
      "unit":item.unit
    }

    let jsonItem=JSON.stringify(addItem)

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    this.http.post('http://comorcbackend.us-west-2.elasticbeanstalk.com/item/add',jsonItem,{headers: headersVar})
      .subscribe((val) => {
        /*if(val!=null){
          this.back();
        }*/
        this.back();
      });

  }

}

class Item{
  name:string;
  price:string;
  unit:string;

  constructor(name,price,unit){
    this.name=name;
    this.price
    this.unit=unit;
  }
}
