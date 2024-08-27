import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { environments } from '../../../../environments/environments.develoment';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { ApiGetService } from '../../../core/services/api-get.service';
import { AccordionDirective } from '../../../shared/directives/accordion.directive';
import { HeaderTitleComponent } from "../../../shared/components/header-title/header-title.component";
import { TitleComponent } from "../../../shared/components/title/title.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-benefits',
    standalone: true,
    templateUrl: './benefits.component.html',
    styleUrl: './benefits.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        AccordionDirective,
        HeaderTitleComponent,
        TitleComponent,
        RouterModule,
    ]
})
export class BenefitsComponent {
  private apiGet = inject(ApiGetService);
  private auth = inject(AuthService);

  private baseUrl: string = environments.baseUrl;

  sorteos = signal<any>([]);
  records = signal<any>([]);
  itemsArray = signal<any>([]);
  resposeOKapi = signal<boolean>(false);

  // sorteos = signal([
  //   {
  //     contest_name: 'Sorteo de Verano',
  //     contest_img_promo: 'https://creditoacr.com/wp-content/uploads/slider3/Slide-responsive-viaje-para-pap.jpeg',
  //     contest_img_promo_responsive: 'https://example.com/sorteo-verano-responsive.jpg',
  //     contest_description: 'Participa en nuestro gran sorteo de verano y gana increíbles premios.',
  //     itemsArray: [
  //       {
  //         compra: {
  //           contest_date: '2023-06-15',
  //           shop_name: 'Tienda A',
  //           contest_amount: 50000
  //         },
  //         tickets: ['ABC123', 'DEF456', 'GHI789']
  //       },
  //       {
  //         compra: {
  //           contest_date: '2023-07-01',
  //           shop_name: 'Tienda B',
  //           contest_amount: 75000
  //         },
  //         tickets: ['JKL012', 'MNO345']
  //       }
  //     ]
  //   }
  // ])


  constructor() {}

  ngOnInit() {

    const identification = this.auth.usuario.ID;

    const UrlApi = `${this.baseUrl}/api/v1/query/raffle/contest/`+identification;
    const headers = {};

    this.apiGet.getDebtInfo(UrlApi, headers)
    .subscribe((resp) => {

      if (resp.data !== null) this.sorteos = resp.data;
      this.sorteos().forEach((obj:any) => (this.records = obj.records));

      if (this.records !== null) this.itemsArray.set(Object.values(this.records));

      if (resp.success && this.records !== null) {
        this.resposeOKapi.set(true);
      } else if (resp.success && this.records == null) {
        this.resposeOKapi.set(false);
      } else {
        this.resposeOKapi.set(false);
      }

    });
  }

  ngOnDestroy(): void {

  }

 }
