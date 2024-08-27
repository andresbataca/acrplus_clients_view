import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { environments } from '../../../../environments/environments.develoment';
import { AuthService } from '../../../auth/services/auth.service';
import { inputModel } from '../../../core/models/input.model';
import { modalModel } from '../../../core/models/modal.model';
import { selectModel } from '../../../core/models/select.model';
import { ApiPostService } from '../../../core/services/api-post.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { InputComponent } from '../../../shared/components/input/input.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { CardDetailsComponent } from "../../../shared/components/card_details/card_details.component";
import { CardItemComponent } from "../../../shared/components/card-item/card-item.component";
import { CardItem } from '../../../core/models/cardItem.model';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { CardButtonComponent } from "../../../shared/components/card-button/card-button.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";

@Component({
    selector: 'app-contact-us',
    standalone: true,
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        InputComponent,
        SelectComponent,
        ReactiveFormsModule,
        CardDetailsComponent,
        CardItemComponent,
        TitleComponent,
        CardButtonComponent,
        ButtonComponent
    ]
})
export class ContactUsComponent {
  private fb = inject(FormBuilder);
  private apiPost = inject(ApiPostService);
  private modalService = inject(ModalService);

  private baseUrl: string = environments.baseUrl;
  private unsubscribe$ = new Subject();

  contactForm!: FormGroup;

  card7 = signal<any>({
    icon: 'fa-brands fa-whatsapp',
    coloricon:'var(--color-text-check)',
    bckgrIcon:'var(--secondary-color-1)',
    title: 'Whatsapp',
    subtitle: '315 6792956',
    onMethodAction: () => {

    },
  })

  card8 = signal<any>({
    icon: 'fa-solid fa-house-laptop',
    coloricon:'var(--color-text-check)',
    bckgrIcon:'var(--secondary-color-2)',
    title: 'Instalaciones',
    subtitle: 'Cra 31 #29-77 Palmira',
    onMethodAction: () => {

     },
  })

  card9 = signal<any>({
    icon: 'fa-solid fa-square-phone',
    coloricon:'var(--color-text-check)',
    bckgrIcon:'var(--secondary-color-3)',
    title: 'Teléfono',
    subtitle: '(062) 326 8548',
    onMethodAction: () => {  },
  })

  newButton = signal({
    text: 'Consultar',
    load_spinner: false,
  });

  arraySelect1: selectModel = {
    tooltip: false,
    iconExists: false,
    icon: 'fa-solid fa-file-circle-question',
    labelExists: false,
    name: 'PQRS',
    placeholder: 'PQRS',
    controlName: 'PQRS',
    selects: [
      {
        value: 1,
        name: 'Petición',
      },
      {
        value: 2,
        name: 'Quejas',
      },
      {
        value: 3,
        name: 'Reclamos',
      },
      {
        value: 4,
        name: 'Solicitudes',
      },
      {
        value: 5,
        name: 'Felicitaciones',
      },
    ],
  };

  arrayInput1: inputModel = {
    tooltip: false,
    labelExists: false,
    decimal: false,
    name: 'Nombre',
    placeholder: 'Nombre',
    icon: 'fa-solid fa-user',
    controlName: 'name',
    type: 'text',
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
    decimal: false,
    name: 'Correo',
    placeholder: 'Correo',
    icon: 'fa-solid fa-envelope',
    controlName: 'correo',
    type: 'text',
    iconExists: false,
    width: '',
    isEyeChange: false,
    errorIcon: false,
    validationSpecial: false,
    validations: []
  };

  arrayInput4: inputModel = {
    tooltip: false,
    labelExists: false,
    decimal: false,
    name: 'Numero de contacto',
    placeholder: 'Número de contacto',
    icon: 'fa-solid fa-square-phone',
    controlName: 'contact',
    type: 'text',
    iconExists: false,
    width: '',
    isEyeChange: false,
    errorIcon: false,
    validationSpecial: false,
    validations: []
  };

  contactFormInit(): FormGroup {
    return this.fb.group({
      PQRS: ['', [Validators.required],],
      name: ['', [Validators.required],],
      correo: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      msg: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.contactForm = this.contactFormInit();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  getSubmit() {
    const formData = this.contactForm.getRawValue();
    const UrlApi = `${this.baseUrl}/api/app/contact_us`;

    const paramsBody = {
      name: formData.name,
      mobile: formData.contact,
      email: formData.correo,
      description: formData.msg,
      id_type_description: formData.PQRS
    };

    this.apiPost.getDebtInfo(UrlApi, paramsBody)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next:(resp)=>{
            const newModalData: modalModel = {
              viewModal: true,
              clickOutside: true,
              title: 'Atención',
              colorIcon: 'green',
              icon: 'fa-solid fa-triangle-exclamation',
              message: 'Muchas gracias por contactarte con nosotros. Estaremos revisando tu mensaje y en breve nos pondremos en contacto contigo.',
              onMethod: () => {
                newModalData.viewModal = false;
              },
              isThereaButton2: false,
              onMethodAction: () => {
              },
              loader: false,
              buttonText: 'Cerrar',
            };

            this.modalService.setArray(newModalData);
        }
      })

  }

}
