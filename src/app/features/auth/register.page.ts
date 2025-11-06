import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ROLES } from '../../shared/utils/roles';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './register.page.html'
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  roles = ROLES;
  loading = signal(false);
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['customer', Validators.required]
  });
  disabled = computed(() => this.loading() || this.form.invalid);

  async submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    try {
      await this.auth.register(this.form.value as any);
      // In phase 2 we'll add success toast and redirect to login
    } finally {
      this.loading.set(false);
    }
  }
}
