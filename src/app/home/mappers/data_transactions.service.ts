import { Injectable, inject, signal } from '@angular/core';
import { Subscription, retry, tap, map, catchError, of } from 'rxjs';
import { environments } from '../../../environments/environments.develoment';
import { AuthService } from '../../auth/services/auth.service';
import { ApiPostService } from '../../core/services/api-post.service';
import { UtilitiesService } from '../../core/helpers/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class DataTransactionsService {

  private auth = inject(AuthService);
  private apiPost = inject(ApiPostService);

  private baseUrl: string = environments.baseUrl;

  type_identification!: string;
  identification!: string;
  token!: string;

  #_data = signal<any>({});

  public getData(): any {
    return { ...this.#_data() };
  }

  public setData(newArray: any) {
    this.#_data.set(newArray);
  }

  dataInicializacion() {

    this.type_identification = this.auth.usuario.checkId;
    this.identification = this.auth.usuario.ID;
    this.token = this.auth.usuario.tokenUser;

    const paramsBody = {
      type_identification: this.type_identification,
      identification: this.identification,
    };

    const UrlApi = `${this.baseUrl}/api/app/home`;

    return this.apiPost.getDebtInfo(UrlApi, paramsBody).pipe(
      retry(2),
      map((resp) => {
        this.setData(resp.data[0]);
        return resp.data;
      }),
      catchError((err) => of(err.error))
    );
  }
}
