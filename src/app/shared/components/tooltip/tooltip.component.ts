import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TooltipService } from './tooltip.service';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {

  private tooltipService = inject(TooltipService)
  public modalArray = computed(() => this.tooltipService.getArray())

 }
