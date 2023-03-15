import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import { Console } from 'console';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  config = {
    indexName: 'products',
    searchClient: algoliasearch(
      'CGATC1I988',
      'dd13bd90da78a86e010cd239085d367e'
    ),
  };
  bool = false;
  cartItems: any;
  coopCollection!: AngularFirestoreCollection<any>;
  coops!: Observable<any[]>;
  coopDoc?: AngularFirestoreDocument<any>;

  constructor(public auth: AuthService, private afs: AngularFirestore) {}
  ngOnInit() {
    this.auth.user$.subscribe((t) => {
      this.afs
        .collection('users')
        .doc(t.uid)
        .collection('cart')
        .valueChanges()
        .subscribe((r) => {
          this.cartItems = r;
        });
    });
    var submit = document.getElementById('cart__overlay');
    submit?.addEventListener('click', function () {
      submit?.classList.remove('not_visible');
    });
  }
  onCartClick(item: any) {
    console.log('clicked');

    this.auth.addItemToCart(item).then((e) => {
      const box1 = document.getElementById('cart__overlay');
      const box = document.getElementById('cart');

      if (box != null) {
        // ✅ Add class
        if (!this.bool) {
          this.bool = true;
          box.classList.add('is_visible');
        }
        // ✅ Remove class
        if (this.bool) {
          this.bool = false;
          box.classList.remove('not_visible');
        }
      }

      if (box1 != null) {
        // ✅ Add class
        if (!this.bool) {
          this.bool = true;
          box1.classList.add('is_visible');
        }
        // ✅ Remove class
        if (this.bool) {
          this.bool = false;
          box1.classList.remove('not_visible');
        }
      }
    });
  }
  closeCart() {
    console.log('wewew');
    const box1 = document.getElementById('cart');
    const box = document.getElementById('cart__overlay');

    if (box != null && box1 != null) {
      // ✅ Add class
      box.classList.add('not_visible');
      box1.classList.add('not_visible');
    }
  }

  removeFromCart(item: any) {}
  payNow() {
    // this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
