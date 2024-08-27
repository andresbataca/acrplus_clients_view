import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, computed, effect, inject, input } from '@angular/core';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UtilitiesService } from '../../../core/helpers/utilities.service';

@Component({
    selector: 'app-card-button-pay',
    standalone: true,
    templateUrl: './card-button-pay.component.html',
    styleUrl: './card-button-pay.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        TitleComponent,
        ReactiveFormsModule
    ]
})
export class CardButtonPayComponent {
  cardArray = input<any>();
  @Input() form!: FormGroup;

  public utilities = inject(UtilitiesService);
 }
