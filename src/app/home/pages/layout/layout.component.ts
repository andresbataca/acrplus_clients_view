import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ThemeService } from '../../../core/services/theme-service.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { AccordionDirective } from '../../../shared/directives/accordion.directive';
import { MenuItemsComponent } from '../../components/menuItems/menuItems.component';
import { ToggleMenuService } from './toggle-menu.service';
import { DarkModeComponent } from '../../../shared/components/dark-mode/dark-mode.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    RouterModule,
    LoaderComponent,
    AccordionDirective,
    MenuItemsComponent,
    DarkModeComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {

  public toggleService = inject(ToggleMenuService)
  public auth = inject(AuthService)


  get usuario(){
    return this.auth.usuario;
  }

  menuLinks = [
    {
      routerLink: './home',
      icon: 'bx bx-home-alt icon',
      text: 'Inicio'
    },
    {
      routerLink: './products',
      icon: 'bx bxl-product-hunt icon',
      text: 'Productos'
    },
    {
      routerLink: './cleared',
      icon: 'bx bx-dock-left icon',
      text: 'Paz y salvo'
    },
    {
      routerLink: './credit-simulator',
      icon: 'bx bx-calculator icon',
      text: 'Simulador'
    },
    {
      routerLink: './contact-us',
      icon: 'bx bxs-contact icon',
      text: 'Contacto'
    },
    {
      routerLink: './faqs',
      icon: 'bx bxs-hand icon',
      text: 'FAQs'
    },
    {
      icon: 'bx bx-home-heart icon',
      text: 'Beneficios',
      subLinks: [
        {
          routerLink: './contest',
          icon: 'bx bx-party icon',
          text: 'Concursos Activos'
        },
        {
          routerLink: './beneficts',
          icon: 'bx bxs-gift icon',
          text: 'Mis concursos'
        }
      ]
    }
  ];

  logout = [
    {
      icon: 'bx bx-log-out icon',
      text: 'Cerrar sesión',
      method: () => {
        this.auth.logout();
      }
    }
  ]

}
