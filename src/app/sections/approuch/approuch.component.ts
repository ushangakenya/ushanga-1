import { Component, OnInit } from '@angular/core'; 
import { Navigation, Swiper } from 'swiper';
@Component({
  selector: 'app-approuch',
  templateUrl: './approuch.component.html',
  styleUrls: ['./approuch.component.css']
})
export class ApprouchComponent implements OnInit {
     
  constructor() { }

  ngOnInit() {  
    new Swiper(".swiper", {
      modules:[Navigation],
      // Optional parameters
      direction: "horizontal",
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      speed: 400,
      observer: true,
            observeParents: true,
            parallax:true,
     
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".prev"
      }
    
      // And if we need scrollbar
      /*scrollbar: {
        el: '.swiper-scrollbar',
      },*/
    });
    
  }

}
