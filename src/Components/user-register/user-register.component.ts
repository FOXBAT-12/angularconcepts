import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface UserRegister {
  name: string;
  email: string;
  password: string;
  phone: string;
}

@Component({
  selector: 'app-user-register',
  imports: [CommonModule , FormsModule ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  user: UserRegister = {
    name: '',
    email: '',
    password: '',
    phone: ''
  }; 
  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('https://localhost:7194/api/User/Register', this.user)
      .subscribe(
        (response) => {
          console.log('Registration successful', response);
          // Reset form after successful registration
          this.user = {
            name: '',
            email: '',
            password: '',
            phone: ''
          };
          alert('Registration successful!');
        },
        (error) => {
          console.error('Registration failed', error);
          alert('Registration failed. Please try again.');
        }
      );
  }
}
