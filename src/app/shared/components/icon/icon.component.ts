import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  arrayIcon = input<any>();
 }
