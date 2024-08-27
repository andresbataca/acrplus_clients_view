import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environments } from '../../../../environments/environments.develoment';
import { AuthService } from '../../../auth/services/auth.service';
import { inputModel } from '../../../core/models/input.model';
import { modalModel } from '../../../core/models/modal.model';
import { selectModel } from '../../../core/models/select.model';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ClearedApiService } from './cleared-api.service';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { HeaderTitleComponent } from "../../../shared/components/header-title/header-title.component";
import { CardButtonComponent } from "../../../shared/components/card-button/card-button.component";

@Component({
    selector: 'app-cleared',
    standalone: true,
    templateUrl: './cleared.component.html',
    styleUrl: './cleared.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SelectComponent,
        InputComponent,
        ButtonComponent,
        TitleComponent,
        HeaderTitleComponent,
        CardButtonComponent
    ]
})
export class ClearedComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private modalService = inject(ModalService);
  private cleareddApi = inject(ClearedApiService);


  clearedForm!: FormGroup;

  arraySelect1: selectModel = {
    tooltip: false,
    iconExists: false,
    icon: 'fa-solid fa-address-card',
    labelExists: false,
    name: 'Tipo de documento',
    placeholder: 'Tu tipo de documento',
    controlName: 'checkID',
    selects: [
      {
        value: 2,
        name: 'Cédula de ciudadania',
      },
      {
        value: 1,
        name: 'Cédula de extranjería',
      },
    ],
  };

  arrayInput1: inputModel = {
    labelExists: false,
    decimal: false,
    name: 'Número de identificación',
    placeholder: 'Tu ID',
    icon: 'fa-solid fa-id-card-clip',
    controlName: 'numID',
    type: 'text',
    tooltip: false,
    iconExists: false,
    width: '',
    isEyeChange: false,
    errorIcon: false,
    validationSpecial: false,
    validations: []
  };

  arrayInput3: inputModel = {
    tooltip: false,
    labelExists: false,
    iconExists: false,
    decimal: false,
    name: 'Primer apellido',
    placeholder: 'A quien corresponda',
    icon: 'fa-solid fa-user-tie',
    controlName: 'text',
    type: 'text',
    isEyeChange: false,
    errorIcon: false,
    validationSpecial: false,
    validations: []
  };

  titleHeader1: any = {
    title:'Paz y salvo',
    subtitle:'Certificado de Obligaciones Cumplidas'
  };

  card7 = signal<any>({
    icon: 'fa-solid fa-server',
    coloricon:'var(--color-text-check)',
    bckgrIcon:'var(--secondary-color-1)',
    title: 'Tipo de tramite',
    subtitle: 'En Línea',
    onMethodAction: () => {

    },
  })

  card8 = signal<any>({
    icon: 'fa-solid fa-hourglass-half',
    coloricon:'var(--color-text-check)',
    bckgrIcon:'var(--secondary-color-2)',
    title: '¿Tiempo del proceso?',
    subtitle: 'Inmediato',
    onMethodAction: () => {

     },
  })

  card9 = signal<any>({
    icon: 'fa-solid fa-coins',
    coloricon:'var(--color-text-check)',
    bckgrIcon:'var(--primary-color)',
    title: '¿Tiene costo?',
    subtitle: 'Sin Costo(antes de 180 dias)',
    onMethodAction: () => {  },
  })

  card10 = signal<any>({
    icon: 'fa-solid fa-location-dot',
    coloricon:'var(--color-text-check)',
    bckgrIcon:'var(--secondary-color-3)',
    title: '¿A donde ir?',
    subtitle: 'Ver puntos de atención',
    onMethodAction: () => {  },
  })

  clearedFormInit(): FormGroup {
    return this.fb.group({
      checkID: [{ value: this.type_identification, disabled: true }, [Validators.required],],
      numID: [{ value: this.identification, disabled: true }, [Validators.required],],
      text: ['', [Validators.required]],
    });
  }

  newButton = signal({
    text: 'Consultar',
    load_spinner: false,
  });

  type_identification!: string;
  identification!: string;
  token!: string;

  private unsubscribe$ = new Subject<void>();


  ngOnInit(): void {
    this.type_identification = this.auth.usuario.checkId;
    this.identification = this.auth.usuario.ID;
    this.clearedForm = this.clearedFormInit();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  getSubmit() {
    this.auth.validationToken().subscribe()
    this.newButton.set({text: 'Consultar',load_spinner: true,});

    const formData = this.clearedForm.getRawValue();

    this.cleareddApi.getCertification(formData)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((resp)=>{
        this.newButton.set({text: 'Consultar',load_spinner: false,});

        const newModalData: modalModel = {
          viewModal: true,
          clickOutside: true,
          title: 'Atención',
          colorIcon: 'red',
          icon: 'fa-solid fa-triangle-exclamation',
          message: 'Su paz y salvo ha sido generado',
          onMethod: () => {
            this.modalService.closeModal()
          },
          isThereaButton2: true,
          onMethodAction: () => {
            const externalLink = resp;
            window.open(externalLink, '_blank');
          },
          loader: false,
          buttonText: 'Cerrar',
          buttonTextSecondary: 'Descargar'
        };

        this.modalService.setArray(newModalData);
      })
      ).subscribe()
  }

  openLocationLink() {
    const direccion = "Carrera 31 NO. 29-77 Palmira, Valle";
    window.open(`https://www.google.com/maps?q=${encodeURIComponent(direccion)}`, '_blank');
  }
}
