import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICarouselLittleItem } from '../../../core/models/carrousel-item.model';
import { AppCarouselComponent } from './../../../shared/components/app-carousel/app-carousel.component';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    AppCarouselComponent,
    RouterOutlet, ModalComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  carouselData: ICarouselLittleItem[] = [
    {
      id:'1',
      imgFondo: 'https://creditoacr.com/wp-content/uploads/2023/08/iStock-883726284.jpg',

    },
    {
      id:'2',
      imgFondo: 'https://creditoacr.com/wp-content/uploads/2023/08/iStock-694044976.jpg',

    }
  ];

}

