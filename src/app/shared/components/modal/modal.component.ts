import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild, computed, effect, inject } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {

  private modalService = inject(ModalService)
  public modalArray = computed(() => this.modalService.getArray())

  constructor(){
    effect(()=>{
      // console.log(this.modalArray());
    })
  }

  @ViewChild('container',{static: false})  container!: ElementRef;

  @HostListener('click', ['$event.target'])
  clickOutside(event: EventListener) {

    const validat = this.container?.nativeElement.contains(event);

    if (!validat) {
      if (this.modalArray().clickOutside) {
        this.modalService.closeModal()
      }
    }

  }

 }
