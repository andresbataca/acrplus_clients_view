import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, signal } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './app-carousel.component.html',
  styleUrl: './app-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCarouselComponent {

  @Input() items: any[] = [];
  @Input() indicators: boolean = true;
  @Input() controls: boolean = true;
  @Input() autoSlide: boolean = false;
  @Input() slideInterval: number = 1000;

  interval!: any;
  selectedIndex =  signal(0);

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }

  autoSlideImages(): void {
    this.interval = setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  selectImage(i: number) {
    this.selectedIndex.set(i);
    clearInterval(this.interval);
    this.autoSlideImages();
  }

  onPrevClick(): void {
    if (this.selectedIndex() === 0) {

      this.selectedIndex.set(this.items.length - 1);
    } else {
      this.selectedIndex.update(value => value -1);
    }
    clearInterval(this.interval);
    this.autoSlideImages();
  }

  onNextClick(): void {
    if (this.selectedIndex() === this.items.length - 1) {
      this.selectedIndex.set(0);
    } else {
      this.selectedIndex.update(value => value +1);
    }
    clearInterval(this.interval);
    this.autoSlideImages();
  }

}


  // @Input() template!: TemplateRef<any>;
  // @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;
