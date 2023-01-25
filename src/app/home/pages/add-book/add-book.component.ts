import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from 'src/app/core/services/books.service';
import { AuthorService } from '../../../core/services/author.service';
import { Book } from '../../../core/models/Book';
import { Author } from '../../../core/models/Author';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from '../../../shared/models/element';

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

  author_options: Element[] = [];
  columnsToDisplay = ['name', 'lname', 'checked'];
  dataSource = new MatTableDataSource<Element>();

  constructor(
    private bookService: BooksService,
    private authorService: AuthorService
  ) {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      if (
        data.name?.toLowerCase().includes(filter) ||
        data.lname?.toLowerCase().includes(filter) ||
        data.checked
      ) {
        return true;
      }
      return false;
    };
  }

  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {
    // query database for existing authors and return them in array form
    this.authorService.getAuthors().then((_authors: Author[]) => {
      this.author_options = _authors.map(
        (x) => new Element(x.id, x.name, x.lname, false)
      );
      this.dataSource.data = this.author_options;
    });
  }

  rowClicked(id: number) {
    let author_element = this.author_options.find((x) => x.id === id);
    if (author_element) {
      author_element.checked = !author_element.checked;
    }
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

    const authors = this.author_options
      .filter((e) => e.checked)
      .map((e) => new Author(e.id, e.name, e.lname));
    this.bookService.registerBook(book, authors).then(r => this.loadAuthors());
  }

  saveAuthor() {
    let author: Element = new Element(
      undefined,
      this.author_name || '',
      this.author_last_name || '',
      true
    );
    this.author_options.push(author);
    this.dataSource.data = this.author_options;
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
