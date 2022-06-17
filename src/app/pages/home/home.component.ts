import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import Swiper, { Autoplay, Mousewheel, Navigation, Pagination, Parallax } from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
  
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
}) 
export class HomeComponent implements OnInit {

  defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';

   
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    } else {
      // fallback to IntersectionObserver
    }
  }

  ngOnInit() {
    
    new Swiper(".swiper-container", {
      // configure Swiper to use modules
    modules: [Navigation, Pagination,Mousewheel,Autoplay,Parallax],
      direction: "vertical",
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
         clickable: true,
      }, 
      mousewheel: {
        eventsTarget:'.swiper-container',
        invert: true,
      }, 
      grabCursor: true, 
      speed: 1000, 
      parallax: true,
      autoplay: {
        delay: 5000,
      },
      effect: "slide",
      
    });
  }

  toStringConv(image: any){
    return String(image);
  }
}
  


