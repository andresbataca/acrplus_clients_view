import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ApiPostService } from '../../../core/services/api-post.service';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { CardButtonComponent } from "../../../shared/components/card-button/card-button.component";
import { retry } from 'rxjs';
import { skeletonDirective } from '../../../shared/directives/skeleton.directive';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        TitleComponent,
        CapitalizePipe,
        CardButtonComponent,
        skeletonDirective,

    ]
})
export class UserProfileComponent {
  private auth = inject(AuthService);
  private api = inject(ApiPostService)

  skeleton = signal<boolean>(true);
  dataClient = signal<any>({});

  card7 = signal<any>({
    icon: 'fa-solid fa-envelope',
    coloricon:'var(--secondary-color-3)',
    // bckgrIcon:'#ECF3F2',
    title: 'Correo',
    subtitle: '...',
    onMethodAction: () => {

    },
  })

  card8 = signal<any>({
    icon: 'fa-solid fa-location-dot',
    coloricon:'var(--secondary-color-2)',
    // bckgrIcon:'#ECF3F2',
    title: 'Dirección',
    subtitle: '...',
    onMethodAction: () => {

     },
  })

  card9 = signal<any>({
    icon: 'fa-solid fa-mobile-button',
    coloricon:'var(--secondary-color-1)',
    // bckgrIcon:'#ECF3F2',
    title: 'Celular',
    subtitle: '...',
    onMethodAction: () => {  },
  })

  card10 = signal<any>({
    icon: 'fa-solid fa-square-phone',
    coloricon:'var(--secondary-color-3)',
    // bckgrIcon:'#ECF3F2',
    title: 'Teléfono',
    subtitle: '...',
    onMethodAction: () => {  },
  })

  ngOnInit() {
    this.usersInicializacion()
  }

  usersInicializacion() {
    const identification = this.auth.usuario.ID;

    const UrlApi = 'https://desarrollos.aliadosacr.com/api/app/user_profile'
    const paramsBody = {
      numero_documento: identification
    };

    this.api.getDebtInfo(UrlApi, paramsBody)
    .pipe(
      retry(2)
    )
    .subscribe({
      next:(resp) => {
        this.dataClient.set(resp.data)
        this.dataInicialization()
        this.skeleton.set(false)
      }
    })

  }

  dataInicialization(){

    this.card7.update(currentValue => {
      return { ...currentValue, subtitle: this.dataClient().email !== ''? this.dataClient().email : '...' };
    })

    this.card8.update(currentValue => {
      return { ...currentValue, subtitle: this.dataClient().address !== ''? this.dataClient().address : '...' };
    })

    this.card9.update(currentValue => {
      return { ...currentValue, subtitle: this.dataClient().mobile_phone !== ''? this.dataClient().mobile_phone : '...' };
    })

    this.card10.update(currentValue => {
      return { ...currentValue, subtitle: this.dataClient().home_phone !== ''? this.dataClient().home_phone : '...' };
    })
  }

 }
