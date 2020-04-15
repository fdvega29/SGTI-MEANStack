import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    if(img.indexOf('https') >= 0){
      return img;
    }
  
    return 'Fernando Daniel Vega';
  }

}
