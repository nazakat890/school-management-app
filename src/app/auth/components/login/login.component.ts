import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authSvc:AuthService,
    private storageSvc:StorageService
  ) { 
    this.loginForm = this.fb.group({
     username:['',[Validators.required]],
     password:['',[Validators.required]]
    })
  }


  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.loginForm.valid) {
      this.authSvc.login(this.loginForm.value).subscribe({
      next: (resp) => {
         if(resp.body.token) {
          this.storageSvc.saveToken(resp.body.token)
          this.router.navigate(['/dashboard'])
         }
      },
      error: (err) => {
        alert(err.error.message)
      }
      })

    }
  }

}
