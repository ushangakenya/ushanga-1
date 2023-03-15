import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopnav',
  templateUrl: './shopnav.component.html',
  styleUrls: ['./shopnav.component.css']
})
export class ShopnavComponent implements OnInit {
bool = false;
  constructor(public auth:AuthService) { }

  ngOnInit() {
  }
  
  cart(){
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
  }

}
