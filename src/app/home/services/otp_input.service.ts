import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OtpInputService {

  constructor() { }

     //proceso de copy/page OTP
     handlePaste(event: ClipboardEvent, formCname: string, formOtp:FormGroup) {
      const pastedData = event.clipboardData?.getData('text/plain');

      if (pastedData && pastedData.length >= 6) {
        const otpValues = pastedData.substring(0, 6).split('');

        const formControls = formOtp.controls;
        const controlNames = Object.keys(formControls);
        const startIndex = controlNames.indexOf(formCname);
        const endIndex = startIndex + 6;

        for (let i = startIndex; i < endIndex; i++) {
          const controlName = controlNames[i];
          const value = otpValues[i - startIndex] || '';
          formControls[controlName].patchValue(value);

          if (i === endIndex - 1) {
            const lastInput = document.querySelector(`input[formControlName="${controlName}"]`) as HTMLInputElement;
            lastInput.focus();
            lastInput.setSelectionRange(lastInput.value.length, lastInput.value.length);
          }
        }
      }
    }

    // Método para códigos OTP y su salto en inputs
    valueAfter: string = '';

    moveFocusInput(event: any, before: any, actual: any, after: any, formCname:string, formOtp:FormGroup) {

        let valueAct = actual.value;
        let length = actual.value.length;
        let maxlength = actual.getAttribute('maxlength');


      if (length == maxlength) {
          if (after != '') {
            after.focus();
          }
          this.valueAfter = valueAct; // Guardar el valor actual para su reemplazo posterior
      }

      if (event.key === 'Backspace'  || event.key === 'ArrowLeft') {
          if (before != '') {
            before.focus();
          }
          this.valueAfter = ''; // Limpiar el valor guardado al retroceder
      }

      if (!isNaN(event.key)) {
          // Si la tecla presionada es un número, reemplazar el valor actual con el nuevo
          if (this.valueAfter.length > 0) {
            formOtp.get(formCname)?.patchValue(event.key);
            this.valueAfter = '';
          }
      }

    }

}
