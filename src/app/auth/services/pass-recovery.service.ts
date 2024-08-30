import { inject, Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { retry, map, catchError, of, tap } from 'rxjs';
import { environments } from '../../../environments/environments.develoment';
import { ApiPostService } from '../../core/services/api-post.service';

@Injectable({
  providedIn: 'root'
})
export class PassRecoveryService {

  private baseUrl: string = environments.baseUrl;

  private apiPost = inject(ApiPostService)

  dataRecovery = signal<any>({
    phone_number: '',
    id_user_secondApi: '',
    reset_token_secondApi: '',
  });


  constructor() { }

  passwordRecovery(checkID: string, ID: string) {
    const UrlApi = `${this.baseUrl}/api/app/reset/password`;

    const paramsBody = {
      type_identification: checkID,
      identification: ID,
      id_device: 'agtd86732vbbjhnf',
    };

    return this.apiPost.getDebtInfo(UrlApi, paramsBody)
      .pipe(
        retry(2),
        tap((resp)=>{
          this.dataRecovery.set({
            phone_number: '+57 ' + resp.data.mobile_phone,
            id_user_secondApi: resp.data.id_user,
            reset_token_secondApi: resp.data.reset_token,
          })
        }),
        map((resp) => resp),
        catchError((err) => of(err.error))
      )
  }

  otpSend(formotp: FormGroup) {
    const UrlApi = `${this.baseUrl}/api/app/verify/user/reset/password/sms/token`;

    const formOtp =  formotp.getRawValue();

    const arrayOtp:string[] = [];
    arrayOtp.splice(0,arrayOtp.length)
    for (let index = 1; index <= 6; index++) {
      arrayOtp.push(formotp.get('otp'+index)?.value);
    }

    const otpFinal = arrayOtp.join('');

    const paramsBody = {
      id_user: this.dataRecovery().id_user_secondApi,
      reset_token: this.dataRecovery().reset_token_secondApi,
      token: otpFinal,
      id_device:'agtd86732vbbjhnf',
      new_password: formOtp.password_one,
      new_password_confirm: formOtp.password_two
    };

    return this.apiPost.getDebtInfo(UrlApi, paramsBody)
    .pipe(
      retry(2),
      tap((resp)=>{
        console.log(resp);
      }),
      map((resp) => resp),
      catchError((err) => of(err.error))
    )
  }

}
