import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Admin{
  Name:string; 
  Email:string;
  Password:string;
}

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})  

export class AdminComponent {  
  admin : Admin  = { 
    Name :'', 
    Email:'',
    Password:'',
  } 
  constructor(private http:HttpClient){

  }

}