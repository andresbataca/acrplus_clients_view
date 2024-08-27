import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { BanksService } from '../../services/banks.service';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectModel } from '../../../core/models/select.model';
import { SelectComponent } from "../../../shared/components/select/select.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { CardButtonPayComponent } from "../card-button-pay/card-button-pay.component";
import { CustomNumberPipe } from '../../../shared/pipes/custom-number.pipe';
import { PayPseService } from './pay-pse.service';
import { ProductStateService } from '../../pages/products/product-state.service';
import { DataTransactionsService } from '../../mappers/data_transactions.service';
import { HomeStateService } from '../../pages/home/home-state.service';
import { AuthService } from '../../../auth/services/auth.service';
import { modalModel } from '../../../core/models/modal.model';
import { ModalService } from '../../../shared/components/modal/modal.service';

@Component({
    selector: 'app-pay-pse',
    standalone: true,
    templateUrl: './pay-pse.component.html',
    styleUrl: './pay-pse.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        TitleComponent,
        SelectComponent,
        ButtonComponent,
        ReactiveFormsModule,
        CardButtonPayComponent
    ]
})
export class PayPseComponent {
  ubication = input<string>('');

  private bank = inject(BanksService);
  public dataClient = inject(DataTransactionsService)
  public payPseService = inject(PayPseService)
  public productState = inject(ProductStateService)
  public homeState = inject(HomeStateService)
  private modalService = inject(ModalService)
  private auth = inject(AuthService);


  public dataSignal = computed(() => this.dataClient.getData())

  arraySelect1: selectModel = {
    icon: 'fa-solid fa-file-contract',
    labelExists: false,
    iconExists: false,
    width: '100%',
    name: 'Tipo de identificación',
    placeholder: 'Tipo de persona',
    controlName: 'typePerson',
    tooltip:false,
    selects: [
      {
        value: 0,
        name: 'Natural',
      },
      {
        value: 1,
        name: 'Jurídica',
      },
    ],
  };

  arraySelect2 = signal<selectModel>({
    icon: 'fa-solid fa-file-contract',
    labelExists: false,
    iconExists: false,
    width: '100%',
    name: 'Escoge el banco',
    placeholder: 'Escoge el banco',
    controlName: 'bank',
    tooltip:false,
    selects: [],
  })

  newButton = signal({
    text: 'Consultar',
    load_spinner: false,
  });

  card1 = signal<any>({
    icon: 'fa-solid fa-money-bill',
    coloricon: 'var(--secondary-color-1)',
    title: 'Pago mínimo',
    controlName: 'check',
    value:'monto1',
    subtitle: 0,
    description:'',
  })

  card2 = signal<any>({
    icon: 'fa-solid fa-chart-line',
    coloricon: 'var(--secondary-color-2)',
    title: 'Pago total',
    controlName: 'check',
    value:'monto2',
    subtitle: 0,
    description:'',
  })

  card3 = signal<any>({
    icon: 'fa-solid fa-server',
    coloricon: 'var(--secondary-color-3)',
    title: 'Otro valor',
    controlName: 'check',
    value:'personalizado',
    controlNameSpecial:'valor',
    subtitle: '',
    description:'',
  })

  banksList!: any;
  payPseForm!: FormGroup;

  constructor(){
    let numberPipe = new CustomNumberPipe()

    effect(()=>{
      this.card1.update(currentValue => {
        return { ...currentValue, subtitle: numberPipe.transform(this.dataSignal().minimalPayment) };
      })

      this.card2.update(currentValue => {
        return { ...currentValue, subtitle: numberPipe.transform(this.dataSignal().totalPayment) };
      })

    }, { allowSignalWrites: true })
  }

  ngOnInit(): void {
    this.getBanks();
    this.payPseForm = this.payPseService.getFormGroup();
    this.payPseService.initObserver();
  }

  getBanks(){
      this.bank.banks()
      .subscribe({
        next:(resp)=>{
          const nuevoArreglo = resp.map((objeto:any) => {
            return {
              value: objeto.code,
              name: objeto.name,
            };

          });

          const nuevoArreglo2 = [...nuevoArreglo, { value: '1022', name: 'BANCO UNION COLOMBIANO' }];

          this.arraySelect2.update(currentValue => {
            return { ...currentValue, selects: nuevoArreglo2 };
          })

        }
      })
  }


  getSubmit(){
    this.newButton.set({text: 'Consultar',load_spinner: true,});

    const formData = this.payPseForm.getRawValue();
    const gastosCobrabza = this.dataClient.getData().collectionExpenses;

    if (formData.valorSeleccionado <= gastosCobrabza) {
      const newModalData: modalModel = {
        viewModal: true,
        clickOutside: true,
        title: 'Atencion!',
        colorIcon: 'red',
        icon: 'fa-solid fa-triangle-exclamation',
        message: `El valor ingresado debe ser mayor a tus gastos de cobranza.`,
        onMethod:() =>{
          this.modalService.closeModal()
        },
        onMethodAction: () => {},
        loader: false,
        buttonText: 'Cerrar',
      };

      this.modalService.setArray(newModalData);
      return
    }

    this.bank.initTransactionPSE(formData)
    .subscribe({
      next: (resp)=>{
        console.log(resp);

        if (resp.success) {
          this.newButton.set({text: 'Consultar',load_spinner: false,});
          window.location.assign(resp.data.pseURL);

        } else {
        this.newButton.set({text: 'Consultar',load_spinner: false,});

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
          isThereaButton2: false,
          onMethodAction: () => {},
          loader: false,
          buttonText: 'Cerrar',
        };

        this.modalService.setArray(newModalData);
        }
      },
      error: (_) =>{

        this.newButton.set({text: 'Consultar',load_spinner: false,});

        const newModalData: modalModel = {
          viewModal: true,
          clickOutside: true,
          title: 'Atencion!',
          colorIcon: 'red',
          icon: 'fa-solid fa-triangle-exclamation',
          message: `Tenemos dificultades de comunicación en nuestros servidores, por favor intentelo mas tarde`,
          onMethod:() =>{
            this.modalService.closeModal()
          },
          onMethodAction: () => {},
          loader: false,
          buttonText: 'Cerrar',
        };

        this.modalService.setArray(newModalData);
      }
    })

  }

  back(){
    if (this.ubication() === 'products') {
      this.productState.setData('inicio')
    }else{
      this.homeState.setData('inicio')
    }
  }

 }
