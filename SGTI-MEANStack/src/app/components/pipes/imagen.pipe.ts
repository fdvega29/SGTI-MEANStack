import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, args?: any): any {

    if (img.indexOf('https') >= 0) {
      return img;
    }
    return img;
  }
}
