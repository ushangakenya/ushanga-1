import { apiService } from './../../services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  sub: any;
  id: any;
  product: any;
  photo =
    'https://firebasestorage.googleapis.com/v0/b/ushanga-alpha.appspot.com/o/productImages%2FIMG_9878.jpeg?alt=media&token=c6f78a41-cb9e-47c6-8878-b63c92bb149b';
  data: any;

  public myForm: FormGroup;
  transaction: any;

  processing = false;

  live:any = 1; 
  oid:any = '1';
  inv:any = '1';
  amount:any = 1;
  tel:any = '254728865685';
  eml:any = 'wilmutsami@gmail.com';
  vid :any  ='demo';
  curr:any  ='KES';
  p1:any = '1';
  p2 :any = '1';
  p3 :any = '1';
  p4 :any = '1';
  cst:any = 0;
  cbk :any = '1';

  constructor(
    private mpesapay: apiService,
    private fb: FormBuilder,
    private _Activatedroute: ActivatedRoute,
    private auth: AuthService
  ) {
    this.myForm = fb.group({
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^((\\+254-?)|0)?[0-9]{12}$')],
      ],
    });
  }
  get f() {
    return this.myForm.controls;
  }
  ngOnInit() {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.auth.getProduct(params.get('id')).subscribe((r) => {
        console.log('rre', JSON.stringify(r));
        this.product = r;

        this.data = JSON.stringify({
          name: (r as any).name,
          group: (r as any).group,
          id: (r as any).id,
          category: (r as any).name,
          price: (r as any).name,
          county: (r as any).county,
          website:'https://ushangakenya.co.ke/'
        });
      });
    });
  }

  onSubmit(id: any, amount: any) {
    this.processing = true;
    console.log("Value",this.myForm.value);

    this.mpesapay
      .makePayments(this.live, id, this.inv, amount, this.myForm.value.phoneNumber,this.eml,this.vid,this.curr,this.p1,this.p2,this.p3,this.p4,this.cst, this.cbk ) 
  }
}
