import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { selectModel } from '../../../core/models/select.model';
import { CustomNumberPipe } from '../../../shared/pipes/custom-number.pipe';
import { DataTransactionsService } from '../../mappers/data_transactions.service';
import { ProductStateService } from '../../pages/products/product-state.service';
import { BanksService } from '../../services/banks.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { CardButtonPayComponent } from '../card-button-pay/card-button-pay.component';
import { PayBinanceService } from './pay-binance.service';
import { inputModel } from '../../../core/models/input.model';
import { InputComponent } from "../../../shared/components/input/input.component";
import { HomeStateService } from '../../pages/home/home-state.service';
import { Router } from '@angular/router';
import { modalModel } from '../../../core/models/modal.model';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { ButtonSpecialComponent } from "../../../shared/components/button-special/button-special.component";

@Component({
    selector: 'app-pay-binance',
    standalone: true,
    templateUrl: './pay-binance.component.html',
    styleUrl: './pay-binance.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    CommonModule,
    TitleComponent,
    SelectComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CardButtonPayComponent,
    InputComponent,
    ButtonSpecialComponent
]
})
export class PayBinanceComponent {
  ubication = input<string>('');

  private bank = inject(BanksService);
  public dataClient = inject(DataTransactionsService)
  public payBinanceService = inject(PayBinanceService)
  private modalService = inject(ModalService)
  public productState = inject(ProductStateService)
  public homeState = inject(HomeStateService)
  private router = inject (Router)


  public dataSignal = computed(() => this.dataClient.getData())

  imgQR = signal<string>('');
  linkQR = signal<string>('');
  stateBinance = signal<boolean>(true);

  newButton = signal({
    text: 'Consultar',
    load_spinner: false,
  });

  buttonSpecial1 = signal<any>({
    text:'Binance Pay',
    onMethodAction: () => {
      console.log(this.linkQR());
      window.open(this.linkQR(), '_blank');
    },
   })

  card1 = signal<any>({
    icon: 'fa-solid fa-money-bill',
    coloricon: 'var(--secondary-color-1)',
    title: 'Pago mínimo',
    controlName: 'check',
    value:'monto1',
    subtitle: '',
    description:'',
  })

  card2 = signal<any>({
    icon: 'fa-solid fa-chart-line',
    coloricon: 'var(--secondary-color-2)',
    title: 'Pago total',
    controlName: 'check',
    value:'monto2',
    subtitle: '200.000',
    description:'',
  })

  card3 = signal<any>({
    icon: 'fa-solid fa-server',
    coloricon: 'var(--secondary-color-3)',
    title: 'Otro valor',
    controlName: 'check',
    value:'personalizado',
    controlNameSpecial:'valor',
    subtitle: '200.000',
    description:'',
  })

  public card1Comp = computed(() => this.card1())


  arrayInput1: inputModel = {
    tooltip:false,
    labelExists: false,
    iconExists: false,
    width: '100%',
    decimal: false,
    name: 'Nombre',
    placeholder: 'Nombre',
    icon: 'fa-solid fa-envelope',
    controlName: 'name',
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
    name: 'Apellido',
    placeholder: 'Apellido',
    icon: 'fa-solid fa-envelope',
    controlName: 'lastName',
    type: 'text',
    isEyeChange: false,
    errorIcon:false,
    validationSpecial: false,
    validations:[]
  };

  banksList!: any;
  payBinanceForm!: FormGroup;

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
    this.payBinanceForm = this.payBinanceService.getFormGroup();
    this.payBinanceService.initObserver();
  }

  getUrl(){
    const currentUrl = this.router.url;
    const partes = currentUrl.split('/');
    const ubication = partes[partes.length - 1];
  }

  back(){
    this.stateBinance.set(true)
    if (this.ubication() === 'products') {
      this.productState.setData('inicio')
    }else{
      this.homeState.setData('inicio')
    }
  }

  getSubmit(){
    this.newButton.set({text: 'Consultar',load_spinner: true,});

    const formData = this.payBinanceForm.getRawValue();
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

    this.bank.initTransactionBinancen(formData)
    .subscribe({
      next: (resp)=>{
        console.log(resp);

        if (resp.success) {
          this.newButton.set({text: 'Consultar',load_spinner: false,});

          this.stateBinance.set(false)

          this.imgQR.set(resp.data.qr)
          this.linkQR.set(resp.data.redirectUrl)


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

 }
