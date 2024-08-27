import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Input, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionDirective } from '../../../shared/directives/accordion.directive';
import { ToggleMenuService } from '../../pages/layout/toggle-menu.service';

@Component({
  selector: 'app-menu-items',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AccordionDirective
  ],
  templateUrl: './menuItems.component.html',
  styleUrl: './menuItems.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemsComponent {

  @Input() items!: any;

  public toggleService = inject(ToggleMenuService)

  isMobile = signal<boolean>(false);
  screenWidth = signal<number>(0);

  ngOnInit(): void {
    this.onResize()
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
      this.onResize()
  }

  onResize() {
    this.screenWidth.set(window.innerWidth);

    if (this.screenWidth() <= 768) {
      this.isMobile.set(true);
    }
    else{
      this.isMobile.set(false);
    }
  }

  handleOptions(getSubmenu:any){
    this.isMobile() && getSubmenu === undefined ? this.toggleService.toggleMenu() : null
  }

}
