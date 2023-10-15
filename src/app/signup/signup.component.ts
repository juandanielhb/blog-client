import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: any;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _jwtService: JwtService,
    private _router: Router
    ) {
    this.signupForm = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],        
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
        const name = this.signupForm.get('name').value;
        const surname = this.signupForm.get('surname').value;
        const email = this.signupForm.get('email').value;
        const password = this.signupForm.get('password').value;
        
        let signupReq = {
          name,
          surname,
          email, 
          password
        };
        this._userService.signup(signupReq)
            .subscribe((data: any) => {
              console.log(data)
              this._jwtService.removeToken();
              this._jwtService.setToken(data.jwt);
              this._router.navigate(['/home']);
            });                    

    }
}
}
