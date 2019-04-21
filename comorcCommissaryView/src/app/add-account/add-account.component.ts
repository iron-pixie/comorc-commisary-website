import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  accounts=[];
  constructor(private location:Location, private http:HttpClient) {
    this.accounts.push(new Account("","","",""));
  }

  ngOnInit() {
  }

  back(){
    this.location.back();
  }

  changeAccountName(event,item){
    item.accountName=event.target.value;
  }

  changeAddress(event,item){
    item.address=event.target.value;
  }

  changeUsername(event,item){
    item.userName=event.target.value;
  }

  changePassword(event,item){
    item.password=event.target.value;
  }

  submit(){
    let account = this.accounts[0];
    let addAccount={
      "accountName":account.accountName,
      "address":account.address,
      "userName":account.userName,
      "password":account.password
    }

    let jsonItem=JSON.stringify(addAccount)

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    this.http.post('http://comorcbackend.us-west-2.elasticbeanstalk.com/account/add',jsonItem,{headers: headersVar,responseType:"text"})
      .subscribe((val) => {
        /*if(val!=null){
          this.back();
        }*/
        this.back();
      });

  }

}

class Account{
  accountName:string;
  address:string;
  userName:string;
  password:string;

  constructor(accountName,address,userName,password){
    this.accountName=accountName;
    this.address=address;
    this.userName=userName;
    this.password=password;
  }
}

