import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   registerForm!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authSvc:AuthService
  ) { 
    this.registerForm = this.fb.group({
     username:['',[Validators.required]],
     email:['',[Validators.required, Validators.email]],
     password:['',[Validators.required]]

    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.registerForm.valid) {
      this.authSvc.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['/auth/login'])
      },
      error: (err) => {
        console.log(err.message)
      }
      })

    }
  }

}
