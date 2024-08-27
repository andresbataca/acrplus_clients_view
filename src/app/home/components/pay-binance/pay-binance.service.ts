import { Injectable, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransactionsService } from '../../mappers/data_transactions.service';

@Injectable({
  providedIn: 'root'
})
export class PayBinanceService {
  private formbulider = inject(FormBuilder);
  public dataClient = inject(DataTransactionsService)

  public dataSignal = computed(() => this.dataClient.getData())

  payBinanceForm: FormGroup = this.formbulider
    .group({
      name: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      check: ['', [Validators.required]],
      valor: [{ value: '', disabled: true }, [Validators.required]],
      valorSeleccionado: ['']
  });

  setFormGroup(form: FormGroup) {
    this.payBinanceForm = form;
  }

  getFormGroup(): FormGroup {
    return this.payBinanceForm;
  }

  resetearCampoCheck() {
    this.payBinanceForm.reset({
      name: '',
      lastName:'',
      check: '',
      valor:'',
      valorSeleccionado:''
    });
  }

  switchValor(check:any){
    const valorSeleccionadoControl = this.getFormGroup().get('valorSeleccionado');

    switch (check) {
      case 'monto1':
        valorSeleccionadoControl?.setValue(this.dataSignal().minimalPayment);
        break;

      case 'monto2':
        valorSeleccionadoControl?.setValue(this.dataSignal().totalPayment);
        break;

      default:
        break;
    }
  }

  selectRadio(value: string) {
    const control = this.getFormGroup().get('check');
    if (control) {
      control.setValue(value);
      this.switchValor(value)
    }
  }

  initObserver() {
    const valorControl = this.getFormGroup().get('valor');
    const valorSeleccionadoControl = this.getFormGroup().get('valorSeleccionado');

    this.getFormGroup().controls['check'].valueChanges
      .subscribe(resp => {
        if (resp === 'personalizado') { valorControl?.enable(); }
        else { valorControl?.disable(); valorControl?.setValue('') }

        this.switchValor(resp)
      });

    valorControl?.valueChanges
      .subscribe(value => {
        if (this.getFormGroup().get('check')?.value === 'personalizado') {
          valorSeleccionadoControl?.setValue(value);
        }
      });
  }


}
