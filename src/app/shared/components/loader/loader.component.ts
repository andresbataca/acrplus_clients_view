import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  private loaderService = inject(LoaderService)

  loader = computed(() => this.loaderService.getloader())

  constructor(){
    effect(()=>{
      // console.log(this.loader());
    })
  }

  ngOnInit() {}
}
