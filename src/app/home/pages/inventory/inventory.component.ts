import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../core/services/books.service';
import { Book } from '../../../core/models/Book';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.sass'],
})
export class InventoryComponent implements OnInit {
  books: Book[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.booksService.getBooks().then(
      (result) => {
        this.books = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
