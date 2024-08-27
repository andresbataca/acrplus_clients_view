import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TooltipHelpService {

  mostrarMensaje = false;
  tooltipTop = '0px';
  tooltipLeft = '0px';

  constructor() { }

  onMouseMove() {
    this.mostrarMensaje = true;
    // const x = event.clientX;
    // const y = event.clientY;
    // this.tooltipTop = (y + 15) + 'px';
    // this.tooltipLeft = (x + 15) + 'px';
  }

  onMouseOut(){
    this.mostrarMensaje = false;
  }

}
