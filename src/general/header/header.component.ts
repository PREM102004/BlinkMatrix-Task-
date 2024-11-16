import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartItemCount = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      this.cartItemCount = this.cartService.getTotalQuantity();
    });
  }

  logout() {
    const confirmLogout = window.confirm('Are you sure to Logout?');
    if (confirmLogout) {
      localStorage.removeItem('isLoggedIn');
      this.router.navigate(['/login']);
    } else {
      console.log('Logged out pending....');
    }
  }
}
