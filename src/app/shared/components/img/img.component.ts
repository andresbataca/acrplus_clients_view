import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-img',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './img.component.html',
  styleUrl: './img.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgComponent { }
