import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  type = input.required<'tit' | 'sub'>();
  @Input() label!: any;
  @Input() color!: string;
  @Input() weight!:string;
  @Input() font!:string;
  @Input() styles!: any;
 }
