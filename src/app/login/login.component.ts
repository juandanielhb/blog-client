import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: any;
    
    constructor(
        private fb: FormBuilder,
        private _userService: UserService,
        private _jwtService: JwtService,
        private _router: Router
        ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }
    
    onSubmit() {
        if (this.loginForm.valid) {
            const email = this.loginForm.get('email').value;
            const password = this.loginForm.get('password').value;
            
            let token = "";
            let authReq = {email, password};
            this._userService.login(authReq)
                .subscribe((data: any) => {
                    this._jwtService.removeToken();
                    this._jwtService.setToken(data.jwt);
                    this._router.navigate(['/home']);
                });                    

        }
    }
    
}