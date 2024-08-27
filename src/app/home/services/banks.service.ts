import { Injectable, inject, signal } from '@angular/core';
import { environments } from '../../../environments/environments.develoment';
import { ApiPostService } from '../../core/services/api-post.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, map, catchError, of, Observable, tap, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BanksService {
  private baseUrl: string = environments.baseUrl;

  private apiPost = inject(ApiPostService);
  private auth = inject(AuthService);

  credentials!: any;
  tokenPse = signal('');

  constructor(private http: HttpClient) {}

  encrypt(text: any){
    this.credentials = text
    for (let i = 0; i <= 10; i++) {
      this.credentials = btoa(this.credentials);
    }
      return this.credentials;
  }

  getToken() {
    const params = { user: 'jaos', pass: 'sisepudo' };
    const paramsConverter = JSON.stringify(params);
    const raw = this.encrypt(paramsConverter);
    const UrlApi = `https://development-qa.aliadosacr.com/api/v1/pse/generate/token/auth`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain'
    });

    return this.http.post(UrlApi, raw, { headers: headers })
    .pipe(
      map((resp : any) => {
         this.tokenPse.set(resp.data.token)
         return resp.data.token
      }
    ),
      catchError((err) => of(err.error))
    );
  }

  banks():Observable<any>{
    return this.getToken().pipe(
      switchMap((token: string) => {
        const UrlApi = `https://development-qa.aliadosacr.com/api/v1/pse/list/banks`;
        const headers = {
          'Authorization-pse':'Bearer '+ token
        };
        const paramsBody = {};
        return this.http.post(UrlApi, paramsBody, { headers: headers })
          .pipe(
            map((resp:any) => resp.data),
            catchError((err) => of(err.error))
          );
      })
    );
  }

  initTransactionPSE(formData:any){
    const type_identification = this.auth.usuario.checkId;
    const identification = this.auth.usuario.ID;

    const params = {
      identificationType: type_identification,
      identificationNumber: identification,
      transactionValue: formData.valorSeleccionado,
      financialInstitutionCode: formData.bank,
      userType: formData.typePerson,
      context: 2,
    };

    const paramsConverter = JSON.stringify(params);
    const raw = this.encrypt(paramsConverter);

    const headers = {
      'Content-Type': 'text/plain',
      'Authorization-pse':'Bearer '+ this.tokenPse()
    };

    return this.http.post('https://development-qa.aliadosacr.com/api/v1/pse/init/transaction', raw, { headers: headers })
    .pipe(
      map((resp : any) =>  resp),
      catchError((err) => of(err.error))
    );
  }

  initTransactionBinancen  (formData:any){
    const type_identification = this.auth.usuario.checkId;
    const identification = this.auth.usuario.ID;

    const params = {
      identificationType: type_identification,
      identificationNumber: identification,
      transactionValue: formData.valorSeleccionado,
      fullNames: formData.name,
      fullLastNames:formData.lastName,
      context: 2,
    };

    console.log(params);

    const paramsConverter = JSON.stringify(params);
    const raw = this.encrypt(paramsConverter);

    const headers = {
      'Content-Type': 'text/plain',
      'Authorization-pse':'Bearer '+ this.tokenPse()
    };

    return this.http.post('https://desarrollos.aliadosacr.com/api/v1/binance/init/transaction', raw, { headers: headers })
    .pipe(
      map((resp : any) =>  resp),
      catchError((err) => of(err.error))
    );
  }

}
