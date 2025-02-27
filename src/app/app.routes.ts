import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { CartItemComponent } from '../components/cart-item/cart-item.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'',redirectTo:'/productlist',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'productlist',component:ProductListComponent},
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'cart', component:CartItemComponent },
];
