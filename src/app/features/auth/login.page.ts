import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.page.html'
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  disabled = computed(() => this.loading() || this.form.invalid);

  async submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    try {
      const res = await this.auth.login(this.form.value as any);
      // role redirect
      const role = res.user.role;
      if (role === 'admin') this.router.navigateByUrl('/admin/dashboard');
      else if (role === 'provider') this.router.navigateByUrl('/provider/dashboard');
      else this.router.navigateByUrl('/customer/dashboard');
    } finally {
      this.loading.set(false);
    }
  }
}
