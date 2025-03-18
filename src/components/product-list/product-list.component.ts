import { Component } from '@angular/core';
import { HeaderComponent } from '../../general/header/header.component';
import { ProductService } from '../../services/product.service';
import { Products } from '../../modals/products.model';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './edit-product/edit-product.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HeaderComponent, CommonModule, EditProductComponent,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  selectedProduct: Products | null = null;
  products$!: Observable<Products[]>;
  items: any[] = [];
  newItem: string = '';
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.products$ = this.productService.products$;
  }
  addItem() {
    const newProduct = { name: 'computer', price: 2999 };
    this.productService.addItem('products', newProduct)
      .then(() => console.log('Product added'))
      .catch(error => console.error('Error adding product:', error));
  }
  addNewProduct() {
    
    this.selectedProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      mrp: 0,
      rating: 0,
      image: '',
      quantity: 1,
    };
  }

  editProduct(product: Products) {
    this.selectedProduct = { ...product };
  }

  onProductSaved(product: Products) {
    this.selectedProduct = null;

    if (product.id === 0) {
      this.productService.addNewProduct(product);
      alert('New Product Added');
    } else {
      this.productService.editProduct(product);
      alert('Product Updated');
    }
  }

  cancelAddOrEdit() {
    this.selectedProduct = null;
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId);
    alert('Product Deleted');
  }
  viewProductDetail(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
