import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-button-special',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './button-special.component.html',
  styleUrl: './button-special.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSpecialComponent {
  buttonArray = input<any>();
}
