import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-separator',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './separator.component.html',
  styleUrl: './separator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorComponent { }
