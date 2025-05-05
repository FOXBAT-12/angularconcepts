import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-structuraldirective',
  imports: [CommonModule],
  templateUrl: './structuraldirective.component.html',
  styleUrl: './structuraldirective.component.css'
})
export class StructuraldirectiveComponent { 
  status:boolean = false; 
  Listoffruits:string[] = ['Apple , Grape , Orange , Mango']  
  selectedfruit:string = 'Apple';
  toggle(){
    this.status = !this.status;
  } 
  // addfruit(fruit:string){
  //   this.Listoffruits.push(fruit);
  // }
  changefruit(fruit:string){
    this.selectedfruit = fruit;
  }
}
