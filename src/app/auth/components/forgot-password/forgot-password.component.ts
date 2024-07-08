import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authSvc:AuthService
  ) { 
    this.forgotForm = this.fb.group({
     email:['',[Validators.required]],
    })
  }


  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.forgotForm.valid) {
      this.authSvc.login(this.forgotForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        console.error(err)
      }
      })

    }
  }


}
