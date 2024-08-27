import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { environments } from '../../../../environments/environments.develoment';
import { ApiGetService } from '../../../core/services/api-get.service';
import { UtilitiesService } from '../../../core/helpers/utilities.service';
import { AccordionDirective } from '../../../shared/directives/accordion.directive';
import { skeletonDirective } from '../../../shared/directives/skeleton.directive';
import { MenuToggleComponent } from "../../../shared/components/menu-toggle/menu-toggle.component";
import { TitleComponent } from "../../../shared/components/title/title.component";
import { HeaderTitleComponent } from "../../../shared/components/header-title/header-title.component";

@Component({
    selector: 'app-faqs',
    standalone: true,
    templateUrl: './FAQs.component.html',
    styleUrl: './FAQs.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        AccordionDirective,
        skeletonDirective,
        MenuToggleComponent,
        TitleComponent,
        HeaderTitleComponent
    ]
})
export class FAQsComponent {
  private apiGet = inject(ApiGetService);
  public utilities = inject(UtilitiesService);

  private baseUrl: string = environments.baseUrl;

  arrayQuestions = signal<any>([])
  skeleton = signal<boolean>(false);

  private unsubscribe$ = new Subject();

  titleHeader1: any = {
    title:'Preguntas frecuentes',
    subtitle:'Encuentra respuestas detalladas y soluciones a las preguntas más frecuentes para facilitar tu experiencia con nosotros.'
  };

  ngOnInit(): void {
    const UrlApi = `${this.baseUrl}/api/app/frequent_questions`;
    this.skeleton.set(true)

    this.apiGet.getDebtInfo(UrlApi)
    .subscribe((resp)=>{
      this.arrayQuestions.set(resp.data)
      this.skeleton.set(false)
    })
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
 }
