import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { inputModel } from '../../../core/models/input.model';
import { TooltipHelpService } from '../../../core/helpers/tooltip-help.service';
import { InputDataService } from './input-data.service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() form!: FormGroup;
  @Input() arrayInput!: inputModel;
  viewTooltipMsg = false;

  private  host = inject(ElementRef<HTMLElement>)
  public inputService = inject(InputDataService)

  ngOnInit(): void {
    const host = this.host.nativeElement;
    host.style.setProperty('width', this.arrayInput.width  ?? '100%');
  }

  eyeChange(){
    this.arrayInput.isEyeChange = !this.arrayInput.isEyeChange;
  }

  ayuda(ff:any){
   if (ff) {
    console.log('entro');

     return 'new-password'
   }

   console.log('no entro');

    return ''
  }


 }
