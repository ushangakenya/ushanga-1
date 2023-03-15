import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';  
import * as CryptoJS from 'crypto-js'; 

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class apiService {
  
 
  status!:boolean;
  secretKey:string = '';
  sid:string = '';
  

  
  constructor(private httpClient:HttpClient, private http: HttpClient ) { 
       
  }
  
  makePayments(  live:any, oid:any, inv:any, amount:any, tel:any,eml:any,vid:any,curr:any,p1:any,p2:any,p3:any,p4:any,cst:any, cbk:any){
    console.log('--------IIIDDD',oid)
    console.log('--------Phone',tel)
    this.secretKey = 'demoCHANGED';
    // return this.getSid(1,'1','1',1,"254728865685","wilmutsami@gmail.com","demo","KES", "1", "1", "1" , "1" , 0 , "1",this.secretKey).subscribe(
    //   data => {
    //     console.log('Response ',data);
    //     return data
    //   },
    //   error => {
    //     console.log('Response error',error);
    //     return ''
    //   }
    // );
    axios.get(`https://us-central1-ushanga-alpha.cloudfunctions.net/ipay/ipay/${live}/${oid}/${inv}/${amount}/${tel}/${eml}/${vid}/${curr}/${p1}/${p2}/${p3}/${p4}/${cst}/${cbk}`)
    .then((response) => {
      // handle success response
      console.log('axios r',response);
    })
    .catch((error) => {
      // handle error response
      console.error('axios e',error);
    });
  
    // return this.httpClient.get(`https://us-central1-ushanga-alpha.cloudfunctions.net/main/lnmo/${productID}/${amount}/${phoneNumber}`)
  }

  getSid(live:any,oid:any,inv:any,amount:any,tel:any,eml:any,vid:any,curr:any,p1:any,p2:any,p3:any,p4:any,cst:any,cbk:any, secretKey:any){

    const dataString = live + oid + inv + amount + tel + eml + vid + curr + p1 +p2 + p3 + p4 + cst + cbk; 
    const generated_hash = CryptoJS.HmacSHA256(dataString, "demoCHANGED").toString();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    const body = {
      "live": live,
      "oid":oid,
      "inv":inv,
      "amount": amount,
      "tel": tel,
      "eml":eml, 
      "vid" :vid,
      "curr":curr,
      "p1":p1,
      "p2":p2,
      "p3":p3,
      "p4":p4,
      "cst":cst,
      "cbk":cbk,
      "hash": generated_hash
    };

    return this.http.post('https://apis.ipayafrica.com/payments/v2/transact', body, httpOptions)
    

  }

  // triggerStkPush(phone: string, vid: string, sid: string, key:any) {
  //   const datastring = this.phone + this.vid + this.sid;
  //   const generated_hash = this.generateHash(this.phone,this.vid,this.sid,this.secretKey);
  //   console.log('generated_hash',generated_hash)
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json', 
  //     })
  //   };

  //   const body = {
  //     "phone": this.phone,
  //     "sid": this.sid,
  //     "vid": this.vid,
  //     "hash": generated_hash
  //   };

  //   this.http.post('https://apis.ipayafrica.com/payments/v2/transact/push/mpesa', body, httpOptions).subscribe(
  //     data => {
  //       console.log(data);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  generateHash(phone: string, vid: string, sid: string, key:any): string {
      
    const dataString = "254728865685" + "demo" + "f6a20da9a3d045f4b98596dc1dd50abb_invalid"; 
    const generated_hash = CryptoJS.HmacSHA256(dataString, "demoCHANGED").toString();
 
    return generated_hash;
  }






 
}