import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, effect, input, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() myForm!: boolean;
  buttonArray = input<any>();
}
