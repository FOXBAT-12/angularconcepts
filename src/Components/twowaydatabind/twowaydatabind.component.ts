import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-twowaydatabind', 
  imports:[FormsModule ],
  templateUrl: './twowaydatabind.component.html',
  styleUrls: ['./twowaydatabind.component.css']
})
export class TwowaydatabindComponent { 
  username: string = ''; 
}
