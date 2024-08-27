import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TitleComponent } from "../title/title.component";

@Component({
    selector: 'app-header-title',
    standalone: true,
    templateUrl: './header-title.component.html',
    styleUrl: './header-title.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        TitleComponent
    ]
})
export class HeaderTitleComponent {
  titleArray = input<any>();

 }
