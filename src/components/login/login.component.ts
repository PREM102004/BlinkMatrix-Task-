import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMessage = '';

  loginDetails: any = {
    username: '',
    password: '',
  };
  constructor(private router: Router) {}
  onSubmit() {
    debugger;
    const isLocaldata = localStorage.getItem('authStorage');
    if (isLocaldata != null) {
      const users = JSON.parse(isLocaldata);

      const isUserFound = users.find(
        (m: any) =>
          m.username == this.loginDetails.username &&
          m.password == this.loginDetails.password
      );
      if (isUserFound != null) {
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigateByUrl('/productlist');
      } else {
        alert('User Name or Password is Wrong !!!');
      }
    } else {
      alert('No User is Found');
    }
  }
}
