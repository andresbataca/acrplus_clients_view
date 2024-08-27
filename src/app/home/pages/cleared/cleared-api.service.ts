import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ApiPostService } from '../../../core/services/api-post.service';
import { environments } from '../../../../environments/environments.develoment';
import { Observable, catchError, map, retry, share, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClearedApiService {

  private auth = inject(AuthService);
  private apiPost = inject(ApiPostService);

  private baseUrl: string = environments.baseUrl;

  constructor() { }


  getCertification(data: any): Observable<any>{

    const UrlApi = `${this.baseUrl}/api/app/datos/paz_y_salvo_pdf`;
    const token = this.auth.usuario.tokenUser!;

    const paramsBody = {
      documentType: data.checkID,
      documentNumber: data.numID,
      interesa: data.text
    };

    const headers = {
      'Token-Client': 'f1aa966c6bff1285cc4b052ef43a513f24337b790d106d5aec3e4a11525a2206',
      'ID-Client': 'MQ==',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization-token': token
    };

    return this.apiPost.getDebtInfo(UrlApi, paramsBody, headers)
    .pipe(
      retry(1),
      map((resp) => resp.data),
      catchError(err => {
        return throwError(() => err.error.message);
      }),
    )
  }

}
