import { Injectable, inject } from '@angular/core';
import { UtilitiesService } from '../../../core/helpers/utilities.service';
import  type { inputModel } from '../../../core/models/input.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InputDataService {

  constructor() { }

  public utilities = inject(UtilitiesService)

  handleInput(event: Event, form: FormGroup, arrayInput:inputModel ) {
    if (arrayInput.type === 'tel') {
      this.utilities.onlyNumbersSpecial(event,form,arrayInput);
    }
    if (arrayInput.decimal) {
      this.utilities.formatoNumerico(event,form,arrayInput.controlName);
    }
  }

  setInputType(arrayInput:inputModel): string {
    const inputType = arrayInput.type === 'password'
      ? (arrayInput.isEyeChange ? 'text' : 'password')
      : arrayInput.type;

      return inputType
  }

  dataFormValids(form: FormGroup, arrayInput: inputModel) {
    const control = form.get(arrayInput.controlName);
    if (!control) return false;

    return arrayInput.validations.some(validation => {
      const errorKey = validation.validErrors;
      return control.dirty && control.errors?.[errorKey];
    });
  }


}
