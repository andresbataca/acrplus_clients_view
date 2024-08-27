import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputRadioComponent { }
