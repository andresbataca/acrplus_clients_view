import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMove]',
  standalone: true,
})
export class MoveDirective {
  constructor(private el:ElementRef)
  { }

  ngAfterViewInit() {
    console.log(this.el.nativeElement);
 }

}
