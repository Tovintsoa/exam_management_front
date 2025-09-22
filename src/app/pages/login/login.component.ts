import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';  // <- ajouter ici

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  // <- importer CommonModule ici
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  apiError: string | null = null;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private token: TokenService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
      if (this.token.getToken()) {
        this.router.navigate(['/dashboard']).then(r => console.log(r));
      }
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const payload = this.loginForm.value;
      this.apiError = null;
      this.isSubmitting = true;

      this.auth.login(payload).subscribe({
        next: (response) => {

          this.isSubmitting = false;
          console.log(response.token);
          this.token.setToken(response.token);

          this.router.navigate(['/dashboard']).then(r => console.log(r));

        },
        error: (error) => {
          this.isSubmitting = false;
          this.apiError =
            (error.error && (error.error.message || error.error.error || error.error.detail)) ||
            error.statusText ||
            'Échec de l’authentification. Veuillez réessayer.';
          console.error('Erreur lors de l\'authentification:', error);

        }
      })
    }
    else {
      this.loginForm.markAllAsTouched();
    }

  }
}
