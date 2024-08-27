import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { modalModel } from '../../../core/models/modal.model';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { AuthService } from '../../services/auth.service';
import { InputComponent } from '../../../shared/components/input/input.component';
import { inputModel } from '../../../core/models/input.model';
import { selectModel } from '../../../core/models/select.model';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CustomValidators } from '../../../core/validators/custom-validators';
import { CacheService } from '../../../core/services/cache.service';
import { TooltipComponent } from '../../../shared/components/tooltip/tooltip.component';
import { DarkModeComponent } from '../../../shared/components/dark-mode/dark-mode.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    RouterModule,
    TooltipComponent,
    DarkModeComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  public authService = inject(AuthService);
  public router = inject(Router);
  public modalService = inject(ModalService);
  private fb = inject(FormBuilder);

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
    name: 'Contraseña',
    placeholder: 'Ingresa tu contraseña',
    icon: 'fa-solid fa-lock',
    controlName: 'contraseña',
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

  newButton = signal({
    text: 'Consultar',
    load_spinner: false,
  });

  dataForm: FormGroup = this.fb.group({
    typeID: ['', [Validators.required]],
    ID: ['', [Validators.required]],
    contraseña: ['', [
      Validators.required,
      Validators.minLength(8),
      CustomValidators.patternValidator(/\d/, { hasNumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      CustomValidators.patternValidator(/^[a-zA-Z0-9äöüÄÖÜ]*$/, { hasSpecialCharacters: true })
    ]],
  });

  onRecovery(){
    this.router.navigateByUrl('/auth/recovery')
  }

  getSubmit(){
    // this.newButton.set({text: 'Consultar',load_spinner: true,});
    this.newButton.update((val) => {return {...val,load_spinner: true};});

    const dataLogin = this.dataForm.getRawValue();

    this.authService.login(dataLogin.typeID,dataLogin.ID, dataLogin.contraseña)
    .subscribe({
      next:(resp)=>{
        if (resp.success === true) {
          this.newButton.update((val) => {return {...val,load_spinner: false};});
          this.router.navigate(['/home']);

        } else if (resp.success == false) {

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
        } else {

          this.newButton.update((val) => {return {...val,load_spinner: false};});
          const newModalData: modalModel = {
            viewModal: true,
            clickOutside: true,
            title: 'Atención',
            colorIcon: 'red',
            icon: 'fa-solid fa-triangle-exclamation',
            message: 'En este momento estamos presentando fallas.',
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


}
