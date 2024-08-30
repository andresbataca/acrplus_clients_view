import { inject, Injectable } from '@angular/core';
import { environments } from '../../../../../environments/environments.develoment';
import { ApiPostService } from '../../../../core/services/api-post.service';
import { retry, tap, map, catchError, of } from 'rxjs';
import { ApiGetService } from '../../../../core/services/api-get.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environments.baseUrl;

  private apiPost = inject(ApiPostService)
  private apiGet = inject(ApiGetService);


  constructor() { }

  passwordRecovery(ID:string, typeID: string) {
    const UrlApi = `${this.baseUrl}/api/v3/summaryGenerate/${ID}/${typeID}`;
    const headers = {};

    return this.apiGet.getDebtInfo(UrlApi, headers)
      .pipe(
        retry(2),
        map((resp) => resp),
        catchError((err) => of(err.error))
      )
  }
}
