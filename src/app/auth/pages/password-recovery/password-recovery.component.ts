import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DarkModeComponent } from "../../../shared/components/dark-mode/dark-mode.component";
import { TooltipComponent } from "../../../shared/components/tooltip/tooltip.component";
import { TitleComponent } from "../../../shared/components/title/title.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../core/validators/custom-validators';
import { InputComponent } from '../../../shared/components/input/input.component';
import { selectModel } from '../../../core/models/select.model';
import { inputModel } from '../../../core/models/input.model';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { AuthService } from '../../services/auth.service';
import { UtilitiesService } from '../../../core/helpers/utilities.service';
import { OtpInputService } from '../../../home/services/otp_input.service';
import { modalModel } from '../../../core/models/modal.model';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { PassRecoveryService } from '../../services/pass-recovery.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DarkModeComponent,
    TooltipComponent,
    TitleComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    RouterModule
],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordRecoveryComponent {

  private fb = inject(FormBuilder);
  public authService = inject(AuthService);
  public passRecoveryService = inject(PassRecoveryService);
  public utilities = inject(UtilitiesService);
  public otpServices = inject(OtpInputService);
  public modalService = inject(ModalService);
  private router = inject(Router)


  statePage = signal <boolean>(true);

  arrayOtp: string[] = [];

  formOtp: FormGroup = this.fb.group({
    password_one: ['', [Validators.required,
                        Validators.minLength(8),
                        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
                        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                        CustomValidators.patternValidator(/^[a-zA-Z0-9äöüÄÖÜ]*$/, { hasSpecialCharacters: true }) ]],
    password_two: ['', [Validators.required,
                        Validators.minLength(8),
                        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
                        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                        CustomValidators.patternValidator(/^[a-zA-Z0-9äöüÄÖÜ]*$/, { hasSpecialCharacters: true }) ]],
    otp1: ['', [Validators.required]],
    otp2: ['', [Validators.required]],
    otp3: ['', [Validators.required]],
    otp4: ['', [Validators.required]],
    otp5: ['', [Validators.required]],
    otp6: ['', [Validators.required]],
  },{
    validators: [CustomValidators.controlValuesAreEqual('password_one', 'password_two')]
  });


  arraySelect1: selectModel = {
    icon: 'fa-solid fa-file-contract',
    labelExists: false,
    iconExists: false,
    width: '100%',
    name: 'Tipo de identificación',
    placeholder: 'Tipo de identificación',
    controlName: 'typeID',
    tooltip:false,
    selects: [
      {
        value: 2,
        name: 'Ciudadanía',
      },
      {
        value: 1,
        name: 'Extranjería',
      },
    ],
  };

  arrayInput1: inputModel = {
    tooltip:false,
    labelExists: false,
    iconExists: false,
    width: '100%',
    decimal: false,
    name: 'Número de identificación',
    placeholder: 'Ingresa tu número de identificación',
    icon: 'fa-solid fa-envelope',
    controlName: 'ID',
    type: 'text',
    isEyeChange: false,
    errorIcon:false,
    validationSpecial: false,
    validations:[]
  };

  arrayInput2: inputModel = {
    tooltip:false,
    labelExists: false,
    iconExists: false,
    width: '100%',
    decimal: false,
    name: 'Número de identificación',
    placeholder: 'Contraseña',
    icon: 'fa-solid fa-envelope',
    controlName: 'password_one',
    type: 'password',
    isEyeChange: false,
    errorIcon:false,
    validationSpecial: true,
    validations: [
      {
        validErrors: 'minlength',
        descriptErrors: 'tener minimo 8 caracteres',
      },
      {
        validErrors: 'hasCapitalCase',
        descriptErrors: 'Tener una letra mayúscula',
      },
      {
        validErrors: 'hasNumber',
        descriptErrors: 'Tener un número',
      },
      {
        validErrors: 'hasSpecialCharacters',
        descriptErrors: 'No tener caracteres especiales',
      },

    ],
  };

  arrayInput3: inputModel = {
    tooltip:false,
    labelExists: false,
    iconExists: false,
    width: '100%',
    decimal: false,
    name: 'Número de identificación',
    placeholder: 'Contraseña',
    icon: 'fa-solid fa-envelope',
    controlName: 'password_two',
    type: 'password',
    isEyeChange: false,
    errorIcon:false,
    validationSpecial: true,
    passwordTwo:true,
    validations: [],
  };

  newButton = signal({
    text: 'Recuperar',
    load_spinner: false,
  });

  dataForm: FormGroup = this.fb.group({
    typeID: ['', [Validators.required]],
    ID: ['', [Validators.required]]
  });


  getSubmit(opt:string){
    console.log(opt);

    if (opt === 'initial') {
      this.newButton.update((val) => {return {...val,load_spinner: true};})
    }

    const formData = this.dataForm.getRawValue();

    this.passRecoveryService.passwordRecovery(formData.typeID,formData.ID)
    .subscribe({
      next:(resp)=>{

        if (resp.success) {
          this.newButton.update((val) => {return {...val,load_spinner: false};});

          this.statePage.set(false)

        } else {
          this.newButton.update((val) => {return {...val,load_spinner: false};});

          const newModalData: modalModel = {
            viewModal: true,
            clickOutside: true,
            title: 'Atención',
            colorIcon: 'red',
            icon: 'fa-solid fa-triangle-exclamation',
            message: resp.message,
            onMethod: () => {
              this.modalService.closeModal()
            },
            onMethodAction: () => {},
            loader: false,
            buttonText: 'Cerrar',
          };

          this.modalService.setArray(newModalData);

        }
      }
    })

  }

  getSubmitOtp(){
    this.newButton.update((val) => {return {...val,load_spinner: true};});

    this.passRecoveryService.otpSend(this.formOtp)
    .subscribe({
      next:(resp)=>{

        console.log(resp);

        if (resp.success) {

          console.log('entro');

          this.newButton.update((val) => {return {...val,load_spinner: false};});

          this.statePage.set(false)

          const newModalData: modalModel = {
            viewModal: true,
            clickOutside: true,
            title: 'Atención',
            colorIcon: 'red',
            icon: 'fa-solid fa-triangle-exclamation',
            message: resp.message,
            onMethod: () => {
              this.modalService.closeModal()
              this.router.navigate(['login']);
            },
            onMethodAction: () => {},
            loader: false,
            buttonText: 'Cerrar',
          };

          this.modalService.setArray(newModalData);

        } else {
          this.newButton.update((val) => {return {...val,load_spinner: false};});

          const newModalData2: modalModel = {
            viewModal: true,
            clickOutside: true,
            title: 'Atención',
            colorIcon: 'red',
            icon: 'fa-solid fa-triangle-exclamation',
            message: resp.message,
            onMethod: () => {
              this.modalService.closeModal()
            },
            onMethodAction: () => {},
            loader: false,
            buttonText: 'Cerrar',
          };

          this.modalService.setArray(newModalData2);


        }
      }
    })

  }

}
