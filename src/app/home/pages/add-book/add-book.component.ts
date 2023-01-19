import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from 'src/app/core/services/books.service';
import { Book } from '../../../core/models/Book';
import { Author } from '../../../core/models/Author';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  @Input() title = '';
  @Input() editorial = '';
  @Input() edition = '';
  @Input() condition = 1;
  @Input() position = '';

  // @Input() author_id: number | undefined;
  @Input() author_name: string | undefined;
  @Input() author_last_name: string | undefined;

  author_options: Author[] = [];
  columnsToDisplay = ['id', 'name', 'lname', 'select'];

  constructor(private bookService: BooksService) {}

  ngOnInit() {
    this.author_options = this.loadAuthors();
  }

  // todo: implement load authors
  loadAuthors(): Author[] {
    console.log('Not implemented yet :/');
    // query database for existing authors and return them in array form
    return [
      {
        id: 1,
        name: 'John',
        last_name: 'Doe',
      },
      {
        id: 2,
        name: 'H.P.',
        last_name: 'Lovecraft',
      },
    ];
  }

  rowClicked(id: number) {
    console.log('added author id');
  }

  saveBook() {
    const book: Book = {
      id: undefined,
      title: this.title,
      editorial: this.editorial,
      edition: this.edition,
      condition: Number(this.condition),
      position: this.position,
    };
    const authors: Author[] = [];

    this.bookService.registerBook(book, authors);
  }
}
