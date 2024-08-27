import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild, input, signal } from '@angular/core';
import { TitleComponent } from "../../../../shared/components/title/title.component";
import { CustomNumberPipe } from "../../../../shared/pipes/custom-number.pipe";
import { ButtonMenuComponent } from "../../../../shared/components/button-menu/button-menu.component";

@Component({
    selector: 'app-card-pay',
    standalone: true,
    templateUrl: './card-pay.component.html',
    styleUrl: './card-pay.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        TitleComponent,
        CustomNumberPipe,
        ButtonMenuComponent
    ]
})
export class CardPayComponent {
  cardArray = input<any>();
 }
