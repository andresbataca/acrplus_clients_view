import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { ApiGetService } from './api-get.service';

@Injectable({
  providedIn: 'root'
})
export class UbicationDataService {
  private apiGet = inject(ApiGetService);

  constructor() { }

  getDerparments(){
    return this.apiGet.getDebtInfo(`https://desarrollos.aliadosacr.com/api/app/departments`,[]);
  }

  getAlmacenes(id:any){
    if ( !id ) return of([]);
    return this.apiGet.getDebtInfo(`https://desarrollos.aliadosacr.com/api/app/cities/${id}`,[])
  }

}
