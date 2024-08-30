import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, catchError, map, of, pipe, retry, tap } from 'rxjs';


import { ApiPostService } from '../../core/services/api-post.service';
import { EncryptationService } from '../../core/services/encryptation.service';
import { ModalService } from '../../shared/components/modal/modal.service';
import { usuarioModel } from '../models/usuario.model';
import { modalModel } from '../../core/models/modal.model';
import { environments } from '../../../environments/environments.develoment';
import { TooltipService } from '../../shared/components/tooltip/tooltip.service';
import { CacheService } from '../../core/services/cache.service';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiPost = inject(ApiPostService)
  private router = inject(Router)
  public encryptation = inject(EncryptationService)
  private modalService = inject(ModalService)
  private tooltipService = inject(TooltipService)
  private cache = inject(CacheService)

  private baseUrl: string = environments.baseUrl;

  userData = signal<usuarioModel>({
    tokenUser: '',
    checkId: '',
    ID: '',
    name: '',
    photo: '',
    time: ''
  });


  get usuario() {
    return this.userData();
  }

  register(dataForm:any) {

    const UrlApi = `${this.baseUrl}/api/app/register`;
    let termino = '';

    if (dataForm.term) {
      termino = '1';
    } else {
      termino = '2';
    }

    const paramsBody = {
      type_identification: dataForm.typeID,
      identification: dataForm.ID,
      password: dataForm.contraseña,
      password_confirm: dataForm.contraseñaDos,
      tyc: dataForm.term,
      token_fcm: 'jhasjydie76iwhfe8k84',
      id_device: 'agtd86732vbbjhnf',
    };

    return this.apiPost.getDebtInfo(UrlApi, paramsBody)
      .pipe(
        tap(resp => {

          const minutosExpiracion = resp.data.expireMinutesAt;
          let currentDateObj = new Date();
          let numberOfMlSeconds = currentDateObj.getTime();
          let addMlSeconds = minutosExpiracion * 60000;
          let newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

          this.userData.set({
            tokenUser: resp.data.token,
            checkId: dataForm.typeID,
            ID: dataForm.ID,
            name: resp.data.user.firstName,
            photo: resp.data.user.profilePhoto,
            time: newDateObj.toString()
          })

          let user = btoa(this.encryptation.encrypt(JSON.stringify(this.userData())));

          localStorage.setItem('acr_user', user);

        }),
        //el map me muta o cambia el observable que viene y me devuelve otro
        map((resp) => resp),
        catchError((err) => of(err.error))
      )
  }

  login(checkID: string, ID: string, contraseña: string) {

    const UrlApi = `${this.baseUrl}/api/app/login`;

    const paramsBody = {
      type_identification: checkID,
      identification: ID,
      password: contraseña,
      id_device: 'agtd86732vbbjhnf'
    };

    return this.apiPost.getDebtInfo(UrlApi, paramsBody)
      .pipe(
        retry(2),
        tap((resp) => {
          if (resp) {

            const minutosExpiracion = resp.data.expireMinutesAt;
            let currentDateObj = new Date();
            let numberOfMlSeconds = currentDateObj.getTime();
            let addMlSeconds = minutosExpiracion * 60000;
            let newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

            this.userData.set({
              tokenUser: resp.data.token,
              checkId: checkID,
              ID: ID,
              name: resp.data.user.firstName,
              photo: resp.data.user.profilePhoto,
              time: newDateObj.toString()
            })

            let user = btoa(this.encryptation.encrypt(JSON.stringify(this.userData())));

            localStorage.setItem('acr_user', user);

          }
        }),

        map((resp) => resp),
        catchError((err) => of(err.error))
      );
  }

  getItemFromLocalStorage(key: string) {
    const itemString = localStorage.getItem(key);
    const decryptedItemString = this.encryptation.decrypt(itemString || '');
    const decryptedItemObject = JSON.parse(decryptedItemString);
    return decryptedItemObject;
  }

  private getDecodedToken(): any {
    if (!localStorage.getItem('acr_user')) {
      return null;
    }

    this.userData.set(this.getItemFromLocalStorage('acr_user'));
    let tok = this.userData().tokenUser;
    return tok;
  }

  ValitionTime() {
    const time = computed(() => { const firstUser = this.userData(); return firstUser?.time; });

    let currentDateObj = new Date();
    let fechaBack = time();
    let dateFuture = new Date(fechaBack!.toString())

    return (dateFuture < currentDateObj)
  }

  validationToken(): Observable<boolean> {
    const decoded = this.getDecodedToken();
    if (!decoded) return of(false);
    const timeValition = this.ValitionTime();
    if (timeValition) {
      // Token ha expirado
      return this.handleExpiredToken();
    } else {
      // Token es válido
      return of(true);
    }
  }

  public handleExpiredToken(): Observable<boolean> {
    this.cache.clear()

    localStorage.removeItem('acr_user');
    this.router.navigate(['./auth'])

    const newModalData1: any = {
      viewTool: true,
      title: 'Cerramos su sesión por seguridad',
      icon: '',
      message: 'Por favor, vuelve a ingresar con tus datos.',
      onMethod: () => { }
    };

    this.tooltipService.setArray(newModalData1);
    return of(false);
  }

  logout() {
    this.cache.clear()

    const newModalData: modalModel = {
      viewModal: true,
      clickOutside: true,
      title: 'Atencion!',
      colorIcon: 'red',
      icon: 'fa-solid fa-triangle-exclamation',
      message: '¿Estás seguro que deseas cerrar sesión?',
      onMethod: () => {
        this.modalService.closeModal()
      },
      isThereaButton2: true,
      onMethodAction: () => {
        this.modalService.closeModal()
        localStorage.removeItem('acr_user');
        this.router.navigate(['/auth']);
      },
      loader: false,
      buttonText: 'No',
      buttonTextSecondary: 'Sí'
    };

    this.modalService.setArray(newModalData);

  }


}
