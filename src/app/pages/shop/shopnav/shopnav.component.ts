import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopnav',
  templateUrl: './shopnav.component.html',
  styleUrls: ['./shopnav.component.css']
})
export class ShopnavComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit() {
  }

}
