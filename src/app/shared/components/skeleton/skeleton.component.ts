import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {

  // Propiedades generales
  width!: string;
  height!: string;
  type: any = 'single';

  // Propiedades para el tipo rect-input
  widthLabel: string = '100%';
  heightLabel: string = '20px';
  widthInput: string = '100%';
  heightInput: string = '20px';

  className!: string;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const host = this.host.nativeElement;

    if (this.className) {
      host.classList.add(this.className);
    }

    host.style.setProperty('--skeleton-rect-width', this.width ?? '');
    host.style.setProperty('--skeleton-rect-height', this.height ?? '');
  }
 }
