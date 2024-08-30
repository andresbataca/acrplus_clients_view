import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { inputModel } from '../../../core/models/input.model';
import { selectModel } from '../../../core/models/select.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/components/input/input.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CustomValidators } from '../../../core/validators/custom-validators';
import { DarkModeComponent } from '../../../shared/components/dark-mode/dark-mode.component';
import { modalModel } from '../../../core/models/modal.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    RouterModule,
    DarkModeComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public authService = inject(AuthService);
  public router = inject(Router);
  public modalService = inject(ModalService);
  private fb = inject(FormBuilder);


  arrayEmpleadoSelect1: selectModel = {
    tooltip:true,
    icon: 'fa-solid fa-file-contract',
    labelExists: false,
    iconExists: false,
    width: '100%',
    name: 'Tipo de identificación',
    placeholder: 'Tipo de identificación',
    controlName: 'typeID',
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
    tooltip:true,
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
    tooltip:true,
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

  arrayInput3: inputModel = {
    tooltip:true,
    labelExists: false,
    iconExists: false,
    width: '100%',
    decimal: false,
    name: 'Contraseña',
    placeholder: 'Ingresa tu contraseña',
    icon: 'fa-solid fa-lock',
    controlName: 'contraseñaDos',
    type: 'password',
    isEyeChange: false,
    errorIcon:false,
    passwordTwo:true,
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
    contraseñaDos: ['', [
      Validators.required,
      Validators.minLength(8),
      CustomValidators.patternValidator(/\d/, { hasNumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      CustomValidators.patternValidator(/^[a-zA-Z0-9äöüÄÖÜ]*$/, { hasSpecialCharacters: true })
    ]],
    term: ['', [Validators.requiredTrue]]
  },{
    validators: [CustomValidators.controlValuesAreEqual('contraseña', 'contraseñaDos')]
  });


  getSubmit(){
    this.newButton.update((val) => {return {...val,load_spinner: true};});

    const dataRegister = this.dataForm.getRawValue();

    this.authService.register(dataRegister)
    .subscribe({
      next:(resp)=>{

        console.log(resp);

        if (resp.success) {
          this.newButton.update((val) => {return {...val,load_spinner: false};});
          this.router.navigate(['/home']);
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

  onRecovery(){
    this.router.navigateByUrl('/auth/recovery')
  }
}
