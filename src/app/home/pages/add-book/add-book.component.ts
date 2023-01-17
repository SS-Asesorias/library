import { Component, Input } from '@angular/core';
import { BooksService } from 'src/app/core/services/books.service';
import { Book } from '../../../core/models/Book';
import { Author } from '../../../core/models/Author';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent {
  @Input() title = '';
  @Input() editorial = '';
  @Input() edition = '';
  @Input() condition = 1;
  @Input() position = '';

  constructor(private bookService: BooksService) {}

  addAuthor() {
    const book: Book = {
      id: undefined,
      title: this.title,
      editorial: this.editorial,
      edition: this.edition,
      condition: this.condition,
      position: this.position,
    };
    const authors: Author[] = [];

    this.bookService.registerBook(book, authors);
  }
}
