import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Products } from '../../modals/products.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { HeaderComponent } from "../../general/header/header.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
 product : Products|undefined;
 quantity = 1;
  constructor(private productservice : ProductService,private route : ActivatedRoute,private cartservice : CartService){}

  ngOnInit(){
    const productId = Number(this.route.snapshot.paramMap.get('id'))
    this.product = this.productservice.getProductFromId(productId)
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(){
    if(this.product && this.quantity > 0){
        this.cartservice.addToCart(this.product,this.quantity)
        alert("Added to Cart")
    }else{
      alert("Error Occured!")
    }
  }
}
