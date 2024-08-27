import { Injectable, inject } from '@angular/core';
import { ApiPostService } from '../../../core/services/api-post.service';
import { environments } from '../../../../environments/environments.develoment';

@Injectable({
  providedIn: 'root'
})
export class CreditSimulatorApiService {
  private apiPost = inject(ApiPostService);

  private baseUrl: string = environments.baseUrl;


  constructor() { }

  getSimulator(monto:any,cuota:any){
    const baseUrl = `${this.baseUrl}/api/app/simulator`;

    const paramsBody = {
      amount: monto.replace(/\./g, ''),
      term: cuota
    };
    
    const headers = {};

    return this.apiPost.getDebtInfo(baseUrl, paramsBody, headers);
  }

}
