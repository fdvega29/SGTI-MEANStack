import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, args?: any): any {

    const defaultImg = '../assets/dist/img/usuario.png';

    if(!img){
      return defaultImg;
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }
  }
}
