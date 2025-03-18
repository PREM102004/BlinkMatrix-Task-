import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Products } from '../modals/products.model';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: Firestore) {}


  private productSubject = new BehaviorSubject<Products[]>(
    this.getProductsFromLocalStorage()
  );
  products$: Observable<Products[]> = this.productSubject.asObservable();

  // addItem(collectionName: string, data: any) {
  //   return this.firestore.collection(collectionName).add(data); 
  // }
  addItem(collectionName: string, data: any) {
    const colRef = collection(this.firestore, collectionName);
    return addDoc(colRef, data);
  }
  private getProductsFromLocalStorage(): Products[] {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  }

  private saveProductsInLocalStorage(products: Products[]): void {
    
    localStorage.setItem('products', JSON.stringify(products));
    this.productSubject.next(products); 
  }

  addNewProduct(product: Products): void {
    
    const products = this.getProductsFromLocalStorage();
    product.id = new Date().getTime(); 
    products.push(product);
    this.saveProductsInLocalStorage(products);
  }

  editProduct(updatedProduct: Products): void {
    const products = this.getProductsFromLocalStorage();
    const updatedProducts = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    this.saveProductsInLocalStorage(updatedProducts);
  }
  getProductFromId(id: number): Products | undefined {
    return this.productSubject.getValue().find((product) => product.id === id);
  }

  deleteProduct(productId: number): void {
    const products = this.getProductsFromLocalStorage();
    const filteredProducts = products.filter((p) => p.id !== productId);
    this.saveProductsInLocalStorage(filteredProducts);
  }
}
