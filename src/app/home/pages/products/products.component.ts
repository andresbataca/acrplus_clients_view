import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { skeletonDirective } from '../../../shared/directives/skeleton.directive';
import { TableSpecialComponent } from '../../../shared/components/table-special/table-special.component';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { CustomNumberPipe } from "../../../shared/pipes/custom-number.pipe";
import { CardDetailsComponent } from "../../../shared/components/card_details/card_details.component";
import { CardPayComponent } from "./card-pay/card-pay.component";
import { CardButtonComponent } from '../../../shared/components/card-button/card-button.component';
import { PayPseComponent } from "../../components/pay-pse/pay-pse.component";
import { PayPseService } from '../../components/pay-pse/pay-pse.service';
import { ProductStateService } from './product-state.service';
import { DataTransactionsService } from '../../mappers/data_transactions.service';
import { PayBinanceComponent } from "../../components/pay-binance/pay-binance.component";
import { PayBinanceService } from '../../components/pay-binance/pay-binance.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ButtonSpecialComponent } from "../../../shared/components/button-special/button-special.component";
import { ProductsService } from './card-pay/products.service';
import { modalModel } from '../../../core/models/modal.model';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { CardTransactionComponent } from "../../../shared/components/card-transaction/card-transaction.component";

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    CommonModule,
    skeletonDirective,
    TableSpecialComponent,
    TitleComponent,
    CustomNumberPipe,
    CardDetailsComponent,
    CardPayComponent,
    CardButtonComponent,
    PayPseComponent,
    PayBinanceComponent,
    ButtonSpecialComponent,
    CardTransactionComponent
]
})
export class ProductsComponent {
  private dataService = inject(DataTransactionsService)
  public payPseService = inject(PayPseService)
  public payBinanceService = inject(PayBinanceService)
  public productState = inject(ProductStateService)
  public productervice = inject(ProductsService)
  public modalService = inject(ModalService);


  private auth = inject(AuthService);

  skeleton = signal<boolean>(true);

  data = signal<any>([]);
  dataMovemets = signal<any>([]);

  buttonSpecial1 = signal<any>({
    width:'150px',
    text:'Descargar extracto',
    onMethodAction: () => {
      this.buttonSpecial1.update((val) => {return {...val,load_spinner: true};});

      const ID = this.auth.userData().ID;
      const typeID = this.auth.userData().checkId;

      this.productervice.passwordRecovery(ID,typeID)
      .subscribe({
        next:(resp)=>{
          this.buttonSpecial1.update((val) => {return {...val,load_spinner: false};});

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
      })

    },
   })

  card1 = signal<any>({
    icon: 'fa-regular fa-credit-card',
    coloricon: 'var(--secondary-color-3)',
    title: 'Nombre del producto',
    subtitle: '',
    description:'Crédito personal fácil de obtener y utilizar',
    onMethodAction: () => { },
  })

  card2 = signal<any>({
    icon: 'fa-solid fa-chart-pie',
    coloricon: 'var(--secondary-color-2)',
    title: 'Cupo Disponible',
    subtitle: '',
    description:'Saldo Vigente a su Disposición',
    onMethodAction: () => { },
  })

  card3 = signal<any>({
    icon: 'fa-solid fa-scale-balanced',
    coloricon: 'var(--secondary-color-1)',
    title: 'Cupo Aprobado',
    subtitle: '',
    description:'Presupuesto Avalado por el Sistema',
    onMethodAction: () => { },
  })

  card4 = signal<any>({
    icon: 'fa-solid fa-gauge',
    coloricon: 'var(--primary-color)',
    title: 'Valor en mora',
    subtitle: '',
    description:'Cuantía con Pagos Vencidos',
    onMethodAction: () => { },
  })

  buttonMenu1 = signal<any>({
    title:'Pagar',
    position:false,
    disabled: false,
    dataItem:[
      {
        img:'../../../../../assets/pse.png',
        name:'Pse',
        onMethodAction: () => {
          if(this.auth.ValitionTime()){
            this.auth.handleExpiredToken()
            return
          }
          this.productState.setData('pse')
          this.payPseService.selectRadio('monto2')
        },
      },
      {
        img:'../../../../../assets/binance.png',
        name:'Binance',
        onMethodAction: () => {
          if(this.auth.ValitionTime()){
            this.auth.handleExpiredToken()
            return
          }
          this.productState.setData('binance')
          this.payBinanceService.selectRadio('monto2')
        },
      }
  ]})

  card5 = signal<any>({
    icon: 'fa-solid fa-money-bill',
    coloricon: 'var(--secondary-color-3)',
    title: 'Saldo total a pagar',
    subtitle: '',
    description:'',
    buttomItem:  this.buttonMenu1()
  })


  buttonMenu2 = signal<any>({
    title:'Pagar',
    position:false,
    disabled: false,
    dataItem:[
      {
        img:'../../../../../assets/pse.png',
        name:'Pse',
        onMethodAction: () => {
          if(this.auth.ValitionTime()){
            this.auth.handleExpiredToken()
            return
          }
          this.productState.setData('pse')
          this.payPseService.selectRadio('monto1')
        },
      },
      {
        img:'../../../../../assets/binance.png',
        name:'Binance',
        onMethodAction: () => {
          if(this.auth.ValitionTime()){
            this.auth.handleExpiredToken()
            return
          }
          this.productState.setData('binance')
          this.payBinanceService.selectRadio('monto1')
        },
      }
  ]})

  card6 = signal<any>({
    icon: 'fa-solid fa-money-bill',
    coloricon: 'var(--secondary-color-3)',
    title: 'Pago mínimo',
    subtitle: '',
    description:'',
    buttomItem: this.buttonMenu2()
  })

  card7 = signal<any>({
    img: '../../../../../assets/pse.png',
    title: 'Pse',
    subtitle: 'Pagos Seguros en Línea.',
    disabled: false,
    onMethodAction: () => {
      if(this.auth.ValitionTime()){
        this.auth.handleExpiredToken()
        return
      }
      this.payPseService.resetearCampoCheck();
      this.productState.setData('pse');
    },
  })

  card8 = signal<any>({
    img: '../../../../../assets/binance.png',
    title: 'Binance',
    subtitle: 'líder en criptomonedas.',
    disabled: false,
    onMethodAction: () => {
      if(this.auth.ValitionTime()){
        this.auth.handleExpiredToken()
        return
      }
      this.payBinanceService.resetearCampoCheck();
      this.productState.setData('binance')
     },
  })

  card9 = signal<any>({
    img: '../../../../../assets/daviplata.png',
    title: 'Daviplata',
    subtitle: 'Pagos Seguros en Línea.',
    disabled: false,
    onMethodAction: () => {
      if(this.auth.ValitionTime()){
        this.auth.handleExpiredToken()
        return
      }
      window.open(`https://www.daviplata.com/`, '_blank');
      },
  })

  columnArray: any[] = [
    { header: 'Fecha', fieldName: 'date', dataType: 'date' },
    { header: 'Monto', fieldName: 'value', dataType: 'number' },
    { header: 'Medio', fieldName: 'ally', dataType: 'string' },
    { header: 'Concepto', fieldName: 'transactionType', dataType: 'string' }
  ]

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.productInicializacion()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.productState.setData('inicio')
  }

