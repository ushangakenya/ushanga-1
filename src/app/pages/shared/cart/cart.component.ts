import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  constructor() {
    
   }

  ngOnInit() {

    $('.btn').on('click', function() {
      $('.modal').toggleClass('is-open');
    });
    
    $('.dropdown').on('click', function() {
      $(this).toggleClass('is-open');
    });
    
    $('.radio, .checkbox').on('click', function() {
      $(this).toggleClass('is-selected');
    });
    
    $('input, select').on('focus', function() {
      $(this).parent('.input').addClass('is-active');
    });
    
    $('input, select').on('blur', function() {
      var hasVal = !!$(this).val()
      
      $(this).parent('.input').removeClass('is-active');
      
      $(this).parent('.input').toggleClass('has-value', hasVal);
      
      var reg = new RegExp($(this).data('mask'));
      var val = $(this).val();
      // var test = reg.test(val);
      var luhn = null;
      var hasLuhn = $(this)[0].hasAttribute('data-luhn');
      
      if (hasLuhn) {
        // luhn = luhnChk(val.replace(/\-/gmi, ''));
        console.log(luhn);
      }
      
      if (hasLuhn && !luhn) {
        $(this).parent('.input').addClass('has-errors');
      } else if (val ) {
        $(this).parent('.input').addClass('has-errors');
      } else {
        $(this).parent('.input').removeClass('has-errors');
      }
    });
    
    $('input').on('input', function() {
      var reg = new RegExp($(this).data('mask'));
      // var test = reg.test($(this).val());
      
      if (true) {
        $(this).parent('.input').addClass('is-valid');
      } else {
        $(this).parent('.input').removeClass('is-valid');
      }
      
      $(this).parent('.input').removeClass('has-errors');
    });
    
    $('#ccnumber').on('input', function() {
      var val = $(this).val()
      
      // val = val.replace(/\D/gmi, '');
      
      // str = val.match(/.{1,4}/g);
                  
      // $(this).val(str ? str.join(' ') : '');
    });
    
    $('.control__input').on('change', function() {
      var $this = $(this);
      $(this).parent('.control').toggleClass('is-selected', true);
      $('.control__input').each(function(index) {
        if ($(this).attr('id') !== $this.attr('id') && $(this).attr('name') === $this.attr('name')) {
          $(this).parent('.control').removeClass('is-selected');
        }
      });
    });
    
    
    $('#to-shipping-method').on('click', function(e) {
      e.preventDefault();
      goTo(2);
    });
    
    $('#to-payment-method').on('click', function(e) {
      e.preventDefault();
      goTo(3);
    });
    
    $('.js-goto').on('click', function(e) {
      e.preventDefault();
      var $this = $(this);
      $this.addClass('is-loading');
      
      // setTimeout(function() {
        $this.removeClass('is-loading');
        
        // setTimeout(function() {
          goTo($this.data('page'));
        // }, 250);
      // }, 1500);
    });
    
    function goTo(page: string | number) {
      $('.page').removeClass('is-active')
      $('.page--' + page).addClass('is-active')
    }
    
    $('.js-add-giftcard').on('click', function(e) {
      e.preventDefault();
      var val = $('#giftcard').val();
      
      if (val) {
        addGiftcard(val);
        $('#giftcard').val('');
        $('#giftcard').blur();
      }
    });
    
    function addGiftcard(code: string | number | string[]) {
      $('.cards').after('<div class="giftcard"><div class="f"><div class="f70"><b>' + code + '</b><div class="microcopy">Balance left: $0.00</div></div><div class="f30">$50.00</div></div></div>');
      
      $('.giftcard').first().hide().fadeIn();
    }
    
    $('.collapser__label').on('click', function(e) {
      e.preventDefault();
      $(this).parent('.collapser').toggleClass('is-open');
      var isopen = $('.collapser').hasClass('is-open');
      
      if ($(this).parent('.collapser').find('.collapser__content input')) {
        $(this).parent('.collapser').find('.collapser__content input').first().focus();
      }
    });
    
    
    function luhnChk(luhn: string) {
        var len = luhn.length,
            mul = 0,
            prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
            sum = 0;
    
        while (len--) {
            sum += prodArr[mul][parseInt(luhn.charAt(len), 10)];
            mul ^= 1;
        }
    
        return sum % 10 === 0 && sum > 0;
    };
    
    
    $('#billing-same').on('change', function() {
      if (!false) {
        $('#billing').show();
      } else {
        $('#billing').hide();
      }
    });
    
    
    $('#payment-cc, #payment-paypal').on('change', function () {
      if ($(this)[0].id === 'payment-cc') {
        $('.message').eq(0).addClass('is-visible').removeClass('is-hidden');
        $('.message').eq(1).addClass('is-hidden').removeClass('is-visible');
      } else {
        $('.message').eq(1).addClass('is-visible').removeClass('is-hidden');
        $('.message').eq(0).addClass('is-hidden').removeClass('is-visible');
      }
    });
    
    
    $('.js-toggle-cart, .cart__overlay').on('click', function() {
      $('.cart').toggleClass('is-hidden');
    });
    $('.cart').toggleClass('is-hidden');
    
  }
  

}
