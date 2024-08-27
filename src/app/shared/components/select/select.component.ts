import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { selectModel } from '../../../core/models/select.model';
import { TooltipHelpService } from '../../../core/helpers/tooltip-help.service';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {

  arraySelect = input<any>();
  @Input() form!: FormGroup;

  viewToolTipMsg:boolean = false;

  private  host = inject(ElementRef<HTMLElement>)

  ngOnInit() {
    const host = this.host.nativeElement;
    host.style.setProperty('--width', this.arraySelect().width  ?? '100%');
  }

 }
