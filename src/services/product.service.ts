import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Products } from '../modals/products.model';
import { addDoc, collection, collectionData, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: Firestore) {
    this.getItems();
  }


  private productSubject = new BehaviorSubject<Products[]>(
   []
  );
  products$: Observable<Products[]> = this.productSubject.asObservable();


  addItem(collectionName: string, data: any) {
    const colRef = collection(this.firestore, collectionName);
    return addDoc(colRef, data).then((docRef) => {
      // Add the generated Firestore ID inside the document
      const docUpdateRef = doc(this.firestore, collectionName, docRef.id);
      return updateDoc(docUpdateRef, { id: docRef.id });
    })
  }
  updateProduct(collectionName: string, data: any,productid : any) {
    const docRef = doc(this.firestore, collectionName, productid);
    return updateDoc(docRef, data);
  }

  async getItems(): Promise<Products[]> {
    const colRef = collection(this.firestore, 'Products');
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Products));
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
  getProductFromId(id: any): Products | undefined {
    return this.productSubject.getValue().find((product) => product.id === id);
  }

  deleteProduct(productId: any): void {
    const products = this.getProductsFromLocalStorage();
    const filteredProducts = products.filter((p) => p.id !== productId);
    this.saveProductsInLocalStorage(filteredProducts);
  }
}
