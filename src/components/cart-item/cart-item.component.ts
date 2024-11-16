import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Products } from '../../modals/products.model';
import { CartService } from '../../services/cart.service';
import { HeaderComponent } from '../../general/header/header.component';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  cart: Products[] = [];
  totalPrice = 0;
  cartProducts: any;
  totalQuantity = 0;

  constructor(private cartservice: CartService) {}

  ngOnInit() {
    this.cartservice.cart$.subscribe((cart) => {
      this.cart = cart;
      this.updateCartTotals();
    });
  }

  increaseQuantity(productId: number) {
    this.cartservice.increaseQuantity(productId);
    this.updateCartTotals();
  }

  decreaseQuantity(productId: number) {
    this.cartservice.decreaseQuantity(productId);
    this.updateCartTotals();
  }
  clearCart() {
    const confirmClear = window.confirm(
      'Are you sure you want to clear your cart? '
    );
    if (confirmClear) {
      this.cartservice.clearCart();
      this.updateCartTotals();
    }
  }

  removeFromCart(productId: number) {
    this.cartservice.removeFromCart(productId);
    this.updateCartTotals();
  }

  updateCartTotals() {
    this.totalQuantity = this.cartservice.getTotalQuantity();
    this.totalPrice = this.cartservice.getTotalPrice();
  }
}
