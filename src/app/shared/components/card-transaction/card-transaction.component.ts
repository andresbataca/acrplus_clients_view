import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TitleComponent } from "../title/title.component";
import { SeparatorComponent } from "../separator/separator.component";

@Component({
  selector: 'app-card-transaction',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    SeparatorComponent
],
  templateUrl: './card-transaction.component.html',
  styleUrl: './card-transaction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTransactionComponent {
  movements = input<any>();
 }
