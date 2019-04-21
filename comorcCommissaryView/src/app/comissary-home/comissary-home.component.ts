import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'comissary-home',
  templateUrl: './comissary-home.component.html',
  styleUrls: ['./comissary-home.component.css']
})
export class ComissaryHomeComponent implements OnInit {

  itemSource;
  keys=["Item Name","Unit Cost","Number","Volume Cost"];
  keysO=["Invoice Id","Cost","Creation Time","View"]
  getDone=false;
  invoiceId="";
  accountName="";
  accountAddress="";
  creationTime="";
  totalCost=0.0;
  orderSource;
  orderArray=[];
  dataResponse;
  constructor(private location:Location, private http:Http,private router:Router, private httpC:HttpClient) { 
    let itemArray=[];
    
    let invoiceId=window.localStorage.getItem("id");
    http.get('http://comorcbackend.us-west-2.elasticbeanstalk.com/order/all')
      .subscribe(response => {
        let dataResponse=null;

        dataResponse=response.json()
        this.dataResponse=dataResponse;
        response=null;
        let innerArray = dataResponse[dataResponse.length-1];

        this.accountName=innerArray[0].accountName;
        this.invoiceId=innerArray[0].invoiceId;
        this.accountAddress=innerArray[0].accountAddress;
        this.creationTime=innerArray[0].creationTime;
        this.totalCost=parseFloat(innerArray[0].cost);

        for(let dat of innerArray.splice(1,innerArray.length)){
          itemArray.push(new Item(dat.itemName,dat.itemCost,dat.itemUnit,dat.itemNumber))
        }

        this.itemSource = new MatTableDataSource(itemArray);

        for(let data of dataResponse){
          this.orderArray.push(
            new Order(
              data[0].cost,
              data[0].creationTime,
              data[0].accountName,
              data[0].accountAddress,
              data[0].invoiceId
            )
          )
        }
        this.orderSource = new MatTableDataSource(this.orderArray);
        this.getDone=true;
      })
  }

  ngOnInit() {
  }

  routeToItems(){
    this.router.navigate(['/web/itemManager/']);
  }

  routeToAccounts(){
    this.router.navigate(['/web/accountManager/']);
  }

  routeToOrders(){
    this.router.navigate(['/web/orderManager/']);
  }

  editView(order){
    let itemArray=[];
    this.getDone=false;
    for(let i=0;i<this.dataResponse.length;i++){
      if(this.dataResponse[i][0].invoiceId === order.invoiceId){
        let innerArray = this.dataResponse[i];

        this.accountName=innerArray[0].accountName;
        this.invoiceId=innerArray[0].invoiceId;
        this.accountAddress=innerArray[0].accountAddress;
        this.creationTime=innerArray[0].creationTime;
        this.totalCost=parseFloat(innerArray[0].cost);

        for(let dat of innerArray.splice(1,innerArray.length)){
          itemArray.push(new Item(dat.itemName,dat.itemCost,dat.itemUnit,dat.itemNumber))
        }

        this.itemSource = new MatTableDataSource(itemArray);
      }
    }
    this.getDone=true;
  }

  printStart(){
    window.print();
  }

}

class Order{
  cost:string;
  creationTime:string;
  accountName:string;
  accountAddress:string;
  invoiceId:string;

  constructor(cost,creationTime,accountName,accountAddress,invoiceId){
    this.cost=cost;
    this.creationTime=creationTime;
    this.accountName=accountName;
    this.accountAddress=accountAddress;
    this.invoiceId=invoiceId;
  }
}

class Item{
  name:string;
  pricePerUnit:number;
  unit:string;
  description:string;
  numberOfItems=0;
  priceForGroup=0;

  constructor(name,pricePerUnit,unit,numberOfItems){
    this.name=name;
    this.pricePerUnit=parseFloat(pricePerUnit);
    this.unit=unit;
    this.numberOfItems=numberOfItems;
    //this.description=description;
    this.priceForGroup=parseFloat(pricePerUnit)*parseFloat(numberOfItems);
  }
}