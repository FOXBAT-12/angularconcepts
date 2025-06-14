import { Routes } from '@angular/router';
import { CartItemComponent } from '../Components/cart-item/cart-item.component';
import { TwowaydatabindComponent } from '../Components/twowaydatabind/twowaydatabind.component';
import { CartItemAPIComponent } from '../Components/cart-item-api/cart-item-api.component';
import { LoginComponent } from '../Components/login/login.component';
import { StructuraldirectiveComponent } from '../Components/structuraldirective/structuraldirective.component';
import { HomeComponent } from '../Components/home/home.component';
import { LoginadminComponent } from '../Components/loginadmin/loginadmin.component';
import { UserRegisterComponent } from '../Components/user-register/user-register.component';
import { HomeScreenComponent } from '../Components/home-screen/home-screen.component';
import { AdminComponent } from '../Components/admin/admin.component';
import { ProductManagmentComponent } from '../Components/admin/product-management/product-managment.component';
import { OrderManagementComponent } from '../Components/order-management/order-management.component';

export const routes: Routes = [  
    {
        path: 'app-cart-item', 
        component: CartItemComponent
    }, 
    {
        path: 'app-twowaydatabind', 
        component: TwowaydatabindComponent
    },
    {
        path: 'app-cart-item-api',
        component:CartItemAPIComponent
    },
    {
        path: 'app-login',
        component:LoginComponent
    }, 
    {
        path: 'app-structuraldirective', 
        component: StructuraldirectiveComponent
    },
    {
        path:'app-home', 
        component: HomeComponent
    },
    {
        path:'app-user-register', 
        component: UserRegisterComponent
    },
    {
        path:'app-loginadmin',
        component:LoginadminComponent
    },
    { 
        path:'app-home-screen',
        component: HomeScreenComponent
    },
    {
        path:'',redirectTo:'/app-home-screen',pathMatch:'full'
    },
    {
        path:'app-cart-item',
        component: CartItemComponent
    },
    {
        path:'app-admin',
        component:AdminComponent
    },
    {
        path:'product-management',
        component:ProductManagmentComponent
    },
    {
        path: 'app-order-management',
        component:OrderManagementComponent
    }
];
