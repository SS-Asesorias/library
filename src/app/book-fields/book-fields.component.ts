import { Component } from '@angular/core';

@Component({
  selector: 'app-book-fields',
  templateUrl: './book-fields.component.html',
  styleUrls: ['./book-fields.component.scss']
})


export class BookFieldsComponent {
  authors: any[] = [
    {
      name:"John",
      lname:"Doe"
    },
    {
      name:"Mary",
      lname:"Sue"
    },
  ];

  addAuthor() : any {
    alert("method not ")
    throw new Error("method not implemented");
  }
}
