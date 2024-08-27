import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';
import { TitleComponent } from "../title/title.component";

@Component({
    selector: 'app-card-button',
    standalone: true,
    templateUrl: './card-button.component.html',
    styleUrl: './card-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        TitleComponent
    ]
})
export class CardButtonComponent {
  private  host = inject(ElementRef<HTMLElement>)

  cardArray = input<any>();

  ngOnInit(): void {
    const host = this.host.nativeElement;
    host.style.setProperty('width', this.cardArray().width  ?? '100%');
  }
}
