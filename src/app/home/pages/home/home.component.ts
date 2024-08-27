import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { skeletonDirective } from '../../../shared/directives/skeleton.directive';
import { MoveDirective } from '../../../shared/directives/Move.directive';
import { CardItemComponent } from '../../../shared/components/card-item/card-item.component';
import { CardItem } from '../../../core/models/cardItem.model';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { CustomNumberPipe } from "../../../shared/pipes/custom-number.pipe";
import { DataTransactionsService } from '../../mappers/data_transactions.service';
import { ButtonMenuComponent } from "../../../shared/components/button-menu/button-menu.component";
import { HomeStateService } from './home-state.service';
import { PayPseService } from '../../components/pay-pse/pay-pse.service';
import { PayBinanceService } from '../../components/pay-binance/pay-binance.service';
import { PayPseComponent } from "../../components/pay-pse/pay-pse.component";
import { PayBinanceComponent } from "../../components/pay-binance/pay-binance.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        CardItemComponent,
        skeletonDirective,
        MoveDirective,
        TitleComponent,
        CustomNumberPipe,
        ButtonMenuComponent,
        PayPseComponent,
        PayBinanceComponent
    ]
})
export class HomeComponent implements OnInit {

  private dataService = inject(DataTransactionsService)
  private auth = inject(AuthService);
  public payPseService = inject(PayPseService)
  public payBinanceService = inject(PayBinanceService)
  public homeState = inject(HomeStateService)


  private destroy$ = new Subject<void>();

  data = signal<any>({});
  name = signal<string>('');
  skeleton = signal<boolean>(false);

  cardPs = signal<CardItem>({
    optionImg: 'icon',
    icon: 'bx bx-dock-left icon',
    img: '',
    coloricon: 'var(--secondary-color-3)',
    title: 'Productos',
    route: '../products',
    subtitle: 'Detalla tus productos.',
    optionFooter: 'button',
    button: 'Pagar',
    onMethodAction: () => { },
  })

  cardSc = signal<CardItem>({
    optionImg: 'icon',
    icon: 'bx bx-calculator icon',
    img: '',
    coloricon: 'var(--secondary-color-2)',
    title: 'Simulador',
    route: '../credit-simulator',
    subtitle: 'Descubre tu mejor opción ',
    optionFooter: 'button',
    button: 'Pagar',
    onMethodAction: () => { },
  })
  cardPy = signal<CardItem>({
    optionImg: 'icon',
    icon: 'bx bx-credit-card icon',
    img: '',
    coloricon: 'var(--secondary-color-3)',
    title: 'Paz y salvo',
    route: '../cleared',
    subtitle: 'Certificado paz y salvo',
    optionFooter: 'button',
    button: 'Pagar',
    onMethodAction: () => { },
  })
  cardCont = signal<CardItem>({
    optionImg: 'icon',
    icon: 'bx bxs-contact icon',
    img: '',
    coloricon: 'var(--secondary-color-2)',
    title: 'Contacto',
    route: '../contact-us',
    subtitle: 'Estamos Aquí para Ayudarte.',
    optionFooter: 'button',
    button: 'Pagar',
    onMethodAction: () => { },
  })

  buttonMenu1 = signal<any>({
    position:true,
    buttonMode:'icon',
    icon: 'fa-solid fa-coins',
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
          this.homeState.setData('pse')
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
          this.homeState.setData('binance')
          this.payBinanceService.selectRadio('monto2')
        },
      }
  ]})

  buttonMenu2 = signal<any>({
    position:true,
    buttonMode:'icon',
    icon: 'fa-solid fa-coins',
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
          this.homeState.setData('pse')
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
          this.homeState.setData('binance')
          this.payBinanceService.selectRadio('monto1')
        },
      }
  ]})


  ngOnInit(): void {
    this.homeInicializacion()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.homeState.setData('inicio')
  }

  homeInicializacion(){
    this.skeleton.set(true)
    this.name.set( this.auth.usuario.name);

    this.dataService.dataInicializacion()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp)=>{
        this.data.set(resp);
        this.skeleton.set(false)

        this.buttonDisabled();
      })
  }

  buttonDisabled(){
    const isDisabled = this.data()[0].totalPayment > 0;

    this.buttonMenu1.update(currentValue => {
      return { ...currentValue, disabled: !isDisabled };
    })

    this.buttonMenu2.update(currentValue => {
      return { ...currentValue, disabled: !isDisabled };
    })
  }

}


