import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild, input, signal } from '@angular/core';

@Component({
  selector: 'app-button-menu',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './button-menu.component.html',
  styleUrl: './button-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonMenuComponent {
  buttonArray = input<any>();

  @ViewChild('payContent')  payContent!: ElementRef;
  @ViewChild('button')  button!: ElementRef;

  isOpen = signal(false);

  toggleMenu() {
    this.isOpen.update(prevValue => !prevValue);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {

    const clickedInsideIcon = this.button.nativeElement.contains(event.target);
    const clickedInsideMenu = this.payContent.nativeElement.contains(event.target);

    if (!clickedInsideIcon && !clickedInsideMenu) {
      this.isOpen.set(false);
    }

  }
 }
