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
   users = [
    { username: 'BM', password: '123' },
    
  ];
 
  constructor(private router: Router) {}
  ngOnInit(){
    debugger
    localStorage.setItem('authStorage', JSON.stringify(this.users));
  }
 
  onSubmit() {
    
    const isLocaldata = localStorage.getItem('authStorage');
    if (isLocaldata != null) {
      // Parse the localStorage data
      const users = JSON.parse(isLocaldata);
    
      // Check if users is an array
      if (Array.isArray(users)) {
        const isUserFound = users.find(
          (m: any) =>
            m.username === this.loginDetails.username &&
            m.password === this.loginDetails.password
        );
        if (isUserFound != null) {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigateByUrl('/productlist');
        } else {
          alert('User Name or Password is Wrong !!!');
        }
      } else {
        alert('Invalid data format in authStorage');
      }
    } else {
      alert('No User is Found');
    }
    
}
}