import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  languageMenuOpen = false;
  currentLanguage = 'Français';

  toggleLanguageMenu() {
    this.languageMenuOpen = !this.languageMenuOpen;
  }

  setLanguage(lang: string) {
    this.currentLanguage = lang;
    this.languageMenuOpen = false;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      mail_or_username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get mail_or_username() {
    return this.loginForm.get('mail_or_username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.loginForm.reset();
        this.successMessage = 'Vos données ont été envoyées avec succès.';
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
      },
    });
  }
}
