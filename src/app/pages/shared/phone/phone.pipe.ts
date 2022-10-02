import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(rawNum:string) {
    rawNum = "+254"+ rawNum;

    const countryCodeStr = rawNum.slice(0,4);
    const areaCodeStr = rawNum.slice(4,7);
    const midSectionStr = rawNum.slice(7,10);
    const lastSectionStr = rawNum.slice(10);

    return `${countryCodeStr} (${areaCodeStr}) ${midSectionStr} - ${lastSectionStr}`;
  }

}
