import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TitleComponent } from "../title/title.component";

@Component({
    selector: 'app-card-details',
    standalone: true,
    templateUrl: './card_details.component.html',
    styleUrl: './card_details.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        TitleComponent
    ]
})
export class CardDetailsComponent {
  cardArray = input<any>();
}
