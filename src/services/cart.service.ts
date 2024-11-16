import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../modals/products.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<Products[]>(this.getCartDetails());
  cart$ = this.cartSubject.asObservable();

  private getCartDetails(): Products[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  private saveCartDetails(cart: Products[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart(product: Products, quantity: number) {
    const cart = this.cartSubject.getValue();
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    this.cartSubject.next(cart);
    this.saveCartDetails(cart);
  }

  getCart() {
    return this.cartSubject.getValue();
  }

  clearCart() {
    this.cartSubject.next([]);
    this.saveCartDetails([]);
  }
  removeFromCart(productId: number) {
    let cart = this.cartSubject.getValue();
    cart = cart.filter((item) => item.id !== productId);
    this.cartSubject.next(cart);
    this.saveCartDetails(cart);
  }

  getTotalQuantity(): number {
    return this.cartSubject
      .getValue()
      .reduce((sum, product) => sum + product.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartSubject
      .getValue()
      .reduce((sum, product) => sum + product.price * product.quantity, 0);
  }

  increaseQuantity(productId: number) {
    const cart = this.cartSubject.getValue();
    const product = cart.find((item) => item.id === productId);
    if (product) {
      product.quantity++;
      this.cartSubject.next(cart);
      this.saveCartDetails(cart);
    }
  }

  decreaseQuantity(productId: number) {
    const cart = this.cartSubject.getValue();
    const product = cart.find((item) => item.id === productId);
    if (product && product.quantity > 1) {
      product.quantity--;
      this.cartSubject.next(cart);
      this.saveCartDetails(cart);
    }
  }
}
