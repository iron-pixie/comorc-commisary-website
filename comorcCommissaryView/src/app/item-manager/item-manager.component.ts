import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrls: ['./item-manager.component.css']
})
export class ItemManagerComponent implements OnInit {

  keys=["Name","Unit","Price"];
  getDone=false;
  columnNames=["Name","Unit","Price","Delete"];
  itemSource;
  itemArray=[];
  constructor(private location:Location, private http:Http,private router:Router, private httpC:HttpClient) {


    http.get('http://comorcbackend.us-west-2.elasticbeanstalk.com/item/all')
      .subscribe(response => {

        let dataResponse=null;

        dataResponse=response.json()
        response=null;

        for(let data of dataResponse){
          this.itemArray.push(
            new Item(
              data.itemName,
              data.unit,
              data.price
            )
          )
        }
        this.itemSource = new MatTableDataSource(this.itemArray);
        this.getDone=true;
      })
    
  }

  ngOnInit() {
  }

  deleteRow(item){
    let deleteItem={
      "itemName":item.name,
    }

    let jsonItem=JSON.stringify(deleteItem)

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    this.httpC.post('http://comorcbackend.us-west-2.elasticbeanstalk.com/item/delete',jsonItem,{headers: headersVar, responseType: "text"})
      .subscribe((val) => {
        /*if(val!=null){
          this.back();
        }*/
        this.itemArray.splice(this.itemArray.indexOf(item), 1);
        this.itemSource= new MatTableDataSource(this.itemArray);


        console.log(val);

      });


  }

  back(){
    this.location.back();
  }

  navigateAdd(){
    this.router.navigate(['/web/addItem/']);
  }
  
}

class Item{
  name:string;
  price:string;
  unit:string;

  constructor(name,unit,price){
    this.name=name;
    this.price=price;
    this.unit=unit;
  }
}