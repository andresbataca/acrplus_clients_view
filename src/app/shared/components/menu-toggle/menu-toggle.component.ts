import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, computed, effect, input, signal } from '@angular/core';
import { AccordionDirective } from '../../directives/accordion.directive';
import { skeletonDirective } from '../../directives/skeleton.directive';

@Component({
  selector: 'app-menu-toggle',
  standalone: true,
  imports: [
    CommonModule,
    AccordionDirective,
    skeletonDirective
  ],
  templateUrl: './menu-toggle.component.html',
  styleUrl: './menu-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuToggleComponent {
  skeleton = input<boolean>(false);
  arrayQuestions = input<any>();

  @Input() numberArray: number = 0;


 }