  productInicializacion() {
    this.skeleton.set(true)
    this.dataService.dataInicializacion()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.data.set(resp);
        this.skeleton.set(false);
        this.mapperMovements(resp[0].movements)

        this.cardsUpdate()
        this.buttonDisabled()
      })
  }

  cardsUpdate(){
    let numberPipe = new CustomNumberPipe()

    this.card1.update(currentValue => {
      return { ...currentValue, subtitle: this.data()[0]?.productName };
    })
    this.card2.update(currentValue => {
      return { ...currentValue, subtitle: numberPipe.transform(this.data()[0]?.availableQuota) };
    })
    this.card3.update(currentValue => {
      return { ...currentValue, subtitle: numberPipe.transform(this.data()[0]?.totalQuota) };
    })
    this.card4.update(currentValue => {
      return { ...currentValue, subtitle: numberPipe.transform(this.data()[0]?.arrearValue) };
    })
    this.card5.update(currentValue => {
      return { ...currentValue, subtitle: numberPipe.transform(this.data()[0]?.totalPayment) };
    })
    this.card6.update(currentValue => {
      return { ...currentValue, subtitle: numberPipe.transform(this.data()[0]?.minimalPayment) };
    })
  }

  mapperMovements(data:any){
    const translatedTransactions = data.map((transaction: any) => {
      return {
        ...transaction,
        transactionType: transaction.transactionType === 'purchase' ? 'Compra' : 'Pago'
      };
    });

    this.dataMovemets.set(translatedTransactions)
    console.log(this.dataMovemets());

  }

  buttonDisabled(){
    const isDisabled = this.data()[0].totalPayment > 0;

    this.card5.update(prevData => {
      this.buttonMenu1.update(item => ({
        ...item,
        disabled: !isDisabled
      }));

      return {
        ...prevData,
        buttomItem: this.buttonMenu1()
      };
    });

    this.card6.update(prevData => {
      this.buttonMenu2.update(item => ({
        ...item,
        disabled: !isDisabled
      }));

      return {
        ...prevData,
        buttomItem: this.buttonMenu2()
      };
    });

    this.card7.update(currentValue => {
      return { ...currentValue, disabled: !isDisabled };
    })

    this.card8.update(currentValue => {
      return { ...currentValue, disabled: !isDisabled };
    })

    this.card9.update(currentValue => {
      return { ...currentValue, disabled: !isDisabled };
    })
  }

}
