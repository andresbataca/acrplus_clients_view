import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[accordion]',
  standalone: true,
})
export class AccordionDirective {
  @Input() accordion: boolean = true;

  constructor(private el: ElementRef) {}

  @HostListener('click', ['$event'])
  onClick() {
    if (this.accordion) {
      var content = this.el.nativeElement.nextElementSibling;
      if (content.style.height) {
        content.style.height = null;
      } else {
        content.style.height = content.scrollHeight + 'px';
      }
    }
  }
 }
