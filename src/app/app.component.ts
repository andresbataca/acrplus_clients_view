import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme-service.service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public themeService = inject(ThemeService)
  public authService = inject(AuthService);

  title = 'acr_plus_clients_view';

  ngOnInit(): void {
    this.themeService.themeLoadInAppComponent();
  }

  checkHiddenDocument() {
    if (!document.hidden) {
      this.authService.validationToken()
    } 
  }

  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkHiddenDocument();
  }
}
