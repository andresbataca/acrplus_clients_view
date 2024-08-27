import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordRecoveryComponent { }
