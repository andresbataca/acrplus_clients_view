import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme-service.service';

@Component({
  selector: 'app-dark-mode',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkModeComponent {

  private themeService = inject(ThemeService)

  @Input() styles!: any;
  @Input() Mode!: string;
  @Input() sizeSimple:string = '25px';



  isMoodDark: boolean = false;

  ngOnInit(): void {
    this.isMoodDark = this.themeService.getIsDarkMode;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isMoodDark = this.themeService.getIsDarkMode;
  }

}
