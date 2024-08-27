import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { UtilitiesService } from '../../../core/helpers/utilities.service';
import { ApiGetService } from '../../../core/services/api-get.service';
import { environments } from '../../../../environments/environments.develoment';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { HeaderTitleComponent } from "../../../shared/components/header-title/header-title.component";
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { LoaderService } from '../../../shared/components/loader/loader.service';

@Component({
    selector: 'app-active-contest',
    standalone: true,
    templateUrl: './active-contest.component.html',
    styleUrl: './active-contest.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        TitleComponent,
        HeaderTitleComponent,
        LoaderComponent
    ]
})
export class ActiveContestComponent {
  private apiGet = inject(ApiGetService);
  public utilities = inject(UtilitiesService);
  public loader = inject(LoaderService);

  private baseUrl: string = environments.baseUrl;

  responseApi = signal<boolean>(false);
  sorteos = signal<any>([])

  titleHeader1: any = {
    title:'Sorteos Activos',
    subtitle:'Conoce nuestros sorteos activos y descubre la oportunidad de ganar increíbles premios.'
  };

  ngOnInit(): void {
    this.loader.setLoader(true)

    const UrlApi = `${this.baseUrl}/api/v1/query/raffle/contest/active`;
    const headers = {};

    this.apiGet.getDebtInfo(UrlApi, headers)
    .subscribe({
      next:(resp)=>{
      this.loader.setLoader(false)
        if (resp.success) {
          this.responseApi.set(resp.success);
          this.sorteos.set(resp.data)
        }else{
          this.responseApi.set(resp.success);
        }
      }
    })
  }

  ngOnDestroy(): void {

  }

 }
